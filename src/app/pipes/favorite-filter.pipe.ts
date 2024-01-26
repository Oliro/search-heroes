import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character';

@Pipe({
  name: 'favoriteFilter',
  standalone: true
})
export class FavoriteFilterPipe implements PipeTransform {

  transform(items: any[], localStorageData: any): any[] {

    if (!items || !localStorageData || localStorageData.length === 0) {
      return items;
    }

    return items.filter(item => {
      return localStorageData.some((data: any) => data.character === item.id);
    })
  }

}
