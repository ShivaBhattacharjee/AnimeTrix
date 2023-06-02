
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
    window.scrollTo(0, 0);
  }, [chat])

  useEffect(() => {
    let copiedTimeout;

    if (copy) {
      copiedTimeout = setTimeout(() => {
        setCopy(false);
      }, 3500);
    }

    return () => {
      if (copiedTimeout) {
        clearTimeout(copiedTimeout);
      }
    };
  }, [copy]);

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
              <div>
                {copy ? (
                  <button className="text-copy">
                    <i class="fa-solid fa-check"></i>&nbsp;&nbsp;Copied
                  </button>
                ) : (
                  <CopyToClipboard text={message.message} onCopy={() => setCopy(true)}>
                    <button className="text-copy">
                      <i className="fa-regular fa-clipboard"></i>&nbsp;&nbsp;Copy Text
                    </button>
                  </CopyToClipboard>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div ref={bottomRef} className="height"></div>
    </div>
  );
};

export default ChatBody;