import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DotGrid } from './shared/components/dot-grid/dot-grid';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DotGrid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('surcalls');
}
