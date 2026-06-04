import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    this.setTheme(shouldBeDark);
  }

  setTheme(isDark: boolean) {
    this.isDarkMode.set(isDark);
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  toggleTheme() {
    this.setTheme(!this.isDarkMode());
  }
}
