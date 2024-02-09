import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public query: string = '';

  @Input() public searchInputBgColor: string = '';

  constructor(private searchService: SearchService) { }

  searchInputValue() {
    this.searchService.getQueryValue(this.query);
  }

}
