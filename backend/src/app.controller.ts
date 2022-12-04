import { Controller, Get, Param, Post, Query, Body, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

interface Ingredient {
  id: number;
  name: string;
  ph: number;
}

const ingredients: Ingredient[] = [
  { id: 0, name: 'Abacaxi', ph: 3.6 },
  { id: 1, name: 'Cenoura', ph: 6.14 },
  { id: 2, name: 'Clara de ovo', ph: 7.96 }
];

interface Parameters {
  acid: string;
  alkaline: string;
  name: string;
}

// GET /api/ingredient/[id]
// GET /api/ingredient/1 => Cenoura

// GET /api/ingredients?acido=true&basic=true

// POST /api/ingredient
// data: { name: string, ph?: number }

@Controller('api/ingredients')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:id')
  async getIngredientById(@Param() params): Promise<Object> {
    const ingredients = await this.appService.getIngredientById(params.id);
    console.log('ingredient: ', ingredients[0]);
    return ingredients[0];
  }

  // @Get('/:id/matches')
  // async getMatches(@Param() params): Promise<Object> {
  //   const ingredients = await this.appService.getIngredientById(params.id);
  //   console.log('ingredient: ', ingredients[0]);
  //   return ingredients[0];
  // }

  @Get('/:id/matches')
  async getMatches(@Param() params): Promise<Object> {
    const ingredient = await this.appService.getIngredientById(params.id);
    const ph = ingredient[0].ph;
    let phMin;
    let phMax;
    if(ph > 7) {
      phMin = 0;
      phMax = 6.9;
    } else {
      phMin = 7;
      phMax = 14
    }
    const matches = await this.appService.getIngredientsBypHCategory(phMin, phMax);
    return matches;
  }


  @Get()
  async getIngredientByPh(@Query() params: Parameters) {
    console.log(params);
    let result = [];
    if(params.acid === 'true') {
      result.push(ingredients.filter(el => el.ph < 7));
    }
    if(params.alkaline === 'true') {
      result.push(ingredients.filter(el => el.ph > 7));
    }
    if(params.name) {
      result = await this.appService.getIngredientByName(params.name);
    }
    return result;
  }


  @Post()
  addNewIngredient(@Body() ingredientInfo: Ingredient) {
    if(!ingredientInfo.name || !ingredientInfo.ph) {
      throw new HttpException('not today', HttpStatus.BAD_REQUEST);
    }
    for(let ingredient of ingredients) {
      if(ingredient.name === ingredientInfo.name) {
        ingredient.ph = ingredientInfo.ph;
        return ingredients;
      }
    }
    const newIngredient = {
      id: ingredients.length,
      name: ingredientInfo.name,
      ph: ingredientInfo.ph
    };
    ingredients.push(newIngredient);
    return ingredients;
  }

}
