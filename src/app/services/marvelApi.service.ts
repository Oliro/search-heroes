import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Md5 } from 'ts-md5';

import { Character, RootCharacter } from '../models/character';
import { Comic, RootComic } from '../models/comic';
import { EnvMarvel } from 'src/environments/env-marvel';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService extends EnvMarvel{

  apiUrl = 'http://gateway.marvel.com/v1/public/';
  publicKey = 'ad8a9ddb5c03f8151e2ff4ff0d79c9b0';

  timeStamp = new Date().getTime();
  md5 = new Md5();
  hash = this.md5.appendStr(this.timeStamp+this.privateKey+this.publicKey).end();

  constructor(protected http: HttpClient) {
    super();
  }

  getAllCharacters(): Observable<Character[]> {
    const resources = 'characters?';
    return this.http.get<RootCharacter>(this.apiUrl+resources+`ts=${this.timeStamp}&apikey=${this.publicKey}&hash=${this.hash}`)
    .pipe(map((result) => result.data.results));
  }

  getByQuery(query: string): Observable<Character[]> {
    const resources = `characters?nameStartsWith=${query}&`;
    return this.http.get<RootCharacter>(this.apiUrl+resources+`ts=${this.timeStamp}&apikey=${this.publicKey}&hash=${this.hash}`)
    .pipe(map((result) => result.data.results));
  }

  getCharacterById(id: unknown): Observable<Character>{
    const resources = `characters/${id}?`;
    return this.http.get<RootCharacter>(this.apiUrl+resources+`ts=${this.timeStamp}&apikey=${this.publicKey}&hash=${this.hash}`)
    .pipe(map((result) => result.data.results[0]));
  }

  getComicsById(id: unknown): Observable<Comic[]>{
    const resources = `characters/${id}/comics?`;
    return this.http.get<RootComic>(this.apiUrl+resources+`ts=${this.timeStamp}&apikey=${this.publicKey}&hash=${this.hash}`)
    .pipe(map((result) => {
      return result.data.results
    } ));
  }

}