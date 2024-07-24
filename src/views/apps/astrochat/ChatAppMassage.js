import React from "react";
import ReactHtmlParser from "react-html-parser";

import "../../../assets/scss/pages/astrochat.scss";

class ChatAppMassage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <>
        {this.props.roomChatData?.length
          ? this.props.roomChatData
              .map((chat, index) => {
                return (
                  <>
                    {chat.type === "astrologer" ? (
                      <div class="message me">
                        <div class="message-body">{chat?.msg}</div>
                      </div>
                    ) : (
                      <div className="message">
                        <div class="message-body">
                          {ReactHtmlParser(chat?.msg)}{" "}
                          {chat.img && (
                            <img
                              src={chat.img}
                              alt="chat-image"
                              style={{ maxWidth: "100%", height: "auto" }} // Adjust as needed
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </>
                );
              })
              .reverse()
          : null}
      </>
    );
  }
}

export default ChatAppMassage;
