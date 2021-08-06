import { action, observable } from 'mobx';

import { KeyboardItem } from '../model/KeyboardItem';

export class AppState {
  @observable keyboards: KeyboardItem[] = [];

  @action addKeyboard() {
    this.keyboards.push(new KeyboardItem());
  }
}
