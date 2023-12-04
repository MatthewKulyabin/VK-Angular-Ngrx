import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPageComponent } from './messages-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [MessagesPageComponent],
  imports: [CommonModule, ReactiveFormsModule, ShareModule],
})
export class MessagePageModule {}
