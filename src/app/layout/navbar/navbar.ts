import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild, signal } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit, OnDestroy {
  @ViewChild('toggleBtn') private readonly toggleBtnRef?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileMenu') private readonly mobileMenuRef?: ElementRef<HTMLElement>;

  readonly navItems: NavItem[] = [
    { id: 'what-we-do', label: 'Qué hacemos' },
    { id: 'services', label: 'Servicios' },
    { id: 'ai-voice-agents', label: 'Agentes IA' },
    { id: 'use-cases', label: 'Casos de uso' },
    { id: 'contact', label: 'Contacto' },
  ];

  readonly isScrolled = signal(false);
  readonly isMenuOpen = signal(false);
  /** Sección visible en el viewport, para resaltar el link correspondiente (scroll-spy). */
  readonly activeSection = signal<string>('');

  private observer?: IntersectionObserver;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 40);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu(true);
    }
  }

  /** Trampa de foco: mientras el menú móvil está abierto, Tab no debe escapar de él. */
  @HostListener('window:keydown.tab', ['$event'])
  onTab(event: Event): void {
    if (!this.isMenuOpen() || !this.mobileMenuRef) {
      return;
    }
    const keyboardEvent = event as KeyboardEvent;

    const focusable = this.mobileMenuRef.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (keyboardEvent.shiftKey && document.activeElement === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }

  ngAfterViewInit(): void {
    const sections = this.navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          this.activeSection.set(visible[0].target.id);
        }
      },
      // Franja centrada en el viewport: la sección "activa" es la que ocupa
      // la zona media de la pantalla, no la que apenas asoma por el borde.
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => this.observer!.observe(section));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    document.body.style.overflow = '';
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
    this.syncBodyScroll();

    if (this.isMenuOpen()) {
      queueMicrotask(() => {
        this.mobileMenuRef?.nativeElement.querySelector<HTMLElement>('a')?.focus();
      });
    }
  }

  /**
   * @param returnFocus si es true, devuelve el foco al botón hamburguesa
   * (cierre por Escape o por el propio botón). Si se cierra al pulsar un
   * link de navegación, dejamos que el foco siga su curso natural en vez
   * de devolverlo a un botón que ya no está en el flujo visual del usuario.
   */
  closeMenu(returnFocus: boolean): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.isMenuOpen.set(false);
    this.syncBodyScroll();
    if (returnFocus) {
      this.toggleBtnRef?.nativeElement.focus();
    }
  }

  private syncBodyScroll(): void {
    document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
  }
}
