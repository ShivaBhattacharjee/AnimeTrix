
import React from "react";
import { useState } from "react";
import loader from '../img/loader.gif'
import { AiOutlineSend } from "react-icons/ai"
const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("Hi, Can you help me?");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div
      className="input-main"
    >
      {loading ? (
        <img src={loader} className="loader-input" alt="loading" />
      ) : (
        <>
          <textarea
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          <AiOutlineSend
            onClick={handleSubmit}
            className="input-submit"
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;