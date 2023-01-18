import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'chat',
  styleUrls: ['./chat.component.css'],
  template: `
    <navbar [loggedIn]="true"></navbar>
    <div class="container">
      <active-users [activeUsers]="activeUsers"></active-users>
      <messages
        [messages]="conversation"
        [user]="user!.userName"
        (messageSend)="sendMessage($event)"
      ></messages>
    </div>
  `,
})
export class ChatComponent implements OnInit {
  user: User | undefined;
  conversation: Message[];

  activeUsers: string[];

  private connection: HubConnection;

  constructor(private _store: Store<AppState>) {
    this._store
      .select((state) => state.userState.user)
      .subscribe((response) => (this.user = response!));
    this.conversation = [];

    this.activeUsers = [];

    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7001/hubs/chat')
      .build();

    this.connection.on('NewMessage', (message) => this.newMessage(message));
    this.connection.on(
      'RefreshActiveUserList',
      (userList) => (this.activeUsers = userList)
    );
  }

  ngOnInit() {
    this.connection
      .start()
      .then((_) => {
        console.log('Connection started');

        // Get active users list
        this.connection.send('GetActiveUsers');

        // Get message history
        this.connection
          .invoke('GetMessages')
          .then((messageHistory) => (this.conversation = messageHistory))
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        return console.error(error);
      });
  }

  getUserInfo(): User {
    const userInfo = JSON.parse(localStorage.getItem('user_info')!);
    return { email: userInfo.email, userName: userInfo.username };
  }

  sendMessage(message: Message) {
    this.connection.send('SendMessage', JSON.stringify(message));
  }

  newMessage(message: Message) {
    this.conversation.push(message);
  }
}
