import { Injectable } from '@angular/core';
import { Localstorage } from '../shared/localstorage';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends Localstorage {

  constructor() {
    super();
  }

  public isFavorite: boolean = false;

  public hasFavorited: boolean = false;

  favorite(characterId: number) {

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

    if(this.setFavoriteById(favorite)) this.hasFavorited = true;
    
  }

  checkIsFavorite(characterId: number) {

    const getFavoriteCharacter = this.getFavoriteById(characterId);

    if (getFavoriteCharacter !== null) {

      const favoriteCharacter = JSON.parse(getFavoriteCharacter);
      return favoriteCharacter.isFavorite;

    }

  }

}
