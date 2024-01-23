import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

@Input() character!: Character;

}
