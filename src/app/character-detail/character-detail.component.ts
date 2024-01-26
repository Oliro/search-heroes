import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable} from 'rxjs';
import { CommonModule } from '@angular/common';

import { MarvelApiService } from '../services/marvelApi.service';
import { SearchComponent } from '../shared/search/search.component';
import { Character } from '../models/character';
import { Comic } from '../models/comic';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, SearchComponent, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent implements OnInit {

  public character$!: Observable<Character>;
  public comics$!: Observable<Comic[]>;
 
  public isFavorite: boolean = false;
  
  public searchInputBgColor: string = '#ffffff'

  constructor(
    private route: ActivatedRoute,
    private marvelApi: MarvelApiService
  ) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    this.getById(characterId);
  }

  getById(characterId: unknown) {
    this.character$ = this.marvelApi.getCharacterById(characterId);
    this.comics$ = this.marvelApi.getComicsById(characterId);
  }

  favorite() {
    this.isFavorite = !this.isFavorite;
  }


}
