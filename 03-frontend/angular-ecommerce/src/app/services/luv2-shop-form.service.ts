import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    
    let data: number[] = [];

    // Matriz para recorrer los meses

    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }
    // El operador OF de Rxjs convierte el objeto en Observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];

    // Matriz para la lista desplegable del año
    // Comienza con el año actual hasta 10 años +

    // getFullYear devuelve el año actual
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }
    return of (data);
  }
}

  interface GetResponseCountries{
    _embedded: {
      countries: Country[];
    }
  }

  interface GetResponseStates{
    _embedded: {
      states: State[];
    }
  }
