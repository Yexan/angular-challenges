import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap, switchMap } from 'rxjs/operators';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (added)="addStudent()">
      <img card-image src="assets/img/student.webp" width="200px" />

      <ng-template #cardListItemRef let-student>
        <app-list-item (deleted)="deleteStudent(student.id)">
          {{ student.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  students = toSignal(
    this.http.fetchStudents$.pipe(
      tap((students: Student[]) => this.store.addAll(students)),
      switchMap(() => this.store.students$)
    ),
    {
      initialValue: [] as Student[],
    }
  );

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
