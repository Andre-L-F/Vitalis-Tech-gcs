import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {}