import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-ingredient',
  templateUrl: './input-ingredient.component.html',
  styleUrls: ['./input-ingredient.component.scss']
})
export class InputIngredientComponent implements OnInit {

  inputFormControl = new FormControl('', []);
  constructor() { }

  ngOnInit(): void {
  }

  findIngredientsList() {
    console.log('helloooo darling');

  }

}
