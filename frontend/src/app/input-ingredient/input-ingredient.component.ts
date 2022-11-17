import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, mergeMap } from 'rxjs';
import { HttpCallsService } from '../http-calls.service';

@Component({
  selector: 'app-input-ingredient',
  templateUrl: './input-ingredient.component.html',
  styleUrls: ['./input-ingredient.component.scss']
})
export class InputIngredientComponent implements OnInit {

  inputFormControl = new FormControl('', []);
  constructor(private httpCall: HttpCallsService) { }

  ngOnInit(): void {
  }

  getIngredientpH(name: string) {
    let ingredientPh;
    this.httpCall.getIngredientByName(name).subscribe(response => {
      ingredientPh = response;
      console.log(ingredientPh);
      console.log(response);
    });
    console.log(ingredientPh);
    return ingredientPh;
  }

  getMatches() {
    const name = this.inputFormControl.value || '';
    this.httpCall.getIngredientByName(name).pipe(
      mergeMap(response => this.httpCall.getMatches(response[0].id))
    )
    .subscribe(response => { console.log(response) });
  }

  findMatchListBypH() {
    const inputValue = this.inputFormControl.value || '';
    const ph = this.getIngredientpH('Cenoura');
    //const ingredientsList = this.getIngredientsListBypH(ph);
  }

  getIngredientsListBypH(ph: number) {
    const alkaline = true;
    const acid = false;
    //phClassification >= 7 ? acid = true : alkaline = true;
    this.httpCall.getIngredientsBypH(acid, alkaline).subscribe(response => console.log(response));
  }

}
