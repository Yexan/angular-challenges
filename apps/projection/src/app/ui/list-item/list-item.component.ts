import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <ng-content />
    <button (click)="deleted.emit()">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  standalone: true,
  host: {
    class: 'border border-grey-300 py-1 px-2 flex justify-between',
  },
})
export class ListItemComponent {
  @Output() deleted = new EventEmitter<void>();
}
