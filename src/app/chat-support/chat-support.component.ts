import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

interface ChatApiResponse {
  responseText: string; // Adjust this based on the actual API response structure
}

@Component({
  selector: 'app-chat-support',
  templateUrl: './chat-support.component.html',
  styleUrls: ['./chat-support.component.css']
})




export class ChatSupportComponent {
  chatForm: FormGroup;
  messages: { sender: string, text: string }[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.chatForm = this.fb.group({
      message: ''
    });
  }

  sendMessage() {
    const userMessage = this.chatForm.value.message;
    if (!userMessage.trim()) return;
  
    this.messages.push({ sender: 'User', text: userMessage });
  
    this.apiService.getChatGptResponse(userMessage).subscribe(
      (response:any) => {
        // Now TypeScript knows that 'responseText' is a property of 'response'
        const chatGptReply = response.responseText || 'No response text';
        this.messages.push({ sender: 'ChatGPT', text: chatGptReply });
      },
      error => {
        this.messages.push({ sender: 'ChatGPT', text: 'Error: Unable to process your request.' });
      }
    );
  
    this.chatForm.reset();
  }
  
  
}
