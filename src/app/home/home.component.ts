import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelApiService } from '../services/marvelApi.service';
import { Character } from '../models/character';
import { catchError } from 'rxjs';
import { CardsComponent } from '../shared/cards/cards.component';
import { SearchComponent } from '../shared/search/search.component';
import { HeaderComponent } from '../header/header.component';
import { FavoriteFilterPipe } from "../pipes/favorite-filter.pipe";

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

  @ViewChild('toggleFavorite') toggleFavorite!: ElementRef;

  constructor(private marvelApi: MarvelApiService) { }

  ngOnInit(): void {

    this.getCharacters();
    this.getLocalStorageData();

  }

  getCharacters() {

    this.marvelApi.getAllCharacters()
      .pipe(
        catchError((err) => {
          throw 'Erro ao consultar API: ' + err;
        })
      )
      .subscribe((result) => {
        this.characters = result;
      })

  }

  toggleSelect() {

    this.isClicked = !this.isClicked;
    this.localStorageData = [];
    this.getLocalStorageData();
    this.getCharacters();

  }

  getQuerySearch(query: string) {

    if (query.length > 1) {
      this.marvelApi.getByQuery(query).subscribe((result) => this.characters = result);
    }

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

    this.toggleSelect();
    if (this.localStorageData.length === 0) {
      this.toggleFavorite.nativeElement.disabled;
      this.isClicked = false;
    } else {
      this.toggleFavorite.nativeElement.disabled = false;
      this.isClicked = false;
    }

  }

}
