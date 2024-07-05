import React from "react";
import "../../../assets/scss/pages/astrochat.scss";

class ChatAppList extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      Index: "",
      connecting_usrid: "",
      userChatList: this.props?.userChatList,
      selectedUser:this.props?.selectedUser,
      roomid: "",
    };
  }
  componentDidMount() {
    let currentuserid = localStorage.getItem("CurrentChat_userid");
    this.setState({ connecting_usrid: currentuserid });
  }
  
  render() {
    const { userChatList, newMessage,selectedUser } = this.props;
    return (
      <ul
        className="listofchat pl-0"
        style={{ listStyle: "none", marginLeft: "none", cursor: "pointer" }}
      >
        {userChatList && userChatList?.length
          ? userChatList?.map((user, i) => {
            if (selectedUser.userid._id===user.userid._id) {
                return (
                  <li
                    key={i}
                    className="newmainheaading"
                    style={{
                      backgroundColor: `${
                        this.state.connecting_usrid === user?.userid?._id
                          ? "#ef9014"
                          : "white"
                      }`,
                    }}
                    onClick={() => {
                      this.props.getChatRoomId(user, i);
                      this.setState({ Index: i });
                    }}
                  >
                    <div
                      className="userprofile my-auto"
                      onClick={() => this.props.getChatRoomId(user, i)}
                    >
                      <img
                        src={user?.userid?.userimg[0]}
                        className="app-img"
                        alt=""
                      />
                    </div>
                    <div className="userName mt-1" style={{ width: "55%" }}>
                      <h5>{user?.userid?.fullname}</h5>
                      <p>{user.msg.slice(0, 15)}...</p>
                    </div>
                    {this.props.newMessage > 0 ? (
                      <div
                        className="userName mt-2"
                        style={{
                          width: "45%",
                          marginRight: "3px",
                          fontWeight: "bold",
                        }}
                      >
                        <div className="">
                          <p className="text-center">
                            <span
                              className="rounded-circle bg-dark text-white"
                              style={{ padding: "1px 6px" }}
                            >
                              {this.props.newMessage}
                            </span>
                          </p>
                          <p className="text-right fw-bold">new message</p>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              } else {
                return null;
              }
            })
          : null}
      </ul>
    );
  }
}

export default ChatAppList;
