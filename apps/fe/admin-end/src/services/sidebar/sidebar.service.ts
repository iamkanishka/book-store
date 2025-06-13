import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SidebarService implements OnDestroy {
  private isExpandedSubject = new BehaviorSubject<boolean>(true);
  private isMobileOpenSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  private isHoveredSubject = new BehaviorSubject<boolean>(false);
  private activeItemSubject = new BehaviorSubject<string | null>(null);
  private openSubmenuSubject = new BehaviorSubject<string | null>(null);
  private destroy$ = new Subject<void>();

  isExpanded$ = this.isExpandedSubject.asObservable();
  isMobileOpen$ = this.isMobileOpenSubject.asObservable();
  isMobile$ = this.isMobileSubject.asObservable();
  isHovered$ = this.isHoveredSubject.asObservable();
  activeItem$ = this.activeItemSubject.asObservable();
  openSubmenu$ = this.openSubmenuSubject.asObservable();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.initWindowResizeListener();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initWindowResizeListener(): void {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      this.isMobileSubject.next(mobile);
      if (!mobile) {
        this.isMobileOpenSubject.next(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    this.destroy$.subscribe(() => {
      window.removeEventListener('resize', handleResize);
    });
  }

  toggleSidebar(): void {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }

  toggleMobileSidebar(): void {
    this.isMobileOpenSubject.next(!this.isMobileOpenSubject.value);
  }

  setIsHovered(isHovered: boolean): void {
    this.isHoveredSubject.next(isHovered);
  }

  setActiveItem(item: string | null): void {
    this.activeItemSubject.next(item);
  }

  toggleSubmenu(item: string): void {
    this.openSubmenuSubject.next(
      this.openSubmenuSubject.value === item ? null : item
    );
  }

  // Helper getters for current values
  get isExpanded(): boolean {
    return this.isMobileSubject.value ? false : this.isExpandedSubject.value;
  }

  get isMobileOpen(): boolean {
    return this.isMobileOpenSubject.value;
  }

  get isHovered(): boolean {
    return this.isHoveredSubject.value;
  }

  get activeItem(): string | null {
    return this.activeItemSubject.value;
  }

  get openSubmenu(): string | null {
    return this.openSubmenuSubject.value;
  }
}
