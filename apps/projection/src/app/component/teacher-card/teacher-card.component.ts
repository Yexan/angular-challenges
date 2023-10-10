import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { switchMap, tap } from 'rxjs/operators';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (added)="addTeacher()">
      <img card-image src="assets/img/teacher.png" width="200px" />

      <ng-template #cardListItemRef let-teacher>
        <app-list-item (deleted)="deleteTeacher(teacher.id)">
          {{ teacher.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  teachers = toSignal(
    this.http.fetchTeachers$.pipe(
      tap((teachers) => this.store.addAll(teachers)),
      switchMap(() => this.store.teachers$)
    ),
    {
      initialValue: [] as Teacher[],
    }
  );

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
