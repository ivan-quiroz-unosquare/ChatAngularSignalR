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
        [user]="userName"
        (messageSend)="sendMessage($event)"
      ></messages>
    </div>
  `,
})
export class ChatComponent implements OnInit {
  public userName = 'kobura';
  public groupName = '';
  public messageToSend = '';
  public joined = false;
  public conversation: Message[] = [
    {
      content: 'Welcome',
      userName: 'System',
      date: Date.now(),
    },
    {
      content: 'Hello!',
      userName: 'kobura',
      date: Date.now(),
    },
    {
      content:
        'Dolor reprehenderit aliquip pariatur magna culpa magna et non veniam anim esse consectetur fugiat. Anim enim tempor enim excepteur commodo nisi sit sint adipisicing esse officia. Enim tempor nostrud esse Lorem. Adipisicing mollit ex et reprehenderit nostrud esse enim dolor ea cupidatat nostrud. Adipisicing consectetur commodo occaecat mollit ut eiusmod cillum deserunt anim fugiat.!',
      userName: 'kobura',
      date: Date.now(),
    },
    {
      content:
        'Est magna culpa sunt laboris qui magna. Labore commodo esse commodo est occaecat elit enim aute fugiat laboris anim consectetur tempor. Anim excepteur dolor excepteur est ex non aliquip pariatur minim occaecat sunt anim sunt sint. Aute cillum minim Lorem deserunt incididunt. Tempor ad voluptate commodo laboris non adipisicing nisi minim eu labore est.',
      userName: 'System',
      date: Date.now(),
    },
    {
      content:
        'Voluptate aute non nulla labore mollit enim nostrud non quis dolor. Nulla enim excepteur consectetur adipisicing cupidatat. Incididunt ea culpa eiusmod sint ut aute nisi pariatur quis velit velit veniam.',
      userName: 'kobura',
      date: Date.now(),
    },
    {
      content:
        'Dolor reprehenderit aliquip pariatur magna culpa magna et non veniam anim esse consectetur fugiat. Anim enim tempor enim excepteur commodo nisi sit sint adipisicing esse officia. Enim tempor nostrud esse Lorem. Adipisicing mollit ex et reprehenderit nostrud esse enim dolor ea cupidatat nostrud. Adipisicing consectetur commodo occaecat mollit ut eiusmod cillum deserunt anim fugiat.!',
      userName: 'kobura',
      date: Date.now(),
    },
  ];

  activeUsers: User[];

  // private connection: HubConnection;

  constructor() {
    this.activeUsers = [
      { email: 'test_user1@email.com', userName: 'test_user1' },
      { email: 'test_user2@email.com', userName: 'test_user2' },
      { email: 'test_user3@email.com', userName: 'test_user3' },
      { email: 'test_user4@email.com', userName: 'test_user4' },
    ];
    // this.connection = new HubConnectionBuilder()
    //   .withUrl('http://localhost:7001')
    //   .build();
  }

  ngOnInit() {
    // this.connection
    //   .start()
    //   .then((_) => {
    //     console.log('Connection started');
    //   })
    //   .catch((error) => {
    //     return console.error(error);
    //   });
  }

  sendMessage(message: Message) {
    this.conversation.push(message);
  }
}
