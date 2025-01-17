import { useRef } from "react";
import { formatHourToMessage } from "../lib/timeConverter";
import { useEffect } from "react";

function ChatMessages({ messages, authUser, selectedUser }) {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat  ${
            message.senderId === authUser._id ? "chat-end" : "chat-start"
          }`}
          ref={messageEndRef}
        >
          <div className="chat-header mb-1 ">
            <time className="text-sx opacity-50 ml-1">
              {formatHourToMessage(message.createdAt)}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message.image && (
              <img
                src={message.image}
                alt="Anexo"
                className="sm:max-w-[200px] rounded-md mb-2 mx-auto"
              ></img>
            )}
            {message.text && <p>{message.text}</p>}
          </div>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full ">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profileImage || "/avatar.png"
                    : selectedUser.profileImage || "/avatar.png"
                }
                alt="Foto Perfil"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
