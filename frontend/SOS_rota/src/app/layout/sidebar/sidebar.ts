import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private router = inject(Router);

  navegarParaSecao(event: Event, secaoId: string): void {
    event.preventDefault();

    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const elemento = document.getElementById(secaoId);

        if (elemento) {
          elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 80);
    });
  }
}