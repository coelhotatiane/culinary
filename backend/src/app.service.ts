import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class AppService {
  constructor(
    @InjectKnex() private readonly knex: Knex
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getIngredientById(id: string): Promise<Object> {
    return this.knex.table('ingredients').where('id', id);
  }
  getIngredientByName(name: string) {
    return this.knex.table('ingredients').where('name', name);
  }
  getIngredientsBypHCategory(phMin: number, phMax: number): Promise<Object> {
    return this.knex.table('ingredients').where('ph', '>', phMin).andWhere('ph', '<', phMax);
  }

}
