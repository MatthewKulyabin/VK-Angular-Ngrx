import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-icon',
  templateUrl: './edit-icon.component.html',
  styleUrls: ['./edit-icon.component.scss'],
})
export class EditIconComponent {
  @Input() func!: () => void;
  @Input() class!: string;
  @Input() style!: string;
  @Input() width: number = 25;
  @Input() height: number = 25;

  getClass(): string {
    return ` ${this.class} `;
  }
}
