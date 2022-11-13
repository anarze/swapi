import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, Observable, startWith, takeUntil} from 'rxjs';
import {Select, Store} from "@ngxs/store";
import {actionsExecuting, ActionsExecuting} from '@ngxs-labs/actions-executing';
import {TuiDestroyService} from '@taiga-ui/cdk';

import {Character, Response} from '../../models';
import {CharactersState} from '../../store/characters/characters.state';
import {LoadCharacters} from '../../store/characters/characters.actions';

const COLUMNS: {key: string; header: string}[] = [
  {key: 'name', header: 'Name'},
  {key: 'height', header: 'Height'},
  {key: 'gender', header: 'Gender'},
];

const COLUMN_KEYS: string[] = COLUMNS.map(({key}) => key);

@Component({
  selector: 'app-swapi',
  templateUrl: './swapi.component.html',
  styleUrls: ['./swapi.component.css'],
  providers: [TuiDestroyService]
})
export class SwapiComponent implements OnInit {

  readonly columns: {key: string; header: string}[] = COLUMNS;

  readonly columnKeys: string[] = COLUMN_KEYS;

  readonly page$ = new BehaviorSubject<number>(0);

  readonly searchPhrase = new FormControl('');

  @Select(CharactersState.getData)
  readonly characters$!: Observable<Response<Character[]>>;

  @Select(actionsExecuting([LoadCharacters]))
  readonly charactersLoading$!: Observable<ActionsExecuting>;

  constructor(private readonly destroy$: TuiDestroyService, private readonly store: Store) {}

  ngOnInit() {
    combineLatest([
      this.searchPhrase.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith('')),
      this.page$
      ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([search, page]) => this.store.dispatch(new LoadCharacters({search, page: search ? 1 : page + 1})));
  }

  resetSearch(): void {
    this.searchPhrase.reset('');
  }
}
