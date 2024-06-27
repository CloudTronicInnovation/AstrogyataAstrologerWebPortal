import React from 'react'
import { Card, FormGroup, Input, Badge } from 'reactstrap'
import { X, Search } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { connect } from 'react-redux'
import {
  getChats,
  getContactChats,
  searchContacts,
  markSeenAllMessages,
} from '../../../redux/actions/chat/index'
import userImg from '../../../assets/img/portrait/small/avatar-s-11.jpg'
import axiosConfig from "../../../axiosConfig"
import ChatLog from "./ChatLog";
class ChatSidebar extends React.Component {
  // static getDerivedStateFromProps(props, state) {
  //   if (
  //     props.chat.chatContacts.length !== state.chatContacts ||
  //     props.chat.chats.length !== state.chats ||
  //     props.chat.status !== state.status
  //   ) {
  //     return {
  //       chatsContacts: props.chat.chatContacts,
  //       chats: props.chat.chats,
  //       status: props.chat.status,
  //     }
  //   }
  //   // Return null if the state hasn't changed
  //   return null
  // }

  state = {
    roomChatData: [],
    chatsContacts: [],
    chatsArr: [],
    status: null,
    value: '',
    astro: [],
  }

  getChatContents = () => {
    this.props.getChats()
    this.props.getContactChats()
  }
  getChatRoomId = async (astro) => {
    this.setState({ userId: astro?.astroid?._id, roomId: astro?.roomid });
    await axiosConfig.get(`/user/allchatwithAstro/${astro?.roomid}`)
      .then((response) => {
        console.log("sdhfkhk", response?.data?.data);
        if (response.data.status === true) {
          this.setState({ roomChatData: response?.data.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {

    // let { id } = this.props.match.params;

    // let astroid = JSON.parse(l;ocalStorage.getItem("astroId"));
    let astroId = localStorage.getItem("astroId");
    // console.log(astroId);
    axiosConfig
      .get(`/user/astrogetRoomid/${astroId}`)
      // .get(`/user/astrogetRoomid/${id}`)
      .then((response) => {
        console.log("chatsContacts", response.data.data);
        this.setState({ chatsArr: response.data.data });
        if (response.data.status === true) {
          this.getChatContents()
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axiosConfig.get(`/admin/getoneAstro/${astroId}`)
      // .get(`/user/astrogetRoomid/${id}`)
      .then((response) => {
        console.log("astro", response.data.data);
        this.setState({
          img: response.data.data.img[0],
          fullname: response.data.data.fullname,
          astro: response.data.data,
          // msg: response.data.data.msg,
          // type: response.data.data.type,

        });

        // if (response.data.status === true) {
        //   this.getChatContents()
        // }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  // chatsContacts: this.props.chat.chatContacts,
  // chats: this.props.chat.chats,
  // status: this.props.chat.status,
  // chatsContacts: response.data?.data.chatsContacts,
  // roomid: response.data.data?.roomid,
  // msg: response.data.data?.msg,
  // type: response.data.data?.type,
  // async componentDidMount() {

  //   await
  //     this.getChatContents()
  //   this.setState({
  //     chatsContacts: this.props.chat.chatContacts,

  //     chats: this.props.chat.chats,
  //     status: this.props.chat.status,
  //   })

  // }


  handleOnChange = (e) => {
    this.setState({ value: e.target.value })
    this.props.searchContacts(e.target.value)
  }

  render() {
    console.log(this.state.chatsArr)
    const { chatsContacts, ChatLog, status, value } = this.state

    const chatsArr = value.length
      ? this.props.chat.filteredChats
      : chatsContacts

    let renderChats =
      this.state.chatsArr.map((chat) => {
        return (
          <li
            key={chat._id}
            onClick={() => {
              // this.props.handleActiveChat(chat._id)
              // this.props.mainSidebar(false)
              // this.props.markSeenAllMessages(chat._id)

              this.props.handleActiveChat(chat._id, ChatLog._id)
              this.props.mainSidebar(false)
              this.props.markSeenAllMessages(chat._id, ChatLog._id)
            }}
            className={`${this.props.activeChatID === chat._id ? 'active' : ''
              }`}
          >
            <div className="pr-1">
              <span className="avatar avatar-md m-0">
                <img
                  src={chat.userid?.userimg[0]}
                  alt={chat.displayname}
                  height="38"
                  width="38"
                />
              </span>
            </div>
            <div className="user-chat-info">
              <div className="contact-info">
                {/* <ChatLog getChatRoomId={(id) => this.getChatRoomId(id)} /> */}
                <h5 className="text-bold-600 mb-0">{chat.userid?.fullname}</h5>
                <p className="truncate">
                  {chat.msg}
                </p>
              </div>
              {/* <div className="contact-meta d-flex- flex-column">
                  <span className="float-right mb-25">
                    {lastMsgMonth + ' ' + lastMsgDay}
                  </span>
                  {pendingMsg > 0 ? (
                    <div className="unseen-msg">
                      <Badge
                        className="badge-md float-right"
                        color="primary"
                        pill
                      >
                        {pendingMsg}
                      </Badge>
                    </div>
                  ) : null}
                </div> */}
            </div>
          </li>
        )
      })

    return (
      <Card className="sidebar-content h-100">
        <span
          className="sidebar-close-icon"
          onClick={() => this.props.mainSidebar(false)}
        >
          <X size={15} />
        </span>
        <div className="chat-fixed-search">
          <div className="d-flex align-items-center">
            <div className="sidebar-profile-toggle position-relative d-inline-flex">
              <div
                className="avatar"
              // onClick={() => this.props.handleUserSidebar('open')}
              >
                <img src={this.state?.img} alt="User Profile" height="40" width="40" />
                {/* <span
                  className={
                    status === 'dnd'
                      ? 'avatar-status-busy'
                      : status === 'away'
                        ? 'avatar-status-away'
                        : status === 'offline'
                          ? 'avatar-status-offline'
                          : 'avatar-status-online'
                  }
                /> */}

              </div>

            </div>
            <span> <h5 className="text-bold-600 mb-0">{this.state?.fullname}</h5></span>
            {/* <FormGroup className="position-relative has-icon-left mx-1 my-0 w-100">
              <Input
                className="round"
                type="text"
                placeholder="Search contact or start a new chat"
                onChange={(e) => this.handleOnChange(e)}
                value={value}
              />
              <div className="form-control-position">
                <Search size={15} />
              </div>
            </FormGroup> */}
          </div>
        </div>
        <PerfectScrollbar
          className="chat-user-list list-group"
          options={{
            wheelPropagation: false,
          }}
        >
          <h3 className="primary p-1 mb-0">Chats</h3>
          <ul className="chat-users-list-wrapper media-list">{renderChats}</ul>

        </PerfectScrollbar>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chat: state.chatApp.chats,
  }
}
export default connect(mapStateToProps, {
  getChats,
  getContactChats,
  searchContacts,
  markSeenAllMessages,
})(ChatSidebar)
