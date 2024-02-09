import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, debounceTime, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { MarvelApiService } from '../services/marvelApi.service';
import { Character } from '../models/character';
import { CardsComponent } from '../shared/cards/cards.component';
import { SearchComponent } from '../shared/search/search.component';
import { HeaderComponent } from '../header/header.component';
import { FavoriteFilterPipe } from "../pipes/favorite-filter.pipe";
import { SearchService } from '../shared/search/search.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, CardsComponent, SearchComponent, HeaderComponent, FavoriteFilterPipe]
})

export class HomeComponent implements OnInit {

  public characters: Character[] = [];

  public isClicked: boolean = false;

  public searchInputBgColor: string = '#fdecec'

  public localStorageData: any[] = [];

  public showMessage: boolean = false;

  @ViewChild('toggleFavorite') toggleFavorite!: ElementRef;

  constructor(private marvelApi: MarvelApiService, private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLocalStorageData();
    this.getQuerySearch();
    this.getCharacters();
  }

  getCharacters() {

    this.marvelApi.getAllCharacters()
      .pipe(
        catchError((err) => {
          this.showMessage = true;
          throw 'Erro ao consultar API: ' + err;
        })
      )
      .subscribe((result) => {
        this.characters = result;
        this.showMessage = result.length > 0 ? false : true;
      })
  }

  getFavorited() {
    this.localStorageData = [];
    this.getLocalStorageData();
  }

  getQuerySearch() {

    this.searchService.queryInput$.subscribe((queryValue) => {

      if (queryValue.length >= 1) {
        this.marvelApi.getByQuery(queryValue)
          .pipe(
            filter((text) => text.length > 1),
            debounceTime(400))
          .subscribe((result) => {
            this.characters = result;
            this.showMessage = result.length > 0 ? false : true;

          })
      }

    });
  }

  getLocalStorageData() {

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('favoriteCharacter')) {
        const localStorageItem = localStorage.getItem(key);
        if (localStorageItem) {
          const itemData = JSON.parse(localStorageItem);
          this.localStorageData.push(itemData);
        }
      }
    });
  }

  hasFavorited(value: any) {

    this.getFavorited();
    if (this.localStorageData.length === 0) {
      this.toggleFavorite.nativeElement.disabled;
    } else {
      this.toggleFavorite.nativeElement.disabled = false;
    }

  }

}
