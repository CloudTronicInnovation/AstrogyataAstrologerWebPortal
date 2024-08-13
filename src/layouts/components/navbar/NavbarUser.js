/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { MdCall } from "react-icons/md";
import { IoChatbox, IoLanguageSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/scss/pages/users.scss";
import notificationSound from "../../../assets/sound/Notification.mp3";
import {
  UncontrolledDropdown,
  Dropdown,
  Badge,
  Media,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

import * as Icon from "react-feather";
import { Route } from "react-router-dom";
import axiosConfig from "../../../axiosConfig";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bell } from "react-feather";
import "moment-timezone";
import moment from "moment";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { chatAcceptStatus } from "../../../redux/actions/chat";
import { FormattedMessage } from "react-intl";

const handleNavigation = (e, path) => {
  e.preventDefault();
  window.location.replace(path);
};

const NavbarUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilepic, setProfilepic] = useState([]);
  const [astronotification, setAstronotification] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [viewnotify, setViewnotify] = useState("");
  const [prevNotiCount, setPrevNotiCount] = useState(0);
  const [notiCount, setNotiCount] = useState(0);
  const [VideoCount, setVideoCount] = useState("");
  const [videonotify, setVideonotify] = useState([]);
  const [ButtonText, setButtonText] = useState("Online");
  const history = useHistory();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const dispatch = useDispatch();

  const handleofflineAstro = (e, path) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("ad-token"))}`,
      },
    };
    axiosConfig
      .get(`/user/logout`, config)
      .then((res) => {
        // console.log(res);
        window.localStorage.clear();
        swal("Logout Successfully");
        const cacheBusterPath = `${path}?cacheBuster=${new Date().getTime()}`;
        window.location.replace(cacheBusterPath);
      })
      .catch((err) => {
        console.error("Logout error:", err);
        swal("Logout API not working");
      });
  };

  const getAllnotification = async () => {
    const astroId = localStorage.getItem("astroId");
    const sound = new Audio(notificationSound);
    let playCount = 0;

    try {
      const res = await axiosConfig.get(`/user/wait_queue_list/${astroId}`);
      setAstronotification(res.data.data);
      setViewnotify(res.data.count);

      const lastNotiCount =
        parseInt(localStorage.getItem("lastNotiCount"), 10) || 0;
      if (res.data.count > lastNotiCount) {
        sound.addEventListener('ended', () => {
        playCount++;
        if (playCount < 3) {
          // Play 2 times
          sound.play();
          console.log("sound playing", playCount);
        }
      });
      sound.play();
      }

      localStorage.setItem("lastNotiCount", res.data.count);
      setNotiCount(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  // const getAllnotification = async () => {
  //   const astroId = localStorage.getItem("astroId");
  //   const sound = new Audio(notificationSound);

  //   await axiosConfig
  //     .get(`/user/wait_queue_list/${astroId}`)
  //     .then((res) => {
  //       // console.log(res);
  //       setAstronotification(res.data.data);
  //       setViewnotify(res.data.count);

  //       if(notiCount != res.data.count){
  //         sound.play();
  //         setNotiCount(res.data.count);
  //       }
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const newgetAllnotification = async () => {
    const astroId = localStorage.getItem("astroId");
    await axiosConfig
      .get(`/user/VdolinkList/${astroId}`)
      .then((res) => {
        setVideonotify(res.data.data);
        setVideoCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  useEffect(() => {
    setInterval(() => {
      newgetAllnotification();
      getAllnotification();
    }, 4000);
  }, [VideoCount]);
  useEffect(() => {
    async function getOneUser() {
      try {
        const astroId = localStorage.getItem("astroId");
        const response = await axiosConfig.get(`/admin/getoneAstro/${astroId}`);
        setProfilepic(response.data.data);
      } catch (error) {
        console.log("SomeThing Wrong");
      }
    }
    getOneUser();
  }, []);

  const handleshowofflineAstro = (e) => {
    e.preventDefault();
    let astroid = localStorage.getItem("astroId");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    // title and button text based on the current status
    const title =
      ButtonText === "Online"
        ? "Are You Sure To Go Offline?"
        : "Are You Sure To Go Online?";
    const confirmButtonText = ButtonText === "Online" ? "Offline" : "Online";

    swalWithBootstrapButtons
      .fire({
        title: title,
        // icon: "info",
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: "Cancel",
        // reverseButtons: true,
        width: "300px",
        didOpen: () => {
          // Access the SweetAlert2 elements and apply inline styles
          const swalTitle = document.querySelector(".swal2-title");
          const swalContent = document.querySelector(".swal2-html-container");
          const swalConfirmButton = document.querySelector(".swal2-confirm");
          const swalCancelButton = document.querySelector(".swal2-cancel");

          if (swalTitle) {
            swalTitle.style.fontSize = "20px";
          }
          if (swalContent) {
            swalContent.style.fontSize = "16px";
          }
          if (swalConfirmButton) {
            swalConfirmButton.style.fontSize = "14px";
            swalConfirmButton.style.padding = "10px 10px";
            swalCancelButton.style.margin = "30px";
            swalConfirmButton.style.minWidth = "auto";
          }
          if (swalCancelButton) {
            swalCancelButton.style.fontSize = "14px";
            swalCancelButton.style.padding = "10px 10px";
            swalCancelButton.style.margin = "20px";
            swalCancelButton.style.minWidth = "auto";
          }
        },
      })

      .then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with status change
          axiosConfig
            .post(`/user/status_change/${astroid}`, {
              status: ButtonText === "Online" ? "Offline" : "Online",
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.message === "success") {
                const newStatus =
                  ButtonText === "Online" ? "Offline" : "Online";
                setButtonText(newStatus);
                // Save in localStorage
                localStorage.setItem("status", newStatus);
                if (newStatus === "Online") {
                  Swal.fire({
                    icon: "success",
                    title: "Status is Online",
                    width: "300px",
                    timer: 1000,
                  });
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User denied or cancelled, do nothing
          // You may uncomment the following lines if you want to show a message when cancelled
          // swal("Cancelled", "Status not changed" )
          // Or if you want to show another alert when cancelled
          // swalWithBootstrapButtons.fire(
          //   "Proceed Cancel",
          //   "Cancelled",
          //   "error",
          // );
        }
      });
  };

  useEffect(() => {
    // For Calling status
    const savedStatus = localStorage.getItem("callingStatus");
    if (savedStatus) {
      setNewStatus(savedStatus);
      // For Chat Status
      const chatstatus = localStorage.getItem("status") || "Online";
      setButtonText(chatstatus);
    }
  }, []);

  const handleStatusChange = (status, onlineTime) => {
    console.log("Scheduled Online Time:", onlineTime);
    setNewStatus(status);
    let astroid = localStorage.getItem("astroId");
    axiosConfig
      .post(`/user/status_change/${astroid}`, {
        callingStatus: status,
        onlineTime: onlineTime,
      })
      .then((res) => {
        console.log("statusChange", res.data.data);
        localStorage.setItem("callingStatus", status);
        Swal.fire({
          title: "Status Changed",
          text: "Status changed successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "An error occurred while changing the status.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleshowChangeMode = () => {
    Swal.fire({
      title: "Calling Status",
      html: `
     
        <button id="Online" class="swal2-styled swal2-confirm">Online</button>
        <button id="Offline" class="swal2-styled swal2-confirm">Offline</button>
      `,
      showCancelButton: true,
      showConfirmButton: false,
      didOpen: () => {
        // document.getElementById('Wait').addEventListener('click', () => handleStatusChange('Wait'));
        document
          .getElementById("Online")
          .addEventListener("click", () => handleStatusChange("Online"));
        document
          .getElementById("Offline")
          .addEventListener("click", () => showOfflineScheduler());
      },
    });
  };

  //offline to online scheduler
  const showOfflineScheduler = () => {
    Swal.fire({
      title: "Schedule Online Time",
      html: `
        <label for="onlineTime">Select time to come online:</label>
        <input type="datetime-local" id="onlineTime" class="swal2-input">
      `,
      showCancelButton: true,
      confirmButtonText: "Schedule",
      preConfirm: () => {
        const onlineTime = document.getElementById("onlineTime").value;
        if (!onlineTime) {
          Swal.showValidationMessage("Please select a valid date and time");
        } else {
          return { onlineTime };
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusChange("Offline", result.value.onlineTime);
      }
    });
  };

  const handleStatus = (data) => {
    setDropdownOpen(false);
    localStorage.setItem("notification_Accepted_id", data?._id);
    localStorage.setItem("CurrentChat_userid", data?.userid?._id);
    let accept = {
      status: "Accept",
    };

    axiosConfig
      .post(`/user/acceptNotificationByAstro/${data?._id}`, accept)
      .then((res) => {
        // console.log(res.data);
        const userintakeid = res.data.data.userintakeid || "";
        localStorage.setItem("UserIntakeid", userintakeid);
        setAstronotification((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== data._id
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });

    if (data?.type === "Chat") {
      dispatch(chatAcceptStatus("accepted"));
      // setting userdata for kundali view
      axiosConfig
        .get(`/admin/intekListByUser/${data?.userid?._id}`)
        .then((res) => {
          // sessionStorage.setItem(
          //   "accepteduserinfo",
          //   JSON.stringify({ ...data, toggleMogel: true })
          // );
          const intakeinfo = res.data?.data.filter(
            (item) => item._id === data?.userintakeid
          );
          let kundaliinfo = intakeinfo[0];
          axiosConfig
            .post("/user/geo_detail", {
              place: intakeinfo[0].birthPlace,
            })
            .then((res) => {
              kundaliinfo = {
                ...kundaliinfo,
                userLatLong: res.data?.data?.geonames[0],
              };

              localStorage.setItem(
                "userKundaliInfo",
                JSON.stringify(kundaliinfo)
              );
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.log(err);
        });

      history.push({
        pathname: "/app/astrochat/chatastro",
      });
    }

    // if (data?.type === "Chat") {
    //   //setting userdata for kundali view
    //   axiosConfig
    //     .get(`/admin/intekListByUser/${data?.userid?._id}`)
    //     .then((res) => {
    //       // sessionStorage.setItem(
    //       //   "accepteduserinfo",
    //       //   JSON.stringify({ ...data, toggleMogel: true })
    //       // );
    //       const intakeinfo = res.data?.data.filter(
    //         (item) => item._id === data?.userintakeid
    //       );
    //       let kundaliinfo = intakeinfo[0];
    //       axiosConfig
    //         .post("/user/geo_detail", {
    //           place: intakeinfo[0].birthPlace,
    //         })
    //         .then((res) => {
    //           kundaliinfo = {
    //             ...kundaliinfo,
    //             userLatLong: res.data?.data?.geonames[0],
    //           };

    //           localStorage.setItem(
    //             "userKundaliInfo",
    //             JSON.stringify(kundaliinfo)
    //           );
    //         })
    //         .catch((err) => console.error(err));
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   history.push({
    //     pathname: "/app/astrochat/chatastro",
    //     // state: { ...data, toggleMogel: true },
    //   });
    // }

    if (data?.type === "Call") {
      const userId = data.userid._id;

      const astroid = data.astroid._id;
      const tono = data.astroid.mobile;
      const fromno = data.userid.mobile;

      let obj = {
        userid: userId,
        astroid: astroid,
        From: fromno, //astro no
        To: tono, //user no
        type: "Call",
      };

      axiosConfig
        .post(`/user/make_call`, obj, {})
        .then((response) => {
          swal("Call Connecting", "SuccessFully");
        })
        .catch((error) => {
          swal("Alert", "Call Failed");
        });
      // console.log('call');
      // history.push({ pathname: "/app/astrochat/chatastro", state: {...data,toggleMogel:true} });
    }
    if (data?.type === "Video" && data.videoLink) {
      window.open(`#/app/call/VideoCall/${data?.videoLink}`, data.videoLink);
    } else {
      // swal("Wait For confirmation with second notify");
    }
  };
  const handleVideoStatus = (data) => {
    console.log("XCV", data);
    localStorage.setItem("notification_Accepted_id", data?._id);
    localStorage.setItem("CurrentVideo_userid", data?.userid?._id);
    let accept = {
      status: "Accept",
    };
    axiosConfig
      .post(`/user/acceptVideoNotificationByAstro/${data?._id}`, accept)
      .then((res) => {
        console.log("for Type", res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
    window.open(`#/app/call/VideoCall/${data?.videoLink}`, data.videoLink);
  };
  const handledelStatus = (data) => {
    axiosConfig
      .get(`/admin/dltNotificattion/${data?._id}`)
      .then((res) => {
        console.log(res);
        getAllnotification();
        setDropdownOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVideoDeleteNotify = (data) => {
    axiosConfig
      .get(`/user/VdolinkList/${data?._id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <li>
          <Button
            onClick={handleshowChangeMode}
            size="sm"
            className="ml-1 btn btn-success"
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              color: "#333",
              fontSize: "0.8rem",
              fontFamily: "Arial, sans-serif",
              width: "83px",
              height: "38px",
              position: "absolute",
              top: "23%",
              right: "25%",
            }}
          >
            <MdCall /> {newStatus || "Status"}
          </Button>
        </li>

        {/* <li>
          <select
            //  onChange={(e) => LanguageSwitcher(e.target.value)}
            name="language"
            id=""
            className="mt-1 stylish-select"
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              color: "#333",
              fontSize: "0.7rem",
              fontFamily: "Arial, sans-serif",
              width: "80px", // You can adjust the width as needed
              height: "28px",
              position: "relative",
              right: "15%",
            }}
          >
            <option value="en">Language</option>
            <option value="hi">हिंदी</option> 
            <option value="en">English</option>
          </select>
        </li> */}
        <li>
          <Button
            onClick={(e) => handleNavigation(e, "/#/extensions/i18n")}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              color: "#333",
              fontSize: "0.8rem",
              fontFamily: "Arial, sans-serif",
              width: "83px",
              height: "38px",
              position: "relative",
              right: "130%",
              top: "23%",
            }}
          >
            <IoLanguageSharp />{" "}
            <FormattedMessage id="Language" defaultMessage="Language" />
          </Button>
        </li>
        <li>
          <Button
            onClick={handleshowofflineAstro}
            size="sm"
            className="ml-1 mt-1 btn btn-success "
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              color: "#333",
              fontSize: "0.8rem",
              fontFamily: "Arial, sans-serif",
              width: "83px",
              height: "38px",
            }}
          >
            <IoChatbox /> {ButtonText}
          </Button>
        </li>

        <Dropdown
          className="dropdown-notification nav-item"
          tag="li"
          isOpen={dropdownOpen}
          toggle={toggleDropdown}
        >
          <DropdownToggle
            tag="a"
            data-toggle="dropdown"
            className="nav-link nav-link-label"
          >
            <Bell size={21} />

            <Badge pill color="primary" className="badge-up">
              {viewnotify + VideoCount}
            </Badge>
          </DropdownToggle>

          <DropdownMenu tag="ul" right className="dropdown-menu-media">
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">{viewnotify + VideoCount}</h3>
                <span className="notification-title">
                  {" "}
                  <FormattedMessage
                    id="notifications"
                    defaultMessage="Notifications"
                  />{" "}
                </span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false,
              }}
            >
              <div className="">
                {astronotification.map((data, i) => (
                  <Media key={i} className="dddddfd">
                    <Media left href="#">
                      <Bell size={21} />
                    </Media>
                    <Media body>
                      <Media heading className="success media-heading" tag="h6">
                        <small className="notification-text ml-1">
                          <img
                            className="mr-2"
                            style={{ borderRadius: "8px" }}
                            src={data?.userid?.userimg}
                            width="22px"
                            height="22px"
                          />
                          <span>{data?.userid?.fullname}</span>
                        </small>
                      </Media>
                      <small className="notification-text">
                        <p className="mb-0">
                          <FormattedMessage
                            id="request.for"
                            defaultMessage="Request for"
                          />{" "}
                          :<span>{data.type ? data.type : "Voice Call"}</span>
                        </p>
                      </small>
                      <div className="bottom-tag">
                        <Button
                          onClick={() => handleStatus(data)}
                          className="success media-heading gt-1"
                        >
                          <FormattedMessage
                            id="accept"
                            defaultMessage="Accept"
                          />
                        </Button>
                        <Button
                          onClick={() => handledelStatus(data)}
                          className="denger media-heading gt-2"
                        >
                          <FormattedMessage
                            id="reject"
                            defaultMessage="Reject"
                          />
                        </Button>
                      </div>
                    </Media>
                    <small>
                      <time
                        className="media-meta"
                        dateTime="2015-06-11T18:29:20+08:00"
                      >
                        {moment(data.createdAt).format("ll")}
                      </time>
                    </small>
                  </Media>
                ))}
                {videonotify.map((data, i) => (
                  <Media key={i} className="dddddfd">
                    <Media left href="#">
                      <Bell size={21} />
                    </Media>
                    <Media body>
                      <Media heading className="success media-heading" tag="h6">
                        <small className="notification-text ml-1">
                          <img
                            className="mr-2"
                            style={{ borderRadius: "8px" }}
                            src={data?.userid?.userimg}
                            width="22px"
                            height="22px"
                          />

                          <span>{data?.userid?.fullname}</span>
                        </small>
                      </Media>
                      <small className="notification-text">
                        <p className="mb-0">
                          <FormattedMessage
                            id="request.for"
                            defaultMessage="Request for"
                          />{" "}
                          : <span>{data.type} Call</span>
                        </p>
                      </small>
                      <div className="bottom-tag">
                        <Button
                          onClick={() => handleVideoStatus(data)}
                          className="success media-heading gt-1"
                        >
                          <FormattedMessage
                            id="accept"
                            defaultMessage="Accept"
                          />
                        </Button>
                        <Button
                          onClick={() => handledelStatus(data)}
                          className="denger media-heading gt-2"
                        >
                          <FormattedMessage
                            id="reject"
                            defaultMessage="Reject"
                          />
                        </Button>
                      </div>
                    </Media>
                    <small>
                      <time
                        className="media-meta"
                        dateTime="2015-06-11T18:29:20+08:00"
                      >
                        {moment(data.createdAt).format("ll")}
                      </time>
                    </small>
                  </Media>
                ))}
              </div>
            </PerfectScrollbar>
            <li className="dropdown-menu-footer">
              <DropdownItem tag="a" className="p-1 text-center">
                <FormattedMessage
                  id="read.all.notifications"
                  defaultMessage="Read all notifications!"
                />
              </DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>

        {/* astrologer api call */}
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              {profilepic?.fullname}
            </div>
            <span data-tour="user">
              <img
                src={profilepic?.img}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>

          <DropdownMenu right>
            <DropdownItem
              tag="a"
              href="#"
              onClick={(e) => handleNavigation(e, "/#/pages/profile")}
            >
              <Icon.User size={14} className="mr-50" />
              <span className="align-middle">
                <FormattedMessage
                  id="edit.profile"
                  defaultMessage="Edit Profile"
                />
              </span>
            </DropdownItem>

            <DropdownItem divider />
            <Route
              render={({ history }) => (
                <DropdownItem
                  tag="a"
                  onClick={(e) => handleofflineAstro(e, "/#/pages/login")}
                >
                  <Icon.Power size={14} className="mr-50" />
                  <span className="align-middle">
                    <FormattedMessage id="logout" defaultMessage="LogOut" />
                  </span>
                </DropdownItem>
              )}
            />
          </DropdownMenu>
        </UncontrolledDropdown>
      </ul>
    </div>
  );
};
export default NavbarUser;
