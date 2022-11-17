import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Ingredient {
  id: number;
  name: string;
  ph: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  constructor(private http: HttpClient) { }

  getIngredientsBypH(acid: boolean, alkaline: boolean) {
    return this.http.get(`http://localhost:3000/api/ingredients?acid=${acid}&alkaline=${alkaline}`);
  }

  getIngredientByName(name: string) {
    return this.http.get<Ingredient[]>(`http://localhost:3000/api/ingredients?name=${name}`);
  }

  getMatches(id: number) {
    return this.http.get<Ingredient[]>(`http://localhost:3000/api/ingredients/${id}/matches`);
  }
}
