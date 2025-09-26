import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './site-header/site-header';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App { }