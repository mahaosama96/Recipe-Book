import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredient, ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Peaches',5),
        new Ingredient('Pineapples',10)
      ],
};

export function shoppingListReducer(state= initialState, action: AddIngredient) {
    switch (action.type) {
        case ADD_INGREDIENT: 
        return {
            ...state,
            ingredients: [ ...state.ingredients, action.payload]
        };
        
        default:
            return state;
    }
    
}