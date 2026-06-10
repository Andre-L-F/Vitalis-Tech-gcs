import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements AfterViewInit, OnDestroy {
  activeSection = 'ocorrencias';

  private mainArea: HTMLElement | null = null;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mainArea = document.querySelector('.main-area');

      if (this.mainArea) {
        this.mainArea.addEventListener('scroll', this.onScroll);
        this.onScroll();
      }
    }, 100);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url !== '/') {
          this.activeSection = '';
        } else {
          setTimeout(() => this.onScroll(), 100);
        }
      });
  }

  ngOnDestroy(): void {
    this.mainArea?.removeEventListener('scroll', this.onScroll);
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();

    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const section = document.getElementById(sectionId);

        if (!section || !this.mainArea) return;

        this.mainArea.scrollTo({
          top: section.offsetTop - 120,
          behavior: 'smooth',
        });

        this.activeSection = sectionId;
      }, 80);
    });
  }

  private onScroll = (): void => {
    if (this.router.url !== '/') return;

    const sections = ['ocorrencias', 'mapa', 'indicadores'];
    const scrollPosition = this.mainArea?.scrollTop ?? 0;

    let currentSection = sections[0];

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);

      if (!section) continue;

      const sectionTop = section.offsetTop - 180;

      if (scrollPosition >= sectionTop) {
        currentSection = sectionId;
      }
    }

    this.activeSection = currentSection;
  };
}