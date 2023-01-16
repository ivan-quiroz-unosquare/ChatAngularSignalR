import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';

@Component({
  selector: 'chat',
  styleUrls: ['./chat.component.css'],
  template: `
    <div class="container">
      <active-users [activeUsers]="activeUsers"></active-users>
      <messages
        [messages]="conversation"
        [user]="user.userName"
        (messageSend)="sendMessage($event)"
      ></messages>
    </div>
  `,
})
export class ChatComponent implements OnInit {
  user: User;
  conversation: Message[];

  activeUsers: string[];

  private connection: HubConnection;

  constructor() {
    this.user = this.getUserInfo();
    this.conversation = [];

    this.activeUsers = [];

    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7001/hubs/chat')
      .build();

    this.connection.on('NewMessage', (message) => this.newMessage(message));
    this.connection.on('UserConnected', (username) =>
      this.userConnected(username)
    );
    this.connection.on('UserDisconnected', (username) =>
      this.userDisconnected(username)
    );
  }

  ngOnInit() {
    this.connection
      .start()
      .then((_) => {
        console.log('Connection started');
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

  userConnected(username: string) {
    this.activeUsers.push(username);
  }

  userDisconnected(username: string) {
    this.activeUsers = this.activeUsers.filter((x) => x != username);
  }
}
