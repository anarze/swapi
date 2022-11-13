import {CharactersSearchParams} from '../../models';

export class LoadCharacters {
  static readonly type = '[Characters] Load Characters';

  constructor(readonly params: CharactersSearchParams) {}
}
