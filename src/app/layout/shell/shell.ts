import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatListModule,
    MatIconModule, MatButtonModule,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  navLinks = [
    { path: '/',         label: 'Home',     icon: 'home',    exact: true },
    { path: '/projects', label: 'Projects', icon: 'folder' },
    { path: '/blog',     label: 'Blog',     icon: 'article' },
    { path: '/about',    label: 'About',    icon: 'info' },
  ];

  isHandset = toSignal(
    inject(BreakpointObserver).observe(Breakpoints.Handset).pipe(map(r => r.matches)),
    { initialValue: false },
  );
}
