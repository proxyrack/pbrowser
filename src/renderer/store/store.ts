import { makeAutoObservable } from 'mobx';

class Store {
  secondsPassed = 0;
  // TODO - add methods to work with store here and parameters
  // Create new methods

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

export default Store;
