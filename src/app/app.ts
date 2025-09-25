import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './site-header/site-header';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App { }