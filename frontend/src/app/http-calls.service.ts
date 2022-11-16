import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  constructor(private http: HttpClient) { }

  getIngredientsBypH(acid: boolean, alkaline: boolean) {
    return this.http.get(`http://localhost:3000/api/ingredients?acid=${acid}&alkaline=${alkaline}`);
  }

  getIngredientByName(name: string) {
    return this.http.get(`http://localhost:3000/api/ingredients/name/${name}`);
  }
}
