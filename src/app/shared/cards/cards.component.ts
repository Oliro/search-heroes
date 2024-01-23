import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

@Input() character!: Character;

public isFavorite: boolean = false;

favorite(){
this.isFavorite = !this.isFavorite;
}

}
