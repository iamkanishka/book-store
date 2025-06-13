import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../services/sidebar/sidebar.service';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { BackdropComponent } from '../components/backdrop/backdrop.component';


 

@Component({
  imports: [ RouterModule, HeaderComponent, SidebarComponent, BackdropComponent],
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin-end';
  sidebar = inject(SidebarService);
}
