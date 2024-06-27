import React from "react";
import { Row, Col, Label } from "reactstrap";

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";

import "../../../assets/scss/pages/users.scss";

import axiosConfig from "../../../axiosConfig";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class EarningReport extends React.Component {
  state = {
    rowData: {},
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
  };
  async componentDidMount() {
    let astroid = localStorage.getItem("astroId");
    await axiosConfig
      .get(`/user/getAstroEarnings/${astroid}`)
      .then((response) => {
        let rowData = response.data.data;
        this.setState({ rowData });
      });
  }

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Earning Report"
          breadCrumbParent="Home"
          breadCrumbActive="Earning Report"
        />

        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Row className="m-2">
              <Col>
                <h1 sm="6" className="float-left">
                  Earning Report
                </h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1">Today Earn</h3>
                  </Label>
                  <h4>{this.state.rowData?.today} Rs</h4>
                </div>
              </Col>
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1">Weekly Earn</h3>
                  </Label>
                  <h4>{this.state.rowData?.week} Rs</h4>
                </div>
              </Col>
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1">Month Earn</h3>
                  </Label>
                  <h4>{this.state.rowData?.month} Rs</h4>
                </div>
              </Col>
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1">Total Earn</h3>
                  </Label>
                  <h4>{this.state?.rowData?.total} Rs</h4>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default EarningReport;
