import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { history } from "../../../history";

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
  Label,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import "../../../assets/scss/video.scss";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
//import classnames from "classnames";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import swal from "sweetalert";

const propTypes = {};

const defaultProps = {};

const Uploads = () => {
  const [video, setvideo] = useState("");
  // const [image, setimage] = useState({});

  const handlevideoUpload = () => {
    const astroid = localStorage.getItem("astroId");

    console.log(video);
    console.log(astroid);

    const gallry = new FormData();
    gallry.append("astroId", astroid);
    gallry.append("file", video);
    axiosConfig
      .post(`/admin/upload_astrogallery`, gallry)
      .then((res) => {
        console.log(res);
        if (res?.data.message === "success") {
          swal(" Uploaded Sucessfully");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });

    // if (video?.type?.split("/")[0] === "image") {
    // }
    // if (video?.type?.split("/")[0] === "video") {
    //   gallry.append("astroId", astroid);
    //   gallry.append("video", video);

    //   axiosConfig
    //     .post(`/admin/upload_astrogallery`, gallry)
    //     .then((res) => {
    //       console.log(res);
    //       if (res?.data.message === "success") {
    //         swal("Video Uploaded Sucessfully");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    // console.log("video", video?.type?.split("/")[0] === "video");
    // console.log("video", video?.type?.split("/")[0] === "image");
  };
  return (
    <div>
      <div>
        <div>
          <Card>
            <Row>
              <Col lg="6" sm="6" md="6">
                <Row>
                  <div className="d-flex container">
                    <h3 className="mt-2 mb-1 mx-3"> Upload Your Gallary </h3>
                  </div>
                </Row>
              </Col>
              <Col>
                <div className="d-flex justify-content-end container mt-2 mr-1">
                  <div>
                    <Button
                      onClick={() => {
                        history.goBack();
                        // history.push("/uploads");
                      }}
                      color="primary"
                    >
                      {" "}
                      Back
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="mb-2 mt-2">
                <div className="container">
                  <div className="uplodsdata">
                    <Row className="uploadmain">
                      <Col>
                        <div>
                          <Label>
                            <p style={{ color: "red" }}>
                              png,jpg,jpeg,mp4-only{" "}
                            </p>
                          </Label>
                          <Input
                            name="file"
                            onChange={(e) => setvideo(e.target.files[0])}
                            accept="video/mp4,.png,.jpg,.jpeg"
                            type="file"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="buttonuploadv">
                          <Button
                            onClick={handlevideoUpload}
                            size="sm"
                            className="bntuploadsvideo mt-3"
                            color="primary"
                          >
                            Upload
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              {/* <Col>
                <div className="d-flex justify-content-center">
                  <div>
                    <h3 className="mt-1 mb-1"> Upload Images</h3>
                  </div>
                </div>
                <div className="container">
                  <div className="uplodsdata">
                    <Row className="uploadmain">
                      <Col>
                        <div>
                          <Input
                            onChange={(e) => setimage(e.target.files[0])}
                            // accept="image/*"
                            accept=".png, .jpg, .jpeg"
                            type="file"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="buttonuploadv">
                          <Button
                            onClick={Uplaodimage}
                            size="sm"
                            className="bntuploadsvideo"
                            color="primary"
                          >
                            Upload Images
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col> */}
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};

Uploads.propTypes = propTypes;
Uploads.defaultProps = defaultProps;
// #endregion

export default Uploads;
