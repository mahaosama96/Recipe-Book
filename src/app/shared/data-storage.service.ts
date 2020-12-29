import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})

export class DataStorageService{
    constructor(
        private http: HttpClient,
        private recipesService: RecipesService,
        private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        return this.http.put('https://ng-course-project-d2dc8.firebaseio.com/recipes.json', recipes)
            .subscribe(resonse=>{
                console.log(resonse);
            });
    }

    fetchRecipes(){ 
        return this.http.get<Recipe[]>('https://ng-course-project-d2dc8.firebaseio.com/recipes.json')
            .pipe(
                map(recipes=>{
                    return recipes.map(
                        recipe=>{
                            return {
                                ...recipe,
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        });
                }),
                tap(recipes=>{
                    this.recipesService.setRecipes(recipes);
                })
            );
    }


}