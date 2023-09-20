declare module 'simple-datatables';

import { Component } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { BeerService } from './beer.service';
import { Beer } from './beer-interface';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
// import { DataTable } from "simple-datatables";
export class Filtro{
  name!: string;
  value!: string;

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'beer-project';
  myTable = document.querySelector("#dataTableExample") as HTMLTableElement ;
  beersList!:Observable<Beer[]>;
  optionSeledted: Filtro =   {name: 'Beer name', value: 'beer_name'} ;
  opcionesFiltro: Filtro[] = [
    {name: 'Beer name', value: 'beer_name'},
    {name: 'Yeast', value: 'yeast'},
    {name: 'Hops', value: 'hops'},
    {name: 'Malt', value: 'malt'},
    {name: 'Food', value: 'food'},
  ]
  private beerShearch = new Subject<string>();
  /**
   *
   */
  constructor(private beerService: BeerService) {
    
  }

  ngOnInit(){
    this.beersList = this.beerShearch.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value:string) => this.beerService.filterBeers(value, this.optionSeledted.value))
    )
  }

  changeFilter(data: Filtro){
    this.optionSeledted = data
  }

  shearch($event: Event){
    const dataInput = $event.currentTarget as HTMLInputElement;
    this.beerShearch.next(dataInput.value)
  }
 
}
