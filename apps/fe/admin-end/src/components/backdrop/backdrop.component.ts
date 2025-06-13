import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-backdrop',
  standalone: true,
  template: `
    @if (sidebar.isMobileOpen) {
    <div
      class="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
      [style.top]="'64px'"
      (click)="sidebar.toggleMobileSidebar()"
      (keydown.enter)="sidebar.toggleMobileSidebar()"
      tabindex="0"
    ></div>
    }
  `,
  styles: [],
})
export class BackdropComponent {
  sidebar = inject(SidebarService);
}
