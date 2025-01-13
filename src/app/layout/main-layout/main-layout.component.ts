import { Component } from '@angular/core';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
  standalone: true,
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
