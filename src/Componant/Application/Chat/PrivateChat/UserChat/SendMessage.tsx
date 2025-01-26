import { Form, Input } from "reactstrap";
import { Btn } from "../../../../../AbstractElements";
import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { TypeMessageHere } from "../../../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import ChatDropMenu from "./ChatDropMenu";
import {
  replyByUserAsync,
  sendMessageAsync,
} from "../../../../../Store/Slices/ChatSlice";

const SendMessage = () => {
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { chats, selectedUser, currentUser } = useSelector(
    (state: any) => state.chat
  );

  const dispatch = useDispatch();
  const addEmoji = (emoji: string) => {
    const text = `${messageInput}${emoji}`;
    setShowEmojiPicker(false);
    setMessageInput(text);
  };
  const handleMessageChange = (message: string) => {
    setMessageInput(message);
  };

  const handleMessagePress = () => {
    var container = document.getElementsByClassName("messenger-chat")[0];
    setTimeout(function () {
      container?.scrollBy({ top: 200, behavior: "smooth" });
    }, 310);
    let currentUserId = currentUser?.id;
    let selectedUserId = selectedUser?.id;
    let selectedUserName = selectedUser?.name;
    if (messageInput.length > 0) {
      dispatch(
        sendMessageAsync({ currentUserId, selectedUserId, messageInput, chats })
      );
      setMessageInput("");
      setTimeout(() => {
        const replyMessage =
          "Hey This is " +
          selectedUserName +
          ", Sorry I'm busy right now, I will text you later";
        dispatch(
          replyByUserAsync({
            currentUserId,
            selectedUserId,
            replyMessage,
            chats,
          })
        );
      }, 2000);
    }
  };
  return (
    <Form className="messenger-inputarea">
      <ChatDropMenu />
      <Input
        className="messenger-input two uk-textarea"
        type="text"
        placeholder={TypeMessageHere}
        value={messageInput}
        onChange={(e) => handleMessageChange(e.target.value)}
      />
      <div>
        {showEmojiPicker ? (
          <Picker
            data={data}
            onEmojiSelect={(e: { native: string }) => {
              addEmoji(e.native);
            }}
          />
        ) : null}
      </div>
      <div className="smiley-box">
        <div
          className="picker second-btn uk-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
      </div>
      <Btn
        color="primary"
        className="messenger-send-btn"
        onClick={handleMessagePress}
      >
        <i className="fa fa-location-arrow" />
      </Btn>
    </Form>
  );
};

export default SendMessage;
