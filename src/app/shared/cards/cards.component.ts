import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  @Input() character!: Character;

  public isFavorite: boolean = false;

  favorite(characterId: any) {

    //contar quantos favoritos tem no storage
    let count = 0;
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('favoriteCharacter')) {
        count++;
      }
    });

    //pegar o favorito no localstorage
    const getFavoriteCharacter = localStorage.getItem(`favoriteCharacter-${characterId}`);
    let statusFavorite: any = {};
    if (getFavoriteCharacter !== null) {
      statusFavorite = JSON.parse(getFavoriteCharacter);
    }

    if (!statusFavorite.isFavorite && count >= 5) {
      return alert('Quantidade máxima de favoritos 5 foi atingida.')
    }

    if (statusFavorite.isFavorite) {
      this.isFavorite = false;
      return localStorage.removeItem(`favoriteCharacter-${characterId}`);
    }

    const favorite = {
      character: characterId,
      isFavorite: true
    }

    const favoriteString = JSON.stringify(favorite);
    localStorage.setItem(`favoriteCharacter-${characterId}`, favoriteString);

  }

  checkIsFavorite(characterId: any) {

    const getFavoriteCharacter = localStorage.getItem(`favoriteCharacter-${characterId}`);
    if (getFavoriteCharacter !== null) {

      const favoriteCharacter = JSON.parse(getFavoriteCharacter);
      return favoriteCharacter.isFavorite;

    }
  }

}
