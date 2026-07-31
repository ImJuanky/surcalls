import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

interface DotCell {
  px: number;
  py: number;
  seed: number;
  distFromCenter: number;
  accent: boolean;
}

/**
 * Rejilla de puntos animada (Canvas 2D). Reproduce el efecto de fondo
 * "dot grid" tipo Vercel: los puntos aparecen desde el centro hacia fuera
 * y luego parpadean de forma pseudoaleatoria, con una pequeña fracción
 * teñida con el verde de marca.
 *
 * Deliberadamente NO usa Three.js/WebGL: para una rejilla 2D de puntos,
 * un shader es sobrecarga innecesaria (~600KB de dependencia) para un
 * efecto que Canvas 2D renderiza sin esfuerzo a 60fps.
 */
@Component({
  selector: 'app-dot-grid',
  standalone: true,
  imports: [],
  templateUrl: './dot-grid.html',
  styleUrl: './dot-grid.css',
})
export class DotGrid implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private frameId?: number;
  private resizeObserver?: ResizeObserver;
  private cells: DotCell[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private startTime = 0;

  private readonly cellSize = 24;
  private readonly dotRadius = 1.3;
  private readonly flickerFrequency = 4.5;
  private readonly opacityLevels = [0.1, 0.1, 0.18, 0.18, 0.3, 0.3, 0.5, 0.5, 0.8, 1];

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resize();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);

    if (prefersReducedMotion) {
      this.draw(3);
      return;
    }

    this.startTime = performance.now();
    const loop = () => {
      const time = (performance.now() - this.startTime) / 1000;
      this.draw(time);
      this.frameId = requestAnimationFrame(loop);
    };
    loop();
  }

  ngOnDestroy(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
    this.resizeObserver?.disconnect();
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width * this.dpr;
    this.height = rect.height * this.dpr;
    canvas.width = this.width;
    canvas.height = this.height;

    const cellPx = this.cellSize * this.dpr;
    const cols = Math.ceil(this.width / cellPx) + 1;
    const rows = Math.ceil(this.height / cellPx) + 1;
    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxDist = Math.hypot(cx, cy) / cellPx || 1;

    const cells: DotCell[] = [];
    for (let yi = 0; yi < rows; yi++) {
      for (let xi = 0; xi < cols; xi++) {
        const px = xi * cellPx + cellPx / 2;
        const py = yi * cellPx + cellPx / 2;
        const distFromCenter = Math.hypot(px - cx, py - cy) / cellPx / maxDist;
        const seed = this.hash(xi, yi, 0);
        cells.push({ px, py, seed, distFromCenter, accent: seed > 0.94 });
      }
    }
    this.cells = cells;
  }

  private draw(time: number): void {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    for (const cell of this.cells) {
      const revealDelay = cell.distFromCenter * 1.4 + cell.seed * 0.5;
      if (time < revealDelay) continue;

      const bucket = Math.floor(time / this.flickerFrequency + cell.seed * this.flickerFrequency);
      const rand = this.hash(cell.px, cell.py, bucket);
      const level = this.opacityLevels[Math.floor(rand * this.opacityLevels.length)];

      const introFade = Math.min((time - revealDelay) * 2, 1);
      const opacity = level * introFade;
      if (opacity <= 0.015) continue;

      ctx.fillStyle = cell.accent
        ? `rgba(0, 229, 160, ${opacity * 0.85})`
        : `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(cell.px, cell.py, this.dotRadius * this.dpr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /** Hash determinista (sin dependencias) para pseudoaleatoriedad estable por celda. */
  private hash(x: number, y: number, t: number): number {
    const s = Math.sin(x * 127.1 + y * 311.7 + t * 74.7) * 43758.5453;
    return s - Math.floor(s);
  }
}
