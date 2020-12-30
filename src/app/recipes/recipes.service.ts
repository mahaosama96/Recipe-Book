import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AddIngredients } from '../shopping-list/store/shopping-list.actions';

@Injectable()

export class RecipesService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[]=[
    //     new Recipe('Easy Classic Crepes',
    //     'This looks so tasty and awesome!!', 
    //     'https://sweetsimplevegan.com/wp-content/uploads/2019/04/Close-Up-Classic-Rolled-Vegan-French-Crepes-Whipped-Cream-Chocolate-Sweet-Simple-Vegan-Freatured-Image.jpg',
    //     [
    //         new Ingredient('Flour', 1),
    //         new Ingredient('egg', 2),
    //         new Ingredient('strawberries', 5)
    //     ]),
    //     new Recipe('Beef Burger',
    //     'Everybody loves Burger, so what are you waiting for?', 
    //     'https://top10cairo.com/wp-content/uploads/2015/12/best-burger-restaurant-places-in-cairo-696x365.jpg',
    //     [
    //         new Ingredient('beef', 1),
    //         new Ingredient('buns', 2),
    //         new Ingredient('cheese slices', 3)
    //     ])   
    // ];

    private recipes: Recipe[] = [];

    constructor(
        private shoppimgListService: ShoppingListService,
        private store: Store<{ shoppingList: {ingredients: Ingredient[]} }>){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        // this.shoppimgListService.addIngredients(ingredients);
        this.store.dispatch(new AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}