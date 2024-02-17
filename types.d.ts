export interface WelcomeMessage {
    username: string;
}

export interface ChatMessage{
    username: string,
    message: string
}

export interface PixelMessage{
    x: number,
    y: number,
    color: string,
    username: string
}