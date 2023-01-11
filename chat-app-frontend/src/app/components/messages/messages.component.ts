import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'messages',
  styleUrls: ['./messages.component.css'],
  template: `
    <div class="messages">
      <div
        class="messages-container"
        #messagesContainer
        [scrollTop]="messagesContainer.scrollHeight"
      >
        <ul>
          <div
            *ngFor="let message of messages"
            class="message-container"
            [ngClass]="{
              'message-received-container': user != message.userName,
              'message-send-container': user == message.userName
            }"
          >
            <li
              [ngClass]="{
                'message-received': user != message.userName,
                'message-send': user == message.userName
              }"
              class="message"
            >
              {{ message.content }}
            </li>
            <p>{{ message.date | date : 'medium' }}</p>
          </div>
        </ul>
      </div>

      <div class="send-message-bar">
        <form [formGroup]="form">
          <input type="text" formControlName="message" />
          <button
            type="submit"
            (click)="sendMessage(form.controls['message'].value)"
          >
            <mat-icon class="icon-send">send</mat-icon>
          </button>
        </form>
      </div>
    </div>
  `,
})
export class MessagesComponent implements OnInit {
  @Input()
  messages: Message[];
  @Input()
  user: string;

  @Output()
  messageSend: EventEmitter<Message>;

  form: FormGroup;

  constructor() {
    this.messages = [];
    this.user = '';
    this.messageSend = new EventEmitter<Message>();

    this.form = new FormGroup({
      message: new FormControl(''),
    });
  }

  ngOnInit() {}

  sendMessage(content: string) {
    if (content) {
      const message: Message = {
        userName: this.user,
        content,
        date: Date.now(),
      };
      this.messageSend.emit(message);
      this.form.controls['message'].setValue('');
    }
  }
}
