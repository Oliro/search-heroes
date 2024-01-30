import { Pipe, PipeTransform } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MarvelApiService } from '../services/marvelApi.service';
import { Character } from '../models/character';

@Pipe({
  name: 'favoriteFilter',
  standalone: true
})

export class FavoriteFilterPipe implements PipeTransform {

  constructor(private marvelApi: MarvelApiService) { }

  transform(items: any[], localStorageData: any[]): Character[] {
    if (!items || !localStorageData || localStorageData.length === 0) {
      return []; 
    }

    const characterIds: number[] = localStorageData.map(data => data.character);

    const requests: Observable<Character>[] = characterIds.map(id => {
      return this.marvelApi.getCharacterById(id);
    });

    const characters: Character[] = [];

    forkJoin(requests).subscribe(results => {
      results.forEach(character => {
        characters.push(character);
      });
    });

    return characters;
  }
}