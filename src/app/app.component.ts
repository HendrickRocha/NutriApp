import { Component } from '@angular/core';
import { ApiService } from './services';
import { firstValueFrom } from 'rxjs';
import { Food, SavedMeal } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'NutriApp';
  searchInputValue: string = '';
  mealName: string = '';
  
  searchedFood: Food[] = [];
  dailyMeal: Food[] = [];
  savedMeals: SavedMeal[] = [];

  toggleInput: Boolean = false;
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  async getData() {
    this.isLoading = true;
    try {
      const response = await firstValueFrom(
        this.apiService.fetchData(this.searchInputValue)
      );
      this.searchedFood = response;
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  capitalizeFirstLetter(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getObjectKeys(obj: Food) {
    return Object.keys(obj).slice(1);
  }

  addToDailyMeal(food: Food) {
    this.dailyMeal.push(food);
  }

  removeFromDailyMeal(foodName: any) {
    this.dailyMeal = this.dailyMeal.filter(
      (item: Food) => item.name !== foodName
    );
  }

  dailyMealMacros() {
    const result = this.dailyMeal.reduce((acc, obj) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          acc[key] = (acc[key] || 0) + obj[key];
        }
      }
      return acc;
    }, {});

    return result;
  }

  saveMeal() {
    this.savedMeals.push({
      name: this.mealName,
      foods: this.dailyMeal,
      macros: this.dailyMealMacros(),
    });
  }

  showMore() {
    console.log('oi')
  }
}
