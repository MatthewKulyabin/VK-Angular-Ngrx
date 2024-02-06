import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesPageComponent } from './messages-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { MessageLeftSideComponent } from './message-left-side/message-left-side.component';
import { MessageRightSideComponent } from './message-right-side/message-right-side.component';

@NgModule({
  declarations: [
    MessagesPageComponent,
    MessageLeftSideComponent,
    MessageRightSideComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ShareModule],
})
export class MessagePageModule {}
