import React from "react";
import { Row, Col, Card, CardTitle, CardText, CardBody } from "reactstrap";

import axiosConfig from "../../../axiosConfig";
import "../../../assets/scss/pages/dashboard-analytics.scss";

import * as Icon from "react-feather";

class AnalyticsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: "",
      totalcall: "",
      waitlist: "",
      Astrointakeno: "",
      Uploads: "",
      ProductList: "",
      faq: "",
      waitqlist: "",
      order: "",
      Allrating: "",
      earn: "",
      ttlanswered: "",
    };
  }

  async componentDidMount() {
    const astroId = localStorage.getItem("astroId");
    await axiosConfig
      .get(`/user/wait_queue_list/${astroId}`)
      .then((res) => {
        this.setState({ waitlist: res.data.data?.length });
      })
      .catch((err) => {
        console.log(err);
      });

    await axiosConfig
      .get(`/user/astroCallHistory/${astroId}`)
      .then((response) => {
        let rowData = response.data.data?.length;
        this.setState({ totalcall: rowData });
      });
    await axiosConfig
      .get(`/user/getAstroEarnings/${astroId}`)
      .then((response) => {
        let rowData = response.data.data?.today;
        // console.log(rowData);
        this.setState({ rowData });
      });

    await axiosConfig
      .get(`admin/intekListByastro/${astroId}`)
      .then((response) => {
        let rowData = response.data.data?.length;

        this.setState({ Astrointakeno: rowData });
      });
    axiosConfig
      .get(`/admin/get_astroGallery/${astroId}`)
      .then((res) => {
        this.setState({ Uploads: res?.data?.data?.length });
      })
      .catch((err) => {
        console.log(err);
      });
    await axiosConfig.get(`/user/productlist/${astroId}`).then((response) => {
      let ProductList = response.data?.data?.length;
      // console.log(ProductList);
      this.setState({ ProductList: ProductList });
    });
    await axiosConfig
      .get(`/user/astro_ques_list/${astroId}`)
      .then((response) => {
        // console.log(response.data.data);
        let answered = response.data?.data?.filter((value) => value?.answer);
        let faq = response?.data?.data?.length;
        this.setState({ faq: faq });
        this.setState({ ttlanswered: answered?.length });
      });
    await axiosConfig
      .get(`/user/getWaitQueueList/${astroId}`)
      .then((response) => {
        let rowData = response?.data?.waitQueueList?.length;
        this.setState({ waitqlist: rowData });
      });
    await axiosConfig
      .get("/admin/admin_product_Orderslist")
      .then((response) => {
        let rowData = response.data.data;
        let arr = rowData.filter((value) => value?.astroid?._id === astroId);
        this.setState({ order: arr?.length });
      });
    await axiosConfig.get(`/user/allRevieAstro/${astroId}`).then((response) => {
      let rowData = response.data.data.length;
      this.setState({ Allrating: rowData });
    });
    await axiosConfig
      .get(`/user/getAstroEarnings/${astroId}`)
      .then((response) => {
        this.setState({ earn: response?.data?.data?.total });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardTitle className="ast-3">Dashboard</CardTitle>
          <hr></hr>
          <CardBody>
            <Row className="match-height">
              <Col md="4">
                <div className="bg-t mb-3">
                  {/* <span className="ast-1">
                    <Icon.Users size={40} className="mr-50" />
                  </span> */}
                  <h2 className="ast-2">
                    Total Request Users
                    <span className="ast-4">{this.state.waitlist}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-s">
                  {/* <span className="ast-1">
                    <Icon.PhoneCall size={40} className="mr-50" />
                  </span> */}
                  <h2 className="ast-2">
                    Total Call History
                    <span className="ast-4">{this.state.totalcall}</span>
                  </h2>
                </div>
              </Col>

              <Col md="4">
                <div className="bg-p">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    {" "}
                    Conversation in Take
                    <span className="ast-4">{this.state.Astrointakeno}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-s mb-3">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    {" "}
                    My Uploads
                    <span className="ast-4">{this.state.Uploads}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-t">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    {" "}
                    Product List
                    <span className="ast-4">{this.state.ProductList}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-s">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    {" "}
                    Wait Queue List
                    <span className="ast-4">{this.state.waitqlist}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-p mb-3">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    {" "}
                    Users FAQ List
                    <span className="ast-4">{this.state.faq}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-s mb-3">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    Users FAQ Answered
                    <span className="ast-4">{this.state.ttlanswered}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div
                  style={{
                    backgroundColor:
                      this.state.faq - this.state.ttlanswered === "0"
                        ? "green"
                        : "red",
                  }}
                  className="bg-t mb-3"
                >
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h5 className="ast-2 ast-3" style={{ fontSize: "12px" }}>
                    Users FAQ NotAnswered
                    <span className="ast-4">
                      {this.state.faq - this.state.ttlanswered}
                    </span>
                  </h5>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-s">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    All Orders
                    <span className="ast-4">{this.state.order}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-t">
                  <span style={{ fontSize: "50px" }} className="ast-1"></span>
                  <h2 className="ast-2">
                    All Ratings
                    <span className="ast-4">{this.state.Allrating}</span>
                  </h2>
                </div>
              </Col>
              <Col md="4">
                <div className="bg-s">
                  {/* <span style={{ fontSize: "50px" }} className="ast-1">
                    ₹
                  </span> */}
                  <h2 className="ast-2">
                    Total Earning
                    <span className="ast-4">{this.state.earn}</span>
                  </h2>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default AnalyticsDashboard;
