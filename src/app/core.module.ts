import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipesService } from './recipes/recipes.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
    providers: [
        ShoppingListService,
        RecipesService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor, 
            multi: true
        }],
})

export class CoreModule{}