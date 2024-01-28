import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Character } from 'src/app/models/character';
import { Localstorage } from '../localstorage';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent extends Localstorage {

  constructor() {
    super();
  }

  @Input() character!: Character;

  public isFavorite: boolean = false;

  favorite(characterId: any) {

    const getFavoriteCharacter = this.getFavoriteById(characterId);
    let statusFavorite: any = {};
    if (getFavoriteCharacter !== null) {
      statusFavorite = JSON.parse(getFavoriteCharacter);
    }

    if (!statusFavorite.isFavorite && this.countFavorite() >= 5) {
      return alert('Quantidade máxima de favoritos 5 foi atingida.')
    }

    if (statusFavorite.isFavorite) {
      this.isFavorite = false;
      return this.removeFavoriteById(characterId);
    }

    const favorite = {
      character: characterId,
      isFavorite: true
    }

    this.setFavoriteById(favorite);

  }

  checkIsFavorite(characterId: any) {

    const getFavoriteCharacter = this.getFavoriteById(characterId);
    
    if (getFavoriteCharacter !== null) {

      const favoriteCharacter = JSON.parse(getFavoriteCharacter);
      return favoriteCharacter.isFavorite;

    }
  }

}
