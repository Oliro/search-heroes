import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private queryInput = new BehaviorSubject<string>('');
  public queryInput$ = this.queryInput.asObservable();

  constructor() { }

  getQueryValue(query: string) {
    this.queryInput.next(query)
  }

}


