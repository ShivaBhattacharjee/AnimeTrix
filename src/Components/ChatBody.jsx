
import React, { useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";


const ChatBody = ({ chat }) => {
  const aiStyle =
    "ai-style";

    const parent = useRef(null);
    const bottomRef = useRef(null);


    useEffect(()=>{
        parent.current && autoAnimate(parent.current);
    }, [parent])


    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [chat])

  return (
    <div className="chat-main-details" ref={parent}>
      {chat.map((message, i) => {
        return (
          <div
            key={i}
            className={`chat-aiandhuman ${
              message.sender === "ai" && aiStyle
            }`}
          >
            <span className="chat-message">
              <span>{message.message}</span>
            </span>
          </div>
        );
      })}

      <div ref={bottomRef} className="height"></div>
    </div>
  );
};

export default ChatBody;