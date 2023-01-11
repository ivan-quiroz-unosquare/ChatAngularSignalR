import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';

import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [ChatComponent, LoginComponent, RegisterComponent],
  declarations: [ChatComponent, LoginComponent, RegisterComponent],
  providers: [],
})
export class ViewsModule {}
