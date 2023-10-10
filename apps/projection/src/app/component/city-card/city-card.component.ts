import { Component, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import { switchMap, tap } from 'rxjs/operators';
import { City } from '../../model/city.model';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (added)="addCity()">
      <ng-template #cardListItemRef let-city>
        <app-list-item (deleted)="deleteCity(city.id)">
          {{ city.name }}
          <br />
          {{ city.country }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  cities = toSignal(
    this.http.fetchCities$.pipe(
      tap((cities: City[]) => this.store.addAll(cities)),
      switchMap(() => this.store.cities$)
    ),
    {
      initialValue: [] as City[],
    }
  );

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(cityId: number) {
    this.store.deleteOne(cityId);
  }
}
