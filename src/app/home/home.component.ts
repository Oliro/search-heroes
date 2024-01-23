import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelApiService } from '../services/marvelApi.service';
import { Character } from '../models/character';
import { catchError } from 'rxjs';
import { CardsComponent } from '../shared/cards/cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public characters: Character[] = [];

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

}
