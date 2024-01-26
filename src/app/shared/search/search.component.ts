import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public query: string = '';

  @Output() public queryEvent = new EventEmitter<string>();

  @Input() public searchInputBgColor: string = '';

  search() {
    this.queryEvent.emit(this.query)
  }

}
