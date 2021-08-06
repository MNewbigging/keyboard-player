import { action, observable } from 'mobx';

import { KeyboardItem } from '../model/KeyboardItem';

export class AppState {
  @observable topRowKeyboards: KeyboardItem[] = [];
  @observable botRowKeyboards: KeyboardItem[] = [];

  @action addTopRowKeyboard() {
    this.topRowKeyboards.push(new KeyboardItem());
  }

  @action addBotRowKeyboard() {
    this.botRowKeyboards.push(new KeyboardItem());
    console.log('bot: ', this.botRowKeyboards);
  }
}
