import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, mergeMap } from 'rxjs';
import { HttpCallsService } from '../http-calls.service';

interface Ingredient {
  id: number;
  name: string;
  ph: number;
}

@Component({
  selector: 'app-input-ingredient',
  templateUrl: './input-ingredient.component.html',
  styleUrls: ['./input-ingredient.component.scss']
})

export class InputIngredientComponent implements OnInit {

  //matches: Ingredient[] = [];
  treatedData: Ingredient[] = [];
  matches: string = '';
  showMatches = false;
  inputFormControl = new FormControl('', []);
  constructor(private httpCall: HttpCallsService) { }

  ngOnInit(): void {
  }

  getMatches() {
    const name = this.inputFormControl.value || '';
    this.httpCall.getIngredientByName(name).pipe(
      mergeMap(response => this.httpCall.getMatches(response[0].id))
    )
    .subscribe(response => {
      console.log('MATCHES: ', response);
      this.treatedData = response.map(ingredient => {
        return {
          id: ingredient.id,
          name: ingredient.name,
          ph: ingredient.ph
      }
      });
      this.matches = JSON.stringify(this.treatedData);
      this.showMatches = true });
  }
}
