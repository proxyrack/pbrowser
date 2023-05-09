import { makeAutoObservable } from 'mobx';

class Store {
  pageTitle: string = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setPageTitle(title: string) {
    this.pageTitle = title;
  }
}

export default Store;
