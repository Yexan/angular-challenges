import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  Input,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-image]"></ng-content>

    <section>
      <ng-container *ngFor="let item of list">
        <ng-template
          [ngTemplateOutlet]="cardListItemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      </ng-container>
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="added.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T> {
  @Input() list: T[] = [];
  @Output() added = new EventEmitter<void>();

  @ContentChild('cardListItemRef', { read: TemplateRef })
  cardListItemTemplate!: TemplateRef<{ $implicit: T }>;
}
