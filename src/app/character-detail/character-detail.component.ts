import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { CommonModule } from '@angular/common';

import { MarvelApiService } from '../services/marvelApi.service';
import { SearchComponent } from '../shared/search/search.component';
import { Character } from '../models/character';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent implements OnInit {

  public character$!: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private marvelApi: MarvelApiService
  ) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    this.getCharacterById(characterId);
  }

  getCharacterById(characterId: unknown) {
    this.character$ = this.marvelApi.getById(characterId)
  }

}
