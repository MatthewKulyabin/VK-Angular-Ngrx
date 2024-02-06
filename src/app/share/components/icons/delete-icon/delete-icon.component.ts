import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-icon',
  templateUrl: './delete-icon.component.html',
  styleUrls: ['./delete-icon.component.scss'],
})
export class DeleteIconComponent {
  @Input() func!: (arg?: any) => any;
  @Input() class!: string;
  @Input() width: number = 25;
  @Input() height: number = 25;

  getClass(): string {
    return ` ${this.class} `;
  }
}
