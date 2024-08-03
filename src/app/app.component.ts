import {Component, inject, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { InventoryService } from './inventory.service';
import { GameStateService } from './gamestate.service';
import { UseableResource } from './gameInterfaces';

@Component({
    selector: 'inventory',
    standalone: true,
    imports: [],
    template: `
      <div>
        @for(item of this.inventory.GetResources(); track item.id){
            <p>{{item.name}}: {{item.amount}}</p>
        }
      </div>
    `,
    styleUrls: ['./styles/app.inventory.css'],
  })
  export class InventoryComponent {
    inventory = inject(InventoryService);
}

@Component({
    selector: 'action',
    standalone: true,
    imports: [],
    template: `
      <div>
      <p>{{description}} -
      @if(this.inventory.CanAffordCosts(this.costs)){
        [<a href=# (click)="OnAction()">{{name}}</a>]
      }@else{
        [<a>Cannot Afford</a>]
      }

      @for(cost of this.costs; track cost.id){
        -{{cost.total}} {{cost.id}}
      }
      @for(reward of this.rewards; track reward.id){
        +{{reward.total}} {{reward.id}}
      }
      </p>
      </div>
    `,
    styleUrls: ['./app.component.css'],
  })
  export class ActionComponent {
    OnAction(){
      this.unlocks.forEach((unlock)=>{
        this.gameState.UnlockAction(unlock);
      });

      this.rewards.forEach((reward)=>{
        this.inventory.AddResource(reward.id);
      })

      this.costs.forEach((cost)=>{
        this.inventory.RemoveResource(cost.id, cost.total);
      });

      if(!this.repeatable){
        this.gameState.LockAction(this.id);
      }
    }
    @Input() id = "";
    @Input() name = "";
    @Input() description = "";
    @Input() costs: UseableResource[] = [];
    @Input() rewards: UseableResource[] = [];
    @Input() unlocks: string[] = [];
    @Input() repeatable = false;
    inventory = inject(InventoryService);
    gameState = inject(GameStateService);
}

@Component({
  selector: 'game-actions',
  standalone: true,
  imports: [ActionComponent],
  template: `
      <div>
        @for(unlockedAction of this.gameState.GetUnlockedActions(); track unlockedAction.id){
            <action [id]=unlockedAction.id [name]=unlockedAction.name
            [description]=unlockedAction.description [unlocks]=unlockedAction.unlocks
            [repeatable]=unlockedAction.repeatable [rewards]=unlockedAction.rewards
            [costs]=unlockedAction.costs/>
        }
      </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class GameActionsComponent {
  gameState = inject(GameStateService);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InventoryComponent, GameActionsComponent],
  template: `
    <div>
        <h1>The Void</h1>
        <div>
        <game-actions/>
        <inventory/>
        </div>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'thevoid';
  inventory = inject(InventoryService);
}
