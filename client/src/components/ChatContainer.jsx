import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInputMessage from "./ChatInputMessage";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import ChatMessages from "./ChatMessages";

function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInputMessage />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />
      <ChatMessages
        messages={messages}
        selectedUser={selectedUser}
        authUser={authUser}
      />
      <ChatInputMessage />
    </div>
  );
}

export default ChatContainer;
