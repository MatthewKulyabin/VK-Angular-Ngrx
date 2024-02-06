import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() openModal!: boolean;
  @Input() closeModal!: () => void;
  @Input() modalHeader!: string;
}
