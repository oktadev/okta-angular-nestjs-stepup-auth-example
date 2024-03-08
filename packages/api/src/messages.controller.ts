import { Controller, Get } from '@nestjs/common';

interface Message {
    id: number;
    text: string;
}

const MESSAGES: Message[] = [
    {id: 1, text: 'I am a robot'},
    {id: 2, text: 'Hello, world!'}
];

@Controller('messages')
export class MessagesController {
    @Get()
    getMessages(): Message[] {
        return MESSAGES;
    }
}
