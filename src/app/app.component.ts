import { Component, OnInit } from '@angular/core';
import { ApiService } from './services';
import { firstValueFrom } from 'rxjs';
import { Food, SavedMeal } from './interfaces';
import { style, transition, trigger, animate } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    position: 'absolute',
    top: -10,
    opacity: 0,
  }),
  animate('0.5s ease-in', style({ top: 0, opacity: 1 })),
]);
const rotateTransition = transition('open => closed', [
  style({}),
  animate('0.5s ease-in', style({ transform: 'rotate(180deg)' })),
]);

const dropText = trigger('dropText', [enterTransition]);
const rotate = trigger('rotate', [rotateTransition]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [dropText, rotate],
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

  maisBtn: boolean = false;
  ngOnInit() {}

  toggleTag() {
    this.maisBtn = !this.maisBtn;
  }

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
    console.log('oi');
  }
}
