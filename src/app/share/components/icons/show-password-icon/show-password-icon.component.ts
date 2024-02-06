import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-password-icon',
  templateUrl: './show-password-icon.component.html',
  styleUrls: ['./show-password-icon.component.scss'],
})
export class ShowPasswordIconComponent {
  @Input() showPassword!: () => void;
}
