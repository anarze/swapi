import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoadCharacters} from './characters.actions';
import {Character, Response} from '../../models';
import {CharactersService} from '../../services/characters.service';

export type CharactersStateModel = Response<Character[]>;

@State<CharactersStateModel>({
  name: 'characters',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class CharactersState {
  @Action(LoadCharacters)
  LoadCharacters(
    ctx: StateContext<CharactersStateModel>,
    action: LoadCharacters,
  ): Observable<Response<Character[]>> {
    return this.charactersService.list(action.params).pipe(tap(res => ctx.setState(res)));
  }

  @Selector()
  static getData(state: CharactersStateModel): Response<Character[]> {
    return state;
  }

  constructor(readonly charactersService: CharactersService) {}
}
