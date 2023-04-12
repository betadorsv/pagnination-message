import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./channelTalk.scss";
const MAX_TEXT = 250; // about max charcater in 1 page

export default function ChannelTalk() {
  const [message, setMessage] = useState<string>("");
  const [messageEdit, setMessageEdit] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [onPaste, setOnpaste] = useState<boolean>(false);

  const [arrayMessage, setArrayMessage] = useState<any>([]);
  const [messageArray, setMessageArray] = useState<any>([]);
  const [currentInput, setCurrentInput] = useState<number>(0);
  const textAreaRef = useRef();
  const textAreaRefEdit = useRef();

  const messArr = useRef([]); // get temp array messsage
  const rowLine = useRef(0); // get row of line

  const onChangeMessage = (e) => {
    let value = e.target.value;

    let rowText = getTextareaNumberOfLines(textAreaRef.current); // get row of textarea
    if (rowText > 0) {
      rowLine.current++;
    }

    if (onPaste) {
      if (rowLine.current > 2) {
        rowLine.current = rowLine.current - 2;
      }

      let result = cutMessageByLimit(value);
      messArr.current.push(...result);
      if (rowText > 5) {
        //5 is limit  line of 1page(in 1 textarea)
        setMessage("");
      }
      setOnpaste(false);
    } else {
      /**
       * get text of page 1 if if the text is as long as the specified limit and  only slice text
       * find the nearest white space at the bounds to cut
       */
      rowLine.current = rowText;
      if (rowText > 5) {
        let text = { insert: value.substr(0, value.length) }; // get text if equal limit line
        messArr.current.push(text); // push text into temp message array
        setMessageArray(messArr.current);
        setMessage("");
        value = "";
        setCurrentInput(currentInput + 1); // increase index of array
      } else {
        setMessage(value);
      }
    }
  };

  /**
   * cut messsage is as long as the specified limit
   * @param value message
   * @returns
   */
  const cutMessageByLimit = (value: string) => {
    let fullText = "";
    let newArray = [];
    let line = 5 - value.replace(/[^\n]/g, "").length; // check if user enter more
    const result = splitStrings(value);

    if (result.length > 0) {
      for (let index = 1; index <= result.length + 1; index++) {
        fullText = fullText + (result[index - 1] ? result[index - 1] : "");

        if (index % line === 0 && index !== 0 && fullText !== undefined) {
          console.log(fullText);
          newArray.push({
            insert: fullText,
          });
          rowLine.current = 0;
          line = line + 5;
          fullText = "";
        } else if (index === result.length + 1 && fullText.length > 0) {
          newArray.push({
            insert: fullText,
          });
          line = line + 5;

          rowLine.current = 0;
          fullText = "";
        }
      }
    }
    setMessageArray([...messageArray, ...newArray]);
    return newArray;
  };

  const splitStrings = (str: any) => {
    const result = [];
    let startIndex = 0;

    let maxOfString = 52; //max Of String in 1 line;

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
          str[endIndex] !== "\t" &&
          str[endIndex] !== "\n"
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

  /**
   * On edit message
   * when edit only edit in this page, can't enter long more than number of limited
   * @param e
   */
  const onEditMessage = (e) => {
    let value = e.target.value;

    if (getTextareaNumberOfLines(textAreaRefEdit.current) < 5) {
      setMessageEdit(value);
      messArr.current[currentInput].insert = value;
      setArrayMessage(messArr);
    } else if (getTextareaNumberOfLines(textAreaRefEdit.current) === 5) {
      {
        setMessageEdit(value);
        messArr.current[currentInput].insert = value;
        setArrayMessage(messArr);
      }
    }
  };

  const getTextareaNumberOfLines = (textarea: any) => {
    if (textarea) {
      let height = textarea?.style?.height,
        lines;

      textarea.style.height = 0;

      lines = parseInt(
        String(
          textarea.scrollHeight /
            parseInt(getComputedStyle(textarea).lineHeight)
        )
      );
      textarea.style.height = height;
      return lines;
    }
  };

  return (
    <div className="channel-talk">
      <p>Tối đa 5 dòng, mỗi dòng giới hạn 50 ký tự ( có thể thay đổi)</p>
      {message.length > 250 && (
        <p style={{ color: "red" }}>Chuan bi nhay sang trang moi</p>
      )}
      <div className="channel-talk--input">
        {currentInput === messageArray.length ? (
          <textarea
            autoFocus
            ref={textAreaRef}
            value={message}
            onChange={onChangeMessage}
            onPaste={() => setOnpaste(true)}
          />
        ) : (
          <textarea
            ref={textAreaRefEdit}
            value={edit ? messageEdit : messageArray[currentInput]?.insert}
            onChange={onEditMessage}
            disabled={!edit}
          />
        )}
        {currentInput + 1}/ {messageArray.length + 1}
        <div className="channel-talk--input--action">
          <button
            onClick={() => {
              if (currentInput > 0) {
                setCurrentInput(currentInput - 1);
                setEdit(false);
              }
            }}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (currentInput < messageArray.length) {
                setCurrentInput(currentInput + 1);
                setEdit(false);
              }
            }}
          >
            Next
          </button>
          <button
            onClick={() => {
              if (
                messageArray[currentInput]?.insert[
                  messageArray[currentInput]?.insert.length - 1
                ] === "\n"
              ) {
                setMessageEdit(
                  messageArray[currentInput]?.insert.substr(
                    0,
                    messageArray[currentInput]?.insert.length - 1
                  )
                );
              } else {
                setMessageEdit(messageArray[currentInput]?.insert);
              }

              setEdit(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="channel-talk--show">
        {messageArray.map((mess, index) => (
          <p key={index}>
            {mess.insert} -{mess.insert.length} - page: {index + 1}
            <br></br>
            <strong>=================================================</strong>
          </p>
        ))}
      </div>
      {/* <div className="channel-talk--input--action">
        <button>Back</button>
        <button>Next</button>
      </div> */}
    </div>
  );
}
