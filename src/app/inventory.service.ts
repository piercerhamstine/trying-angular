import { Injectable } from "@angular/core";
import {Action, Resource, UseableResource} from './gameInterfaces';
import  data from '../../public/gameResources.json';

@Injectable({
    providedIn: 'root',
})
export class InventoryService{
    resources: Map<string, Resource> = new Map();
    currInventory: Map<string, number> = new Map();

    constructor() {
      data.forEach((element: Resource) =>{
        this.resources.set(element.id, element);
        this.currInventory.set(element.id, 0);
      })
    }

    GetResources(){
        const items:any = [];

        this.currInventory.forEach((value, key)=>{
            const resourceName = this.resources.get(key)?.name;
            items.push({name: resourceName, id: key, amount: value});
        })

        return items;
    }

    CanAffordCosts(costs: UseableResource[]){
        let canAfford = true;

        costs.forEach((element)=>{
            const currTotal = this.currInventory.get(element.id)?.valueOf()!;

            if(currTotal < element.total){
                canAfford = false;
            }
        });

        return canAfford;
    }

    RemoveResource(id: string, amount: number){
        if(this.currInventory.has(id)){
            let value = this.currInventory.get(id)?.valueOf()!;
            value -= amount;
            if(value < 0)
                value = 0;

            this.currInventory.set(id, value);

            return;
        }
    }

    AddResource(id: string){
        if(this.currInventory.has(id)){
            let value = this.currInventory.get(id)?.valueOf()!;
            value += 1;
            this.currInventory.set(id, value);

            return;
        }

        this.currInventory.set(id, 0);
    }
}
