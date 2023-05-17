
import React, { useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ChatBody = ({ chat }) => {
  const [copy, setCopy] = useState(false)
  const aiStyle =
    "ai-style";

  const parent = useRef(null);
  const bottomRef = useRef(null);


  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent])


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  return (
    <div className="chat-main-details" ref={parent}>
      {chat.map((message, i) => {
        return (
          <div
            key={i}
            className={`chat-aiandhuman ${message.sender === "ai" && aiStyle
              }`}
          >
            <span className="chat-message">
              <span>{message.message}</span>
            </span>
            <br />
            {message.sender === "ai" && (
              <CopyToClipboard text={message.message}
                onCopy={() => setCopy(true)}>
                <button className={`text-copy ${copy ? "copied" : null}`}>
                  <i class="fa-regular fa-clipboard"></i>&nbsp;&nbsp;Copy Text</button>
              </CopyToClipboard>
            )}
          </div>
        );
      })}

      <div ref={bottomRef} className="height"></div>
    </div>
  );
};

export default ChatBody;