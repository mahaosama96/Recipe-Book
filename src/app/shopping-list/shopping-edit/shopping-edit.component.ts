import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { AddIngredient } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editeditem: Ingredient;
 
  constructor(
    private shoppingListService:ShoppingListService,
    private store: Store<{ shoppingList: {ingredients: Ingredient[]} }>) { }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number)=>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editeditem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editeditem.name,
            amount: this.editeditem.amount
          });
        }
      );
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      // this.shoppingListService.addIngredient(newIngredient);(
      this.store.dispatch(new AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
