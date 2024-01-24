import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelApiService } from '../services/marvelApi.service';
import { Character } from '../models/character';
import { catchError } from 'rxjs';
import { CardsComponent } from '../shared/cards/cards.component';
import { SearchComponent } from '../shared/search/search.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardsComponent, SearchComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public characters: Character[] = [];

  public isClicked: boolean = false;

  constructor(private marvelApi: MarvelApiService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {

    this.marvelApi.getAllCharacters()
      .pipe(
        catchError((err) => {
          throw 'Erro ao consultar API: ' + err;
        })
      )
      .subscribe((result) => {
        console.log(result)
        this.characters = result;
      })

  }

  getCharactersbySearch() {

  }

  toggleSelect() {
    this.isClicked = !this.isClicked;
  }

  getQuerySearch(query: string) {
    if (query.length > 1) {
      this.marvelApi.getByQuery(query).subscribe((result) => this.characters = result);
    }
  }

}
