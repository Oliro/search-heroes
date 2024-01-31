import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Character } from 'src/app/models/character';
import { Localstorage } from '../localstorage';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  constructor(private favoriteService: FavoriteService) {

  }

  @Input() character!: Character;

  @Output() public hasFavorited = new EventEmitter<boolean>();

  public isFavorite: boolean = false;

  favorite(characterId: number) {

    this.favoriteService.favorite(characterId);

    if(this.favoriteService.hasFavorited) this.hasFavorited.emit(true);
  
  }

  checkIsFavorite(characterId: number) {
    return this.favoriteService.checkIsFavorite(characterId);
  }

}
