import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-play-icon',
  templateUrl: './play-icon.component.html',
  styleUrls: ['./play-icon.component.scss'],
})
export class PlayIconComponent {
  @Input() func!: (arg?: any) => any;
  @Input() class!: string;
  @Input() width: number = 25;
  @Input() height: number = 25;

  getClass(): string {
    return ` ${this.class} `;
  }
}
