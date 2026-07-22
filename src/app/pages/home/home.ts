import { Component } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { TrustBar } from './sections/trust-bar/trust-bar';
import { WhatWeDo } from './sections/what-we-do/what-we-do';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Hero, TrustBar, WhatWeDo],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}