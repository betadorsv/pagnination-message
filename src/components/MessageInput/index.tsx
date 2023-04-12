import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";
import { RootState } from "../../app/store/rootSotre";
import { useSocket } from "../../hooks/useWebsocket";
import "./MessageInput.scss";

export default function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const [enterMessage, setEnterMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");
  const userInfo = JSON.parse(window.localStorage.getItem("user"));
  const roomId: any = useSelector((state: RootState) => state.channel.roomId);
  const [messageArray, setMessageArray] = useState<any>([]);
  const [onPaste, setOnPaste] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [onEdited, setOnEdited] = useState<boolean>(false);

  const [messageArrayEnter, setMessageArrayEnter] = useState<any>([]);

  const [indexMessage, setIndexMessage] = useState<number>(0);
  const { sendJsonMessage, lastJsonMessage } = useSocket();
  // let newArray = useRef([]);
  let tempArray = useRef([]);

  let text = useRef("");
  let count = useRef(1);
  let index = useRef(0);
  let step = useRef(0);
  let startCut = useRef(0);

  const handlechangeMessage = (e: any) => {
    let value = e.target.value;
    setMessage(e.target.value);
    console.log(value);
    if (value.length > 0) {
    }
    if (!onPaste) {
      for (let index = startCut.current; index <= value.length; index++) {
        const element = value[index];
        tempArray.current[step.current] = value.substr(
          startCut.current,
          value.length
        );
        setMessageArrayEnter(tempArray.current);

        if (
          tempArray.current[step.current].replace(/[^\n]/g, "").length % 4 ===
            0 &&
          tempArray.current[step.current].replace(/[^\n]/g, "").length !== 0
        ) {
          step.current++;
          startCut.current = 0;
          value = "";
          setPage(page + 1);
          setMessage("");
        }
      }
    } else {
      cutMessage(
        value.substr(
          startCut.current > 0 ? startCut.current - 1 : 0,
          value.length
        )
      );
      setOnPaste(false);
    }
  };

  const cutMessage = (value: string) => {
    let fullText = "";
    let newArray = [];

    const result = splitStringsEnter(value);

    if (result.length > 0) {
      for (let index = 1; index <= result.length; index++) {
        fullText = fullText + (result[index - 1] ? result[index - 1] : "");

        if (index % 5 === 0 && index !== 0 && fullText !== undefined) {
          newArray.push({
            insert: index > 5 ? fullText.substr(1, fullText.length) : fullText,
          });
          fullText = "";
        } else if (index === result.length && fullText.length > 0) {
          newArray.push({
            insert: fullText.substr(1, fullText.length),
          });
          fullText = "";
        }
      }
    }

    for (let index = 0; index <= newArray.length; index++) {
      tempArray.current[step.current] = newArray[index]?.insert;
      step.current++;
    }
    step.current--;
    startCut.current = tempArray.current.join().length - 2;

    setMessageArrayEnter(tempArray.current);
  };

  const cutMessageByLimit = (value: string) => {
    let fullText = "";
    let newArray = [];

    const result = splitStrings(value);
    if (result.length > 0) {
      for (let index = 0; index <= result.length; index++) {
        fullText = fullText + (result[index] ? result[index] : "");
        if (index % 5 === 0 && index !== 0 && fullText !== undefined) {
          newArray.push({
            insert: fullText,
          });
          fullText = "";
        } else if (index === result.length && fullText.length > 0) {
          newArray.push({
            insert: fullText,
          });
          fullText = "";
        }
      }
    }

    setMessageArray([...messageArray, ...newArray]);
  };

  const splitStrings = (str: any) => {
    const result = [];
    let startIndex = 0;
    let maxLines = 5;
    let maxTextForLine = 10;
    let maxOfString = maxLines * maxTextForLine;

    while (startIndex < str.length) {
      let substring = str.substr(startIndex, maxOfString);
      if (substring.trim().length === 0) {
        startIndex += maxOfString;
        continue;
      }
      if (substring.length === maxOfString) {
        let endIndex = startIndex + maxOfString;
        while (
          endIndex < str.length &&
          str[endIndex] !== " " &&
          str[endIndex] !== "\t"
        ) {
          endIndex++;
        }
        substring = str.substring(startIndex, endIndex);
      }
      result.push(substring.trim());
      startIndex += substring.length;
    }
    return result;
  };

  const splitStringsEnter = (str: string) => {
    const result = [];
    let startIndex = 0;
    let endIndex = 0;
    while (startIndex <= str.length) {
      let substring = str;
      if (str[startIndex] === "\n") {
        substring = str.substring(endIndex, startIndex);
        endIndex = startIndex;
        result.push(substring);
      } else if (startIndex === str.length) {
        substring = str.substring(endIndex, startIndex);
        endIndex = startIndex;
        result.push(substring);
      }
      startIndex++;
    }

    return result;
  };

  const sliceToNewArray = (str: string) => {
    const result = [];
    let startIndex = 0;
    let maxLines = 5;
    let maxTextForLine = 10;
    let fullText = "";

    while (startIndex < str.length) {
      let substring = str.substr(startIndex, maxTextForLine);
      if (substring.trim().length === 0) {
        startIndex += maxTextForLine;
        continue;
      }
      if (substring.length === maxTextForLine) {
        let endIndex = startIndex + maxTextForLine;
        while (
          endIndex < str.length &&
          str[endIndex] !== " " &&
          str[endIndex] !== "\t"
        ) {
          endIndex++;
        }
        substring = str.substring(startIndex, endIndex);
      }
      fullText += substring.trim() + "\n";
      startIndex += substring.length;
    }
    return fullText;
  };
  //////

  /**
   * Check click enter to send message
   * @param e
   */
  const checkOnKeyUp = (e: any) => {
    //check empty messages
    if (
      e.target.value.length > 0 &&
      e.target.value !== "\n" &&
      e.target.value.trim()
    ) {
      //   setDisableBtnSend(false);
      if (e.key === "Enter" && !e.shiftKey && e.keyCode === 13) {
        handleSendMessage(); //handle send message

        e.preventDefault();
      }
    } else {
      //   setDisableBtnSend(true);
    }
  };

  const handleSendMessage = () => {
    let param = {
      ptCommand: 327682,
      ptGroup: 327680,
      ptDevice: "",
      params: {
        chatId: uuidv1(),
        messageType: "0",
        userName: userInfo.userName,
        message: message,
        userId: userId,
        roomId: roomId,
        chatType: "0",
      },
    };
    // cutMessage(message);
    // cutMessageByLimit(message)
    // sendJsonMessage(param);
    // setMessage(""); //reset input message
  };

  const registerSocket = () => {
    let atk = localStorage.getItem("atk"); //accessToken
    let param = {
      ptCommand: 65543,
      ptGroup: 65536,
      ptDevice: "",
      params: {
        atk: atk,
      },
    };
    sendJsonMessage(param);
  };

  const handleCheckEnter = (e: any) => {
    if (e.which == 13) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    registerSocket();
  }, []);

  const filterMess = messageArrayEnter.filter((mess: any) => {
    return mess !== "" && mess;
  });

  const onEdit = (e) => {
    let value = e.target.value;
    console.log(value);
    setMessage(value);
    if (!onPaste) {
      for (let index = 0; index <= value.length; index++) {
        const element = value[index];
        tempArray.current[page] = value.substr(0, value.length);
        setMessageArrayEnter(tempArray.current);
        console.log( tempArray.current[page].replace(/[^\n]/g, "").length)
        if (
          tempArray.current[page].replace(/[^\n]/g, "").length >=5 &&
          tempArray.current[page].replace(/[^\n]/g, "").length > 0
        ) {
          step.current++;
          startCut.current = 0;
          value = "";
          setPage(step.current);
          setMessage("");
        } else {
        }
      }
    } else {
      cutMessage(
        value.substr(
          startCut.current > 0 ? startCut.current - 1 : 0,
          value.length
        )
      );
      setOnPaste(false);
    }
  };
  console.log(filterMess.length)
  console.log(page)



  return (
    <>
      <div className="message-input-container">
        {step.current === page ? (
          <textarea
            onPaste={() => {
              setOnPaste(true);
            }}
            value={message}
            onKeyDown={(e) => checkOnKeyUp(e)}
            onChange={handlechangeMessage}
          />
        ) : (
          <textarea
            onPaste={() => {
              setOnPaste(true);
            }}
            value={message}
            onKeyDown={(e) => checkOnKeyUp(e)}
            onChange={onEdit}
            disabled={!onEdited}
          />
        )}
        {page + 1}
        {/* <button onClick={handleSendMessage}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6532/6532019.png"
            alt=""
          />
        </button> */}
        <div></div>
      </div>
      <div>
        <button
          className="lui"
          onClick={() => {
            if (page > 0) {
              setMessage(filterMess[page - 1]);
              setPage(page - 1);
              setOnEdited(false);
            }
          }}
        >
          Lui
        </button>
        <button
          onClick={() => {
            if (page < filterMess.length) {
              setMessage(filterMess[page + 1]);
              setPage(page + 1);
              setOnEdited(false);
            }
          }}
        >
          next
        </button>
        <button
          onClick={() => {
            setOnEdited(true);
          }}
        >
          Edit
        </button>
      </div>
      {/* <div className="message-test-page">
        <div className="message-test-page--message">
          {messageArray.length > 0
            ? messageArray[indexMessage]?.insert.replace("undefined", "")
            : enterMessage}
        </div>
        <button
          onClick={() => {
            if (indexMessage > 0) {
              setIndexMessage(indexMessage - 1);
            }
          }}
        >
          lui
        </button>
        <button
          onClick={() => {
            if (indexMessage < messageArray?.length) {
              setIndexMessage(indexMessage + 1);
            }
          }}
        >
          next
        </button>
        {indexMessage}/
        {messageArray.length > 1
          ? messageArray.length - 1
          : messageArray.length}
      </div> */}

      <div className="message-test-page">
        <div className="message-test-page--message">
          {filterMess[indexMessage]}
        </div>
        <div>
          {messageArrayEnter?.length > 1 && (
            <div>
              <button
                onClick={() => {
                  if (indexMessage > 0) {
                    setIndexMessage(indexMessage - 1);
                  }
                }}
              >
                Back{" "}
              </button>
              <button
                onClick={() => {
                  if (indexMessage < messageArrayEnter?.length) {
                    setIndexMessage(indexMessage + 1);
                  }
                }}
              >
                Next{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
