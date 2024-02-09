import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MarvelApiService } from '../services/marvelApi.service';
import { SearchComponent } from '../shared/search/search.component';
import { Character } from '../models/character';
import { Comic } from '../models/comic';
import { FavoriteService } from '../services/favorite.service';
import { SearchService } from '../shared/search/search.service';

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
    private marvelApi: MarvelApiService,
    private favoriteService: FavoriteService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    this.getById(characterId);
    this.checkIsFavorite(characterId);
    this.getQuerySearch();
  }

  getById(characterId: unknown) {
    this.character$ = this.marvelApi.getCharacterById(characterId);
    this.comics$ = this.marvelApi.getComicsById(characterId);
  }

  favorite(characterId: number) {
    this.favoriteService.favorite(characterId);
  }

  checkIsFavorite(characterId: any) {
    return this.favoriteService.checkIsFavorite(characterId);
  }

  getQuerySearch() {
    this.searchService.queryInput$.subscribe();
  }

}
