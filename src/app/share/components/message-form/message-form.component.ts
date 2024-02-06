import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as MessagesActions from '../../state/messages/actions';
import { AppStateInterface } from '../../state/app-state-interface';
import { LocalStorageService } from '../../services/local.storage.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent {
  @Input() closeMessageModal!: () => void;

  messageForm: FormGroup;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.messageForm = new FormGroup({
      message: new FormControl('', { validators: [Validators.required] }),
    });
  }

  sendMessage(): void {
    this.store.dispatch(
      MessagesActions.addMessage({
        message: {
          userId: this.localStorageService.getCurrentUserId(),
          receiverId: Number(this.route.snapshot.paramMap.get('id')),
          message: this.messageForm.value.message,
          publish_date: new Date(),
        },
      })
    );

    this.messageForm.reset();
    this.closeMessageModal();
  }
}
