import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    // ThemeToggleButtonComponent,
    // NotificationDropdownComponent,
    // UserDropdownComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isApplicationMenuOpen = false;
  inputRef: HTMLInputElement | null = null;
  isBrowser: boolean;

  constructor(
    protected sidebar: SidebarService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('HeaderComponent');
  }

  ngOnInit(): void {
    console.log('HeaderComponent ngOnInit');
  }

  handleToggle(): void {
    if (this.isBrowser && window.innerWidth >= 991) {
      this.sidebar.toggleSidebar();
    } else {
      this.sidebar.toggleMobileSidebar();
    }
  }

  toggleApplicationMenu(): void {
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.inputRef?.focus();
    }
  }
}
