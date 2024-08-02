import { Injectable } from "@angular/core";
import {GameAction, UseableResource} from './gameInterfaces';

import gameData from '../../public/gameActions.json';

@Injectable({
    providedIn: 'root',
})
export class GameStateService{
  unlockedActions: GameAction[] = [];
  lockedActions: GameAction[] = [];

  constructor() {
    gameData.forEach((element: GameAction)=>{
      if(element.unlocked)
          this.unlockedActions.push(element);
      else
        this.lockedActions.push(element);
    });
  }

  GetUnlockedActions(){

    return this.unlockedActions;
  }

  LockAction(id:string){
    this.unlockedActions.forEach((action, idx)=>{
      if(action.id === id){
        action.unlocked = false;
        this.lockedActions.push(action);
        this.unlockedActions.splice(idx, 1);
      }
    });
  }

  UnlockAction(id:string){
    this.lockedActions.forEach((action, idx)=>{
      if(action.id === id){
        action.unlocked = true;
        this.unlockedActions.push(action);
        this.lockedActions.splice(idx, 1);
      }
    });
  }
}
