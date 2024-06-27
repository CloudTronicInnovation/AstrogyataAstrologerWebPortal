/* eslint-disable react-hooks/rules-of-hooks */

import * as React from "react";
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import './style.css';
// import { getUserID } from "../astrologerdetail";
import axiosConfig from "../../../axiosConfig";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

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
  // let urlStr = url.split("?")[1];
  let urlStr = url.split("/")[7];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const astroName = localStorage.getItem("astroData");
  let name = astroName?.fullname;
  let room = window.location.href.split("/")[7];
  const roomID = getUrlParams().get("roomID") || room || randomID(5);
  const astroname = name || randomID(5).toString();
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1011009319;
    // const response = getUserID();
    const serverSecret = "0b7c5477f07346c1a906c99d3f171f2e";
    //  console.log(window.location.pathname)
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5).toString(),
      astroname
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    let userID = JSON.parse(localStorage.getItem("user_id"));
    // start the call
    zp.joinRoom({
      maxUsers: 2,
      container: element,
      useFrontFacingCamera: false,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            "/#/VideoCall" +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      turnOnCameraWhenJoining: false,
      scenario: {
        mode: "OneONoneCall",
        config: {
          role: "Host",
        },
      },

      showScreenSharingButton: true,
      preJoinViewConfig: {
        title: "Join AstroGyata Meeting Room",
      },
      onUserLeave: () => {
        let astroid = localStorage.getItem("astroId");
        let value = {
          userId: userID,
          astroId: astroid,
        };
        axiosConfig
          .post(`/user/changeStatus`, value)
          .then((res) => {
            console.log("Astro CloneJob Stop", res);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      },
    });
  };

  return (
    <div className="container">
      <div
        className="myCallContainer pt-3  container"
        ref={myMeeting}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
}
