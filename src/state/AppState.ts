import { action, observable } from 'mobx';

import { KeyboardItem } from '../model/KeyboardItem';
import { RandomId } from '../utils/RandomId';

export class AppState {
  @observable topRowKeyboards: KeyboardItem[] = [];
  @observable botRowKeyboards: KeyboardItem[] = [];

  @action addTopRowKeyboard() {
    this.topRowKeyboards.push(new KeyboardItem(RandomId.createId()));
  }

  @action addBotRowKeyboard() {
    this.botRowKeyboards.push(new KeyboardItem(RandomId.createId()));
    console.log('bot: ', this.botRowKeyboards);
  }
}
