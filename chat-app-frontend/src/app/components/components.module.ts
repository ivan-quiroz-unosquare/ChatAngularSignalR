import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { NavbarComponent } from './navbar/navbar.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { MessagesComponent } from './messages/messages.component';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [
    NavbarComponent,
    ActiveUsersComponent,
    MessagesComponent,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [NavbarComponent, ActiveUsersComponent, MessagesComponent],
  providers: [],
})
export class ComponentsModule {}
