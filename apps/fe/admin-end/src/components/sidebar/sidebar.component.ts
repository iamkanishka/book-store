import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../services/sidebar/sidebar.service';

import { CommonModule } from '@angular/common';
import { iconMap, IconKey } from '../../icons/icons';
import { LucideAngularModule } from 'lucide-angular';
// import { SidebarWidgetComponent } from './sidebar-widget.component';



type NavItem = {
  name: string;
  icon: IconKey;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
    // SidebarWidgetComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  sidebar = inject(SidebarService);

  readonly iconMap = iconMap


  navItems: NavItem[] = [
    {
      icon: 'layoutGrid',
      name: 'Dashboard',
      subItems: [{ name: 'Ecommerce', path: '/', pro: false }],
    },
    {
      icon: 'calendar',
      name: 'Calendar',
      path: '/calendar',
    },
    {
      icon: 'usercircle',
      name: 'User Profile',
      path: '/profile',
    },
    {
      name: 'Forms',
      icon: 'list',
      subItems: [{ name: 'Form Elements', path: '/form-elements', pro: false }],
    },
    {
      name: 'Tables',
      icon: 'table',
      subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }],
    },
    {
      name: 'Pages',
      icon: 'page',
      subItems: [
        { name: 'Blank Page', path: '/blank', pro: false },
        { name: '404 Error', path: '/error-404', pro: false },
      ],
    },
  ];

  othersItems: NavItem[] = [
    {
      icon: 'piechart',
      name: 'Charts',
      subItems: [
        { name: 'Line Chart', path: '/line-chart', pro: false },
        { name: 'Bar Chart', path: '/bar-chart', pro: false },
      ],
    },
    {
      icon: 'boxcube',
      name: 'UI Elements',
      subItems: [
        { name: 'Alerts', path: '/alerts', pro: false },
        { name: 'Avatar', path: '/avatars', pro: false },
        { name: 'Badge', path: '/badge', pro: false },
        { name: 'Buttons', path: '/buttons', pro: false },
        { name: 'Images', path: '/images', pro: false },
        { name: 'Videos', path: '/videos', pro: false },
      ],
    },
    {
      icon: 'plugin',
      name: 'Authentication',
      subItems: [
        { name: 'Sign In', path: '/signin', pro: false },
        { name: 'Sign Up', path: '/signup', pro: false },
      ],
    },
  ];

  openSubmenu: { type: 'main' | 'others'; index: number } | null = null;
  subMenuHeight: Record<string, number> = {};
  subMenuRefs: Record<string, HTMLDivElement | null> = {};

  ngOnInit(): void {
    this.checkActiveRoute();
    this.router.events.subscribe(() => {
      this.checkActiveRoute();
    });
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  checkActiveRoute(): void {
    let submenuMatched = false;
    ['main', 'others'].forEach((menuType) => {
      const items = menuType === 'main' ? this.navItems : this.othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (this.isActive(subItem.path)) {
              this.openSubmenu = {
                type: menuType as 'main' | 'others',
                index,
              };
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      this.openSubmenu = null;
    }
  }

  handleSubmenuToggle(index: number, menuType: 'main' | 'others'): void {
    this.openSubmenu =
      this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
        ? null
        : { type: menuType, index };
  }

  setSubmenuRef(el: HTMLDivElement | null, key: string): void {
    this.subMenuRefs[key] = el;
    if (el && this.openSubmenu?.type + '-' + this.openSubmenu?.index === key) {
      this.subMenuHeight[key] = el.scrollHeight;
    }
  }
}
