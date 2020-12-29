import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: {ingredients: Ingredient[]} }> ) { }

  ngOnInit() {
   this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    //  this.ingSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients:Ingredient[])=>{
    //     this.ingredients = ingredients;
    //   } 
    // );
   }

   onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
   }

   ngOnDestroy(){
     this.ingSub.unsubscribe();
   }
  }

