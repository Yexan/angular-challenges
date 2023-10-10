import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private cities = new BehaviorSubject<City[]>([]);
  cities$ = this.cities.asObservable();

  addOne(city: City) {
    this.cities.next([...this.cities.value, city]);
  }

  addAll(cities: City[]) {
    this.cities.next(cities);
  }

  deleteOne(id: number) {
    this.cities.next(this.cities.value.filter((city) => city.id !== id));
  }
}
