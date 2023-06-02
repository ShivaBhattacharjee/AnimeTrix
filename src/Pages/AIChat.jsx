import { useState } from "react";
import { ChatBody, ChatInput } from "../Components";
import { useMutation } from "react-query";
import { fetchResponse } from "../Components/ChatBotapi.js";
function AIChat() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <>
      <div className="chat-container">

        <div className="chat-container-heading">
              <h1>AnimeTrix Bot</h1>
              <p className="short-desc">Its a fun Ai bot which can recommend anime and chat with you</p>
        </div>

        <div
          className="chat-body"
        >
          <ChatBody chat={chat} />
        </div>

        {/* input */}
        <div className="chat-input">
          <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
        </div>
      </div>
    </>
  );
}

export default AIChat;