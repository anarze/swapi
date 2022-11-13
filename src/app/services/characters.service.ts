import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Character, CharactersSearchParams, Response} from '../models';

const url = 'https://swapi.dev/api/people';

@Injectable({
  providedIn: 'root'
})
export class CharactersService  {
  constructor(readonly http: HttpClient) {}

  list(params: CharactersSearchParams): Observable<Response<Character[]>> {
    const searchParams = `search=${params.search}&page=${params.page}`;
    return this.http.get<Response<Character[]>>(`${url}?${searchParams}`);
  }

}
