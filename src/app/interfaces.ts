export interface SavedMeal {
  name: string;
  foods: Food[];
  macros: { 
    calories?: number;
    carbohydrates_total_g?: number;
    cholesterol_mg?: number;
    fat_saturated_g?: number;
    fat_total_g?: number;
    fiber_g?: number;
    name?: string;
    potassium_mg?: number;
    protein_g?: number;
    serving_size_g?: number;
    sodium_mg?: number;
    sugar_g?: number;
    [key: string]: any ;
  };
}

export interface Food {
  calories?: number;
  carbohydrates_total_g?: number;
  cholesterol_mg?: number;
  fat_saturated_g?: number;
  fat_total_g?: number;
  fiber_g?: number;
  name?: string;
  potassium_mg?: number;
  protein_g?: number;
  serving_size_g?: number;
  sodium_mg?: number;
  sugar_g?: number;
  [key: string]: any;
}
