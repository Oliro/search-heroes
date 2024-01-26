import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
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

    this.isFavorite = !this.isFavorite;

    //remover do favorito
    if (!this.isFavorite) {
      return localStorage.removeItem(`favoriteCharacter-${characterId}`);
    }

    //contar quantos favoritos tem
    let count = 0;
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('favoriteCharacter')) {
        count++;
      }
    });

    if (count > 4) {
      this.isFavorite = false;
      return alert('Quantidade máxima de favoritos 5 foi atingida.')
    }

    const favorite = {
      character: characterId,
      isFavorite: this.isFavorite
    }
    //setar como favorito
    const favoriteString = JSON.stringify(favorite);
    localStorage.setItem(`favoriteCharacter-${characterId}`, favoriteString);

    //pegar o favorito no localstorage
    const getFavoriteCharacter = localStorage.getItem(`favoriteCharacter-${characterId}`);
    if (getFavoriteCharacter !== null) {
      const favoriteCharacter = JSON.parse(getFavoriteCharacter);
    }

  }

  checkIsFavorite(characterId: any) {
    //pegar o favorito no localstorage
    const getFavoriteCharacter = localStorage.getItem(`favoriteCharacter-${characterId}`);
    if (getFavoriteCharacter !== null) {

      const favoriteCharacter = JSON.parse(getFavoriteCharacter);
      return favoriteCharacter.isFavorite;

    }
  }

}
