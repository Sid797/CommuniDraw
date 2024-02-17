import { ChatMessage, WelcomeMessage } from "../../types";
import { io } from "../server";

export function emitMessage(msg: ChatMessage){
    console.log(`New message from ${msg.username}: ${msg.message}`);
    io.emit("message", msg);
}

export function emitWelcome(welcome: WelcomeMessage){
    console.log(`Join: ${welcome.username}`);
    io.emit("welcome", `${welcome.username} has joined the chat`);
}