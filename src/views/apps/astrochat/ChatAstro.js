import React, { PureComponent } from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  CustomInput,
  Container,
} from "reactstrap";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import "../../../assets/scss/pages/astrochat.scss";
import Buyimg from "../../../assets/img/boy-img.png";
import ChatAppList from "./ChatAppList";
import ChatAppMassage from "./ChatAppMassage";
import axiosConfig from "../../../axiosConfig";
import Swal from "sweetalert2";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { chatAcceptStatus } from "../../../redux/actions/chat";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class ChatApp extends PureComponent {
  constructor(props) {
    super(props);
    const savedTime = parseInt(localStorage.getItem("timer"), 10) || 0;
    this.countRef = React.createRef();

    this.state = {
      selectedUser: null,
      newMsgNotification: 0,
      selectedUserIndex: 0,
      setUserInfoFlag: null,
      setTimer: 0,
      timerStartFlag: false,
      callCharge: null,
      old_msg_id: null,
      chatinterval: null,
      userKudaliData: null,
      tooglebtn: false,
      userChatList: [],
      userId: "",
      astroId: "",
      userData: null,
      msg: "",
      roomId: "",
      roomChatData: [],
      time: {},
      seconds: 60 * 15,
      reciver: "",
      minutes: 15,
      ModdleToggle: false,
      indexValue: 0,
      checkroomflag: true,
      timer: savedTime,
      modal: false,

      birthTime: '',
      hours: '',
      minutes: '',
      dateofbirth: "",
      gender: "",
      name: "",
      kundliData: null,
      birthPlace: "",
      selectedCountry: {
        name: "India",
        isoCode: "IN",
        flag: "🇮🇳",
        phonecode: "91",
        currency: "INR",
        latitude: "20.00000000",
        longitude: "77.00000000",
        timezones: [
          {
            zoneName: "Asia/Kolkata",
            gmtOffset: 19800,
            gmtOffsetName: "UTC+05:30",
            abbreviation: "IST",
            tzName: "Indian Standard Time",
          },
        ],
      },
      selectedState: null,
      selectedCity: null,
    };
    this.intervalId = null;
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleKundaly = () => {
    const UserIntakeid = localStorage.getItem("UserIntakeid");

    if (UserIntakeid) {
      this.props.history.push({
        pathname: "/app/report/kundalireport",
        state: { user: this.state.userData, indexValue: this.state.indexValue },
      });
      localStorage.removeItem("kundliData") // if chat with intakeform then it will happens
    } else {
      this.toggleModal();
      localStorage.removeItem("userKundaliInfo") // if chat without intakeform then it will happens
    }
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  dateChangeHandler = (event) => {
    const timeValue = event.target.value; // "HH:MM" format
    this.setState({ birthTime: timeValue });

    if (timeValue) {
      const [hrs, mins] = timeValue.split(':');
      this.setState({ hours: hrs, minutes: mins });
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, gender, dateofbirth, hours, minutes } = this.state;
    const birthplace = {
      city: this.state.selectedCity,
      state: this.state.selectedState,
      country: this.state.selectedCountry,
    };
    const kundliData = {
      name: name?.toUpperCase(),
      gender,
      dateofbirth,
      hours,
      minutes,
      birthplace,
    };
    const isEmpty = Object.values(kundliData).some((value) => value === "" || value === null || value === undefined);
    if (!isEmpty) {
      localStorage.setItem("kundliData", JSON.stringify(kundliData));
      this.setState({ kundliData });
      this.props.history.push({
        pathname: "/app/report/kundliwithoutintake",
      });
    } else {
      console.log("Please fill in all required fields.");
    }
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChange1 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleaddBal = async () => {
    let payload = {
      userId: this.state.userId,
      astroId: this.state.astroId,
      type: "Chat",
    };

    await axiosConfig
      .post(`/user/deductChatBalance`, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  handleCloseChat = (e) => {
    e.preventDefault();
    window.location.replace("/");
    let astroid = localStorage.getItem("astroId");
    let userid = localStorage.getItem("CurrentChat_userid");
    let value = {
      userId: userid,
      astroId: astroid,
    };
    axiosConfig
      .post(`/user/changeStatus`, value)
      .then((res) => {
        console.log(res);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    const fullName =
      this.state.userChatList[this.state.indexValue]?.userid?.fullname;
    const { h, m, s } = this.secondsToTime(this.state.setTimer);

    Swal.fire({
      title: "Chat Details",
      html: ` <br>
          User Name: ${fullName}<br>
          Chat Duration:${h}:h ${m} :m ${s}s <br>
          Chat Earning:  Rs. ${
            this.state.callCharge * Math.ceil(this.state.setTimer / 60)
          }`,
      timer: 10000,
    });
    this.handlePause();
    this.setState({ ModdleToggle: false });
  };
  componentDidMount() {
    this.props.chatAcceptStatus("accepted");
    // this.props.chatAcceptStatus("sajids data");
    // this.startTimer();
    // if (this.props?.location?.state?.toggleMogel) {
    //   this.getChatRoomId(this.props?.location?.state, 0);
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props?.chat?.chatStatus == "accepted") {
      let astroId = localStorage.getItem("astroId");
      let userId = localStorage.getItem("CurrentChat_userid");
      if (this.props?.location?.state) {
        const userData = this.props?.location?.state;
        this.getChatRoomId(userData, userData.indexValue);
      }

      if (JSON.parse(localStorage.getItem("minute"))) {
        let minute = JSON.parse(localStorage.getItem("minute"));
        this.setState({ minutes: minute, seconds: minute * 60 });
      }

      setTimeout(() => {
        axiosConfig
          .get(`/user/astrogetRoomid/${astroId}`)
          .then((response) => {
            if (response.data.status === true) {
              let userdata = response.data.data.find((item, ind) => {
                if (item?.userid?._id === userId) {
                  this.setState({ selectedUserIndex: ind });
                  return item;
                }
              });
              this.setState({
                userChatList: response?.data?.data,
                selectedUser: userdata,
                roomId: response?.data?.data?.roomid,
              });
            }
            this.checkMessage();
          })
          .catch((error) => {
            console.log(error);
          });
        this.getCallCharge();

        //count down for 30min
        this.setState({ minutes: 30, seconds: 30 * 60 });
        // this.startTimer();
        this.secondsToTime(30 * 60);
        this.props.chatAcceptStatus("completed");
      }, 2000);
    }

    // if (JSON.parse(sessionStorage.getItem("accepteduserinfo"))) {
    //   const data = JSON.parse(sessionStorage.getItem("accepteduserinfo"));
    //   // this.getChatRoomId(data, 0);
    //   sessionStorage.removeItem("accepteduserinfo");
    // }

    // if (this.state.setUserInfoFlag || prevState.setUserInfoFlag) {
    //   let data = this.state?.roomChatData;
    //   const result = data.findLast((element) =>
    //     element.msg.includes("FirstName")
    //   );
    //   sessionStorage.setItem(
    //     "userKundaliInfo",
    //     JSON.stringify(this.extractInfo(result.msg))
    //   );
    //   this.setState({ setUserInfoFlag: false });
    // }

    if (!this.state.timerStartFlag) {
      let astroId = localStorage.getItem("astroId");
      let userId = localStorage.getItem("CurrentChat_userid");
      // console.log("in start timmer...");
      let value = {
        astroId: astroId,
        userId: userId,
      };
      axiosConfig
        .post(`/user/checkroom`, value)
        .then((response) => {
          if (response.data.roomstatus === 1) {
            console.log("interval starting");
            setTimeout(() => {
              this.handleStart();
            }, 1000);
            clearInterval(sessionStorage.getItem("startchatinterId"));
            const startchatinterId = setInterval(() => {
              this.handleStart();
            }, 50000);
            sessionStorage.setItem("startchatinterId", startchatinterId);
            this.setState({ timerStartFlag: true });
            clearInterval(sessionStorage.getItem("intervalforroom"));
            const id = setInterval(() => {
              axiosConfig
                .post(`/user/checkroom`, value)
                .then((response) => {
                  if (response.data.roomstatus === 0) {
                    const fullName =
                      this.state.userChatList[this.state.indexValue]?.userid
                        ?.fullname;
                    const { h, m, s } = this.secondsToTime(this.state.setTimer);

                    Swal.fire({
                      title: "User Left",
                      html: ` <br>User Name: ${fullName}<br>Chat Duration:${h}:h ${m} :m ${s}s <br>Chat Earning:  Rs. ${
                        this.state.callCharge *
                        Math.ceil(this.state.setTimer / 60)
                      }`,
                      width: "300px",
                      timer: 2000,
                    });
                    setTimeout(() => {
                      window.location.href = "/";
                    }, 2000);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  window.location.href = "/";
                  clearInterval(id);
                });
            }, 3000);
            sessionStorage.setItem("intervalforroom", id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  componentWillUnmount() {
    this.startTimer();
    clearInterval(this.state.chatinterval);
    this.setState({ timerStartFlag: false, setUserInfoFlag: false });
    clearInterval(sessionStorage.getItem("intervalforroom"));
  }
  checkMessage() {
    let astroId = localStorage.getItem("astroId");
    clearInterval(this.state.chatinterval);
    const id = setInterval(() => {
      axiosConfig
        .get(`/user/astrogetRoomid/${astroId}`)
        .then((response) => {
          if (response.data.status) {
            const newmessage = response.data.data[this.state.selectedUserIndex];
            let existingmsg = this.state.roomChatData?.findLast(
              (element) => element._id === newmessage._id
            );
            if (!existingmsg) {
              if (!this.state.ModdleToggle) {
                if (this.state.roomChatData.length)
                  this.setState((prevState) => ({
                    newMsgNotification: prevState.newMsgNotification + 1,
                  }));
              }
              // this.setState({ newMsgNotile) {
              //   this.setState((prevStatefication: [...this.state.newMsgNotification, newmessage] });
              this.setState((prevState) => ({
                roomChatData: [...prevState.roomChatData, newmessage],
              }));
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
    this.setState({ chatinterval: id });
  }

  // async checkNewMessage() {
  //   await axiosConfig
  //     .get(`/user/allchatwithAstro/${this.state.astroId}`)
  //     .then((response1) => {
  //       if (response1.data.status === true) {
  //         let filteredArray = response1?.data?.data.filter(function (item) {
  //           return (
  //             userIds.indexOf(item?.userid?._id || item?.reciver?._id) > -1
  //           );
  //         });
  //         this.setState({ roomChatData: filteredArray });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  startTimer() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        const newTime = prevState.timer + 1;
        localStorage.setItem("timer", newTime);
        return { timer: newTime };
      });
    }, 1000);
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  stopTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };
  countDown() {
    let seconds =
      this.state.seconds !== 0 ? this.state.seconds - 1 : alert("out time");

    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  getChatdata = () => {
    clearInterval(sessionStorage.getItem("getchatint_id"));
    const id = setInterval(() => {
      this.getChatRoomIdnew(this.state.userData, this.state.indexValue);
    }, 5000);
    sessionStorage.setItem("getchatint_id", id);
  };

  getChatRoomIdnew = (user, i) => {
    this.setState({ userData: user });
    let userIds = [user?.userid?._id];
    this.setState({
      userId: user?.userid?._id,
      roomId: user?.roomid,
      indexValue: i,
      astroId: user?.astroid?._id,
    });
    axiosConfig
      .get(`/user/allchatwithAstro/${user?.astroid?._id}`)
      .then((response) => {
        if (response.data.status === true) {
          let filteredArray = response?.data?.data.filter(function (item) {
            return (
              userIds.indexOf(item?.userid?._id || item?.reciver?._id) > -1
            );
          });

          this.setState({ roomChatData: filteredArray });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getChatRoomId = async (user, i) => {
    this.setState({ userData: user });
    this.setState({ ModdleToggle: true });
    let userIds = [user?.userid?._id];
    this.setState({
      userId: user?.userid?._id,
      roomId: user?.roomid,
      indexValue: i,
      astroId: user?.astroid?._id,
    });
    await axiosConfig
      .get(`/user/allchatwithAstro/${user?.astroid?._id}`)
      .then((response) => {
        if (response.data.status === true) {
          let filteredArray = response?.data?.data.filter(function (item) {
            return (
              userIds.indexOf(item?.userid?._id || item?.reciver?._id) > -1
            );
          });
          this.setState({ roomChatData: filteredArray });
          if (!this.state.setUserInfoFlag)
            this.setState({ setUserInfoFlag: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // if(this.state.ModdleToggle){
    this.setState({
      newMsgNotification: 0,
    });
    // }
  };

  submitHandler = async (e) => {
    e.preventDefault();
    if (this.state.msg.trim() === "") {
      Swal.fire({
        title: "Message cannot be send empty",
        width: "300px",
        timer: 1500,
      });
      return; // Exit the function to prevent further execution
    }
    // debugger;
    let { userId, astroId } = this.state;
    if (this.state.msg !== "" || this.state.msg.length === 0) {
      let obj = {
        reciver: this.state.userId,
        msg: this.state.msg,
      };
      let userIds = [this.state.userId];
      await axiosConfig
        .post(`/user/add_chatroom/${this.state.astroId}`, obj)
        .then(async (response) => {
          if (response.data.status === true) {
            this.setState({ msg: "" });
            await axiosConfig
              .get(`/user/allchatwithAstro/${this.state.astroId}`)
              .then((response1) => {
                if (response1.data.status === true) {
                  let filteredArray = response1?.data?.data.filter(function (
                    item
                  ) {
                    return (
                      userIds.indexOf(item?.userid?._id || item?.reciver?._id) >
                      -1
                    );
                  });
                  this.setState({ roomChatData: filteredArray });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })

        .catch((error) => {
          console.log(error);
        });

      // if (!this.state.timerStartFlag) {
      //   this.handleStart();
      //   setInterval(() => {
      //     this.handleStart();
      //   }, 20000);
      //   this.setState({ timerStartFlag: true });
      // }
    } else {
      this.setState({ tooglebtn: true });
    }

    // if (this.state.checkroomflag) {
    //   let value = {
    //     astroId: astroId,
    //     userId: userId,
    //   };
    //   console.log(value);
    //   const id = setInterval(() => {
    //     axiosConfig
    //       .post(`/user/checkroom`, value)
    //       .then((response) => {
    //         if (response.data.roomstatus === 0) {
    //           Swal.fire({
    //             title: "User Left",
    //             width: "300px",
    //             timer: 2000,
    //           });
    //           setTimeout(() => {
    //             window.location.href = "/";
    //           }, 1000);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         window.location.href = "/";
    //         clearInterval(id);
    //       });
    //   }, 3000);

    //   sessionStorage.setItem("intervalforroom", id);
    //   this.serState({ checkroomflag: false });
    // }
  };

  handleChange = (e) => {
    this.setState({ msg: e.target.value });
    this.setState({ tooglebtn: e.target.value.trim() !== "" });
  };

  toggleShowOldChats = () => {
    // Toggle the state variable showOldChats
    this.setState((prevState) => ({
      showOldChats: !prevState.showOldChats,
    }));
  };

  handleToggleModal = () => {
    // const fullName =
    //   this.state.userChatList[this.state.indexValue]?.userid?.fullname;
    // Show SweetAlert popup
    // Swal.fire({
    //   title: "Chat Details",
    //   html: ` <br>
    //     User Name: ${fullName}<br>
    //     Chat Duration: ${this.state.time} minutes`,
    //   timer: 3000,
    // });
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     // If user confirms, toggle the modal state
    //     this.setState({ ModdleToggle: !this.state.ModdleToggle });
    //   }
    // });
  };

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  handleStart = () => {
    let userId = localStorage.getItem("CurrentChat_userid");
    let astroId = localStorage.getItem("astroId");
    //  sessionStorage.setItem("typeofcall", "Video");
    let payload = {
      userId: userId,
      astroId: astroId,
      type: "chat",
    };
    axiosConfig
      .post("/user/timer", payload)
      .then((res) => {
        console.log(res);
        const value = res.data;
        this.setState({ setTimer: value.timer.currentValue });
        clearInterval(this.countRef.current);
        this.countRef.current = setInterval(() => {
          this.setState({ setTimer: this.state.setTimer + 1 });
        }, 1000);
      })
      .catch((err) => {});

    // this.setState({ counterState: false });
  };

  handlePause = () => {
    clearInterval(this.countRef.current);
    // clearInterval(this.apicall.current);
  };
  getCallCharge = () => {
    const astroId = localStorage.getItem("astroId");
    axiosConfig
      .get(`/admin/getoneAstro/${astroId}`)
      .then((response) => {
        // console.log(response.data.data);
        this.setState({
          callCharge: response.data.data.callCharge,
        });
      })
      .catch((error) => {
        // swal("Error!", "You clicked the button!", "error");
        console.log(error);
      });
  };

  render() {
    const { indexValue, showOldChats } = this.state;
    const modalBackgroundClass = this.state.isModalOpen
      ? "modal-background open"
      : "modal-background";
    return (
      <div>
        <section className="">
          <Container>
            <Row>
              {this.state.ModdleToggle === false ? (
                <>
                  <Col lg="4">
                    <div class="mymessagehead">
                      <div class="mymsgsubhead">
                        <h1 class="title mx-1 mb-2">
                          <FormattedMessage
                            id="My messages"
                            defaultMessage="My messages"
                          />
                        </h1>
                        {/* <ChatAppList
                          userChatList={
                            this.state.userChatList.length
                              ? this.state.userChatList
                              : []
                          }
                          getChatRoomId={(user, i) =>
                            this.getChatRoomId(user, i)
                          }
                        /> */}
                        <ChatAppList
                          userChatList={
                            this.state.userChatList.length
                              ? this.state.userChatList
                              : []
                          }
                          newMessage={this.state.newMsgNotification}
                          selectedUser={this.state.selectedUser}
                          getChatRoomId={(user, i) => {
                            this.getChatRoomId(user, i);
                            //change userdata to view their kundali
                            // this.setState({ userKudaliData: user.userid });
                          }}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col lg="8">
                    <div class="app rt-chat">
                      <div className="my-auto mx-auto">
                        <h1 className="text-center">
                          <FormattedMessage
                            id="Please select user to start chat"
                            defaultMessage="Please select user to start chat"
                          />
                        </h1>
                      </div>
                    </div>
                    {/* <div class="messages">
                      <div className="chat-header">
                        <div className="d-flex justify-content-between">
                          <div>
                            <span>
                              <img
                                src={
                                  this.state.roomChatData.length > 0
                                    ? this.state.userChatList[indexValue]
                                        ?.userid?.userimg[0]
                                    : Buyimg
                                }
                                className="app-img"
                                alt=""
                              />
                            </span>

                            <span>
                              {this.state.roomChatData.length > 0
                                ? this.state.userChatList[indexValue]?.userid
                                    ?.fullname
                                : null}
                            </span>

                            <div> */}
                    {/* Toggle button to control showing old chats */}
                    {/* <label>
                                Show old chats
                                <input
                                  type="checkbox"
                                  checked={showOldChats}
                                  onChange={this.toggleShowOldChats}
                                />
                              </label>
                            </div> */}
                    {/* Render old chats only if showOldChats is true */}
                    {/* {showOldChats && (
                              <ChatAppMassage
                                roomChatData={
                                  this.state.roomChatData.length > 0
                                    ? this.state.roomChatData
                                    : []
                                }
                              />
                            )} */}
                    {/* </div>

                        </div>
                      </div>
                      <div class="messages-history">
                        <ChatAppMassage
                          roomChatData={
                            this.state.roomChatData.length > 0
                              ? this.state.roomChatData
                              : []
                          }
                        />
                      </div>

                      <form class="messages-inputs">
                        <input
                          type="text"
                          placeholder="Send a message"
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                          value={this.state.msg}
                        />
                        <button
                          // onClick={(e) => swal("Select User to full screen")}
                          onClick={this.submitHandler}
                        > */}
                    {/* Send */}
                    {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </button>
                      </form>
                    </div> */}
                  </Col>
                </>
              ) : (
                <>
                  <Col lg={this.state.ModdleToggle === true ? "12" : "8"}>
                    <Row>
                      <Col>
                        <FaArrowAltCircleRight
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.setState({ ModdleToggle: false });
                            this.handleToggleModal();
                          }}
                          fill="#ffcc01"
                          size="40px"
                          className="mx-2 mb-2 faarrowalt"
                        />
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-end mt-1">
                          <Button
                            className="closebtnchat"
                            onClick={(e) => this.handleCloseChat(e)}
                            color="primary"
                          >
                            <FormattedMessage
                              id="Close Chat"
                              defaultMessage="Close Chat"
                            />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <div class="app rt-chat">
                      <div class="messages">
                        <div className="chat-header">
                          <div className="mainDiv d-flex justify-content-between">
                            <div>
                              <span>
                                <img
                                  src={
                                    this.state.roomChatData.length > 0
                                      ? this.state.userChatList[indexValue]
                                          ?.userid?.userimg[0]
                                      : Buyimg
                                  }
                                  className="app-img"
                                  alt=""
                                />
                              </span>
                              <span>
                                {this.state.roomChatData.length > 0
                                  ? this.state.userChatList[indexValue]?.userid
                                      ?.fullname
                                  : null}
                              </span>
                            </div>

                            <div className="text-dark fw-bold">
                              <p>{this.formatTime(this.state.setTimer)}</p>
                              {/* <h1>Timer: {this.state.timer} seconds</h1> */}
                            </div>

                            <div>
                              <Button
                                className="mb-1 viewkundaly"
                                onClick={(e) => this.handleKundaly(e)}
                                color="success"
                                size="sm"
                              >
                                <FormattedMessage
                                  id="View Kundaly"
                                  defaultMessage="View Kundaly"
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div class="messages-history">
                          <ChatAppMassage
                            roomChatData={
                              this.state.roomChatData.length > 0
                                ? this.state.roomChatData
                                : []
                            }
                          />
                        </div>
                        <form class="messages-inputs">
                          <input
                            type="text"
                            placeholder="Send a message"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                            value={this.state.msg}
                            defaultValue=""
                          />
                          <button
                            onClick={(e) =>
                              this.submitHandler(
                                e,
                                this.state.astroId,
                                this.state.userId
                              )
                            }
                            // disabled=true
                            disabled={!this.state.tooglebtn}
                          >
                            {/* <i class="material-icons">Send</i> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                          </button>
                        </form>
                      </div>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </Container>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <Form>
              <ModalHeader toggle={this.toggleModal}>
                {" "}
                <FormattedMessage
                  id="Kundali Form"
                  defaultMessage="Kundali Form"
                />
              </ModalHeader>
              <ModalBody>
                <Label>
                  <FormattedMessage id="Name" defaultMessage="Name" />*
                </Label>
                <Input
                  type="text"
                  name="name"
                  onChange={this.changeHandler}
                  placeholder="Name"
                />
                {/* <Label>
                  <FormattedMessage
                    id="Place of Birth"
                    defaultMessage="Place of Birth"
                  />
                  *
                </Label>
                <Input type="text" placeholder="Place of Birth" /> */}
                <Label>
                  <FormattedMessage
                    id="Birth Date"
                    defaultMessage="Birth Date"
                  />
                  *
                </Label>
                <Input
                  type="date"
                  name="dateofbirth"
                  onChange={this.changeHandler}
                />
                <Label>
                  <FormattedMessage
                    id="Birth Time"
                    defaultMessage="Birth Time"
                  />
                  *
                </Label>
                <Input
                  type="time"
                  name="BirthTime"
                  onChange={this.dateChangeHandler}
                  placeholder="Birth Time"
                />
                <Label>
                  <FormattedMessage
                    id="Select Gender"
                    defaultMessage="Select Gender"
                  />
                </Label>
                <CustomInput
                  required
                  type="select"
                  name="gender"
                  // value={category}
                  onChange={this.changeHandler}
                >
                  <option>....Select Gender.....</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </CustomInput>

                <Label>Country</Label>
                <Select
                  options={Country.getAllCountries()}
                  getOptionLabel={(options) => options["name"]}
                  getOptionValue={(options) => options["name"]}
                  value={this.state.selectedCountry}
                  onChange={(item) => {
                    this.setState({ selectedCountry: item });
                  }}
                />

                <Label>State</Label>
                <Select
                  options={State.getStatesOfCountry(
                    this.state.selectedCountry?.isoCode
                  )}
                  getOptionLabel={(options) => options["name"]}
                  getOptionValue={(options) => options["name"]}
                  value={this.state.selectedState}
                  onChange={(item) => {
                    this.setState({ selectedState: item });
                  }}
                />

                <Label>City</Label>
                <Select
                  options={City.getCitiesOfState(
                    this.state.selectedState?.countryCode,
                    this.state.selectedState?.isoCode
                  )}
                  getOptionLabel={(options) => options["name"]}
                  getOptionValue={(options) => options["name"]}
                  value={this.state.selectedCity}
                  onChange={(item) => {
                    this.setState({ selectedCity: item });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleFormSubmit}>
                  <FormattedMessage id="Submit" defaultMessage="Submit" />
                </Button>
                <Button color="secondary" onClick={this.toggleModal}>
                  <FormattedMessage id="Cancel" defaultMessage="Cancel" />
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chat: state.chatApp.chats,
  };
};
export default connect(mapStateToProps, {
  chatAcceptStatus,
})(ChatApp);
