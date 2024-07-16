import React from "react";
import { ChatInputProps } from "../../types";

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem(
      "message-input"
    ) as HTMLInputElement;
    onSend(input.value);
    input.value = "";
  };

  return (
    <footer className="p-4 border-t">
      <form onSubmit={handleSubmit}>
        <label htmlFor="message-input" className="sr-only">
          Type a message
        </label>
        <input
          type="text"
          id="message-input"
          name="message-input"
          placeholder="Type a message"
          className="w-full p-2 rounded-full border"
        />
      </form>
    </footer>
  );
};

export default ChatInput;
