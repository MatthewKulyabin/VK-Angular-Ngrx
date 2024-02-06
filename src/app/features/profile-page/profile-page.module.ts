import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProfilePageComponent } from './profile-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ProfilePageComponent, EditUserFormComponent, UserComponent],
  imports: [CommonModule, ShareModule, ReactiveFormsModule, RouterModule],
})
export class ProfilePageModule {}
