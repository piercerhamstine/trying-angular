import {Component, inject, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { InventoryService } from './inventory.service';
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
    styleUrls: ['./app.component.css'],
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
        @if(this.inventory.CanAffordCosts(cost)){
            <a href="#" (click)="OnAction()">{{actionName}}</a>
        }@else{
            <a>{{actionName}} - Can't afford</a>
        }
      </div>
    `,
    styleUrls: ['./app.component.css'],
  })
  export class ActionComponent {
    OnAction(){
        this.cost.forEach((item: UseableResource)=>{
            this.inventory.RemoveResource(item.id, item.total);
        })
    }
    @Input() actionName = "";
    @Input() reward = [];
    @Input() cost: UseableResource[] = [];
    inventory = inject(InventoryService);
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InventoryComponent, ActionComponent],
  template: `
    <div>
        <h1>The Void</h1>
        <p (click)="OnAdd()">Add Item</p>
        <p (click)="OnRemove()">Remove Item</p>
        <action actionName="Create" [cost]="data"/>
        <inventory/>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'thevoid';
  OnAdd(){this.inventory.AddResource("light")};
  OnRemove(){this.inventory.RemoveResource("light", 1)};
  inventory = inject(InventoryService);
  data: UseableResource[] = [{id: "light", total: 2}];
}
