import React from "react";
import { TMessage } from "../types/chat";
import useAuth from "../utils/useAuth";

type Props = {
  messages: TMessage[];
};

function ChatMessages({ messages }: Props) {
  const { profile } = useAuth();

  return (
    <div className="flex flex-col overflow-y-scroll h-full pb-[64px]">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={`${
              message.author_id === profile?.user_id ? "bg-paw-green-0 text-right p-2" : "bg-input-grey-2 p-2"
            } text-xl font-montserrat-regular h-fit max-w-full`}
          >
            {message.content}
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
