import { Component, Input, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  id: number;
  ph: number;
}

//ELEMENT_DATA será recebido pelo back
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', ph: 1.0079},
  {id: 2, name: 'Helium', ph: 4.0026},
  {id: 3, name: 'Lithium', ph: 6.941},
  {id: 4, name: 'Beryllium', ph: 9.0122},
  {id: 5, name: 'Boron', ph: 10.811}
];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'ph'];
  @Input() dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
