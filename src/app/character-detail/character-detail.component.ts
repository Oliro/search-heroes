import { Component } from '@angular/core';
import { SearchComponent } from '../shared/search/search.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent {

}
