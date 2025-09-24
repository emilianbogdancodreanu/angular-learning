import { Component } from '@angular/core';
import { Catalog } from './catalog/catalog';
import { SiteHeader } from './site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [Catalog, SiteHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}