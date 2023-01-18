import {
  Component,
  AfterViewChecked,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'messages',
  styleUrls: ['./messages.component.css'],
  template: `
    <div class="messages">
      <div class="messages-container" #messagesContainer>
        <div
          #messageContainer
          *ngFor="let message of messages"
          class="message-container"
          [ngClass]="{
            'message-received-container': user != message.userName,
            'message-send-container': user == message.userName
          }"
        >
          <p *ngIf="user != message.userName">{{ message.userName + ':' }}</p>
          <div
            [ngClass]="{
              'message-received': user != message.userName,
              'message-send': user == message.userName
            }"
            class="message"
          >
            {{ message.content }}
          </div>
          <p>{{ message.date | date : 'medium' }}</p>
        </div>
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
export class MessagesComponent implements AfterViewChecked {
  @Input()
  messages: Message[];
  @Input()
  user: string;

  @Output()
  messageSend: EventEmitter<Message>;

  @ViewChild('messagesContainer')
  messagesContainer: ElementRef;

  form: FormGroup;

  constructor() {
    this.messages = [];
    this.user = '';
    this.messageSend = new EventEmitter<Message>();

    this.form = new FormGroup({
      message: new FormControl(''),
    });

    this.messagesContainer = new ElementRef('');
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(content: string) {
    if (content) {
      const message: Message = {
        userName: this.user,
        content,
        date: new Date().toJSON(),
      };
      this.messageSend.emit(message);
      this.form.controls['message'].setValue('');
    }
  }

  scrollToBottom = () => {
    try {
      this.messagesContainer.nativeElement.scrollTo(
        0,
        this.messagesContainer.nativeElement.scrollHeight
      );
    } catch (err) {}
  };
}
