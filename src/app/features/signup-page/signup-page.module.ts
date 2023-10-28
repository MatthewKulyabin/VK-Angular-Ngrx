import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupPageComponent } from './signup-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SignupPageModule {}
