import React, { useEffect, useState } from "react";
import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
// import AgoraUIKit from "agora-react-uikit";
import Streaming from "../calls/Streaming";
import "./../../../assets/scss/video.scss";

import axiosConfig from "../../../axiosConfig";
import { history } from "../../../history";
import swal from "sweetalert";

function YourliveStream() {
  const [videoCall, setVideoCall] = useState(false);
  const [liveid, setliveId] = useState("");
  const [channelNamecreated, setchannelName] = useState("");
  const [Status, setStatus] = useState("");
  const [Token, setToken] = useState("");
  const [show, setShow] = useState(false);
  const [Addcall, setAddcall] = useState(false);
  const [livestraming, setlivestraming] = useState(false);

  const [view, setview] = useState(false);
  const [listofchannel, setlistofchannel] = useState();

  //   const rtcProps = {
  //     // Pass your App ID here.
  //     appId: "7d1f07c76f9d46be86bc46a791884023",
  //     // Set the channel name.
  //     channel: channelNamecreated,
  //     enableVideo: true,

  //     // Pass your temp token here.
  //     token: Token || localStorage.getItem("astrotokenforlivestream"),

  //     uid: 0,
  //     // Set the user role
  //     role: "host",
  //   };

  useEffect(() => {
    const handlePopstate = () => {
      // Push a new state to the history to keep the user on the current page
      window.history.pushState(null, null, window.location.pathname);
    };

    // Add event listener to handle the popstate event
    window.addEventListener("popstate", handlePopstate);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  //   const callbacks = {
  //     EndCall: () => {
  //       setVideoCall(false);
  //       // console.log(liveid);
  //       const astroid = localStorage.getItem("astroId");
  //       axiosConfig
  //         .get(`/user/disConnectLiveStream/${liveid}`)
  //         .then((res) => {
  //           // window.location. ();
  //           console.log(res.data);
  //           setlivestraming(false);
  //         })
  //         .catch((err) => {
  //           console.log(err.response);
  //         });
  //     },
  //   };

  const handlestatus = (e) => {
    e.preventDefault();
    const astroid = localStorage.getItem("astroId");

    const payload = {
      astroAccount: astroid,
      status: true,
    };

    if (Status === "Active") {
      setShow(true);
      axiosConfig
        .post(`/user/astroLiveStreaming`, payload)

        .then((res) => {
          console.log(res.data);
          if (res.data.msg === "already exists") {
            setToken(res.data?.token);
            setliveId(res.data?._id);
            localStorage.setItem("liveid", res.data?._id);
            setlivestraming(true);
          }
          if (res.data?.message === "success") {
            localStorage.setItem("liveid", res.data?.data?._id);
            setToken(res.data?.data?.token);
            setliveId(res.data?.data?._id);
            setlivestraming(true);
          }

          localStorage.setItem(
            "astrotokenforlivestream",
            res.data?.data?.token
          );
          setVideoCall(true);
        })
        .catch((err) => {
          console.log(err.response?.data);
        });
    }
    if (Status === "Deactive") {
      localStorage.removeItem("astrotokenforlivestream");
    }
  };

  const handleofflinestreaming = () => {
    const liveidnew = localStorage.getItem("liveid");
    console.log(liveidnew);
    setShow(false);
    axiosConfig
      .get(`/user/disConnectLiveStream/${liveidnew}`)
      .then((res) => {
        console.log(res.data);
        setlivestraming(false);
        localStorage.removeItem("liveid");
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="m-0 livestream">
      <Card>
        <Row>
          <Col lg="4" md="4" sm="4">
            <div className="container mt-2 mb-1">
              <Button onClick={(e) => handlestatus(e)} color="success">
                liveStreaming Now
              </Button>
            </div>
          </Col>
          <Col>
            <div className="container my-1 ">
              <Row>
                {livestraming === false ? (
                  <>
                    <Col className="mt-1">
                      <FormGroup check>
                        <Input
                          value="Active"
                          onClick={(e) => {
                            setStatus(e.target.value);
                          }}
                          name="radio1"
                          type="radio"
                        />
                        <Label check>Online</Label>
                      </FormGroup>
                    </Col>
                  </>
                ) : null}

                <Col className="mt-1">
                  <FormGroup check>
                    <Input
                      value="Deactive"
                      onClick={(e) => {
                        setStatus(e.target.value);
                        handleofflinestreaming();
                      }}
                      name="radio1"
                      type="radio"
                    />
                    <Label check>Offline</Label>
                  </FormGroup>
                </Col>
                {show === true ? (
                  <Col>
                    <Streaming />
                  </Col>
                ) : null}
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="mt-1 mb-1">
            {videoCall && Status === "Active" ? (
              <div style={{ display: "flex", width: "100vw", height: "80vh" }}>
                {/* <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} /> */}
                <Streaming />
                <h3>Testing</h3>
              </div>
            ) : (
              <>
                {Addcall === true ? (
                  <>
                    <Button onClick={() => setVideoCall(true)} color="success">
                      liveStreams Now
                    </Button>
                  </>
                ) : null}
              </>
            )}
          </div>
        </Row>
      </Card>
    </div>
  );
}

export default YourliveStream;
