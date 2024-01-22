import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../shared/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
