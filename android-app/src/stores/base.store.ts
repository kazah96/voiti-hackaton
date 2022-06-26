import {makeAutoObservable, action, observable} from 'mobx';
import {ReaderStore} from './reader.store';

import {TagStore} from './tag.store';

type Pages = 'addKey' | 'test' | 'client' | 'reader';
class RootStore {
  @observable public currentPage: Pages = 'addKey';

  @observable
  public tagStore = new TagStore();

  @observable
  public readerStore = new ReaderStore();

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  public setCurrentPage(page: Pages) {
    console.log('setting page');
    this.currentPage = page;
  }
}

export {RootStore};
