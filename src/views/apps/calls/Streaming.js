import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axiosConfig from "../../../axiosConfig";
function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let role_str = getUrlParams(window.location.href).get("role") || "Host";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID +
        "&role=Cohost",
    });
  }
  sharedLinks.push({
    name: "Join as audience",
    url:
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID +
      "&role=Audience",
  });
  // generate Kit Token

  const appID = 913321685;
  const serverSecret = "ec2b5151f49c5376a2e91a5a81a69bc0";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5)
  );

  // start the call
  let myMeeting = async (element) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    let astroid = localStorage.getItem("astroId");

    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
      preJoinViewConfig: {
        title: "Join Room For Live", // The title of the prejoin view. Uses "enter Room" by default.
      },
      onLiveStart: (data) => {
        console.log(data);
        // if (localStorage.getItem("stopLiveId") && roomID) {
        //   alert("ASTRO Already Live");
        // }
        // else {
        let obj = {
          astroid: astroid,
          status: "live",
          videoliveStream: roomID,
        };
        axiosConfig
          .post("/user/WebliveStream", obj)
          .then((response) => {
            // console.log("LIVE Call ", response.data);
            localStorage.setItem("stopLivenewId", response.data.data._id);
            // if (localStorage.getItem("stopLiveId")) {
            //   localStorage.setItem("stopLivenewId", response.data.data._id);
            // } else {
            //   localStorage.setItem("stopLiveId", response.data.data?._id);
            //   this.setState({ status: "" });
            // }
          })
          .catch((error) => {
            console.log(error);
          });
        // }
      },

      onLiveEnd: () => {
        axiosConfig
          .get(`/user/closeLiveStream/${localStorage.getItem("stopLivenewId")}`)
          .then((response) => {
            console.log("Stop LIVE  ", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
