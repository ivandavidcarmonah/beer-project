import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer } from './beer-interface';
import { EMPTY, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private baseUrl = `https://api.punkapi.com/v2/`;
  public PAGE = 1;
  public PER_PAGE = 25;

  constructor(private http: HttpClient) { }

  getBeers() {
    return this.http.get<Beer[]>(`${this.baseUrl}beers?page=${this.PAGE}&per_page=${this.PER_PAGE}`).pipe
    (
        dataResponse => {
          return dataResponse;
        }
    )
  }

  filterBeers(value:string, optionSelected: string){
    
    return this.http.get<Beer[]>(`${this.baseUrl}beers?${optionSelected}=${value}`).pipe
    (
      map(
        dataresponse => { return dataresponse}
      ),
      catchError(() => [])
    )
  }

}
