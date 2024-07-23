import React from "react";
import { FormattedMessage } from 'react-intl';
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
        console.log(response);
        let rowData = response.data.data;
        this.setState({ rowData });
      });
  }

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle={ <FormattedMessage id="Earning Report" defaultMessage="Earning Report"/>}
          breadCrumbParent={ <FormattedMessage id="Home" defaultMessage="Home"/>}
          breadCrumbActive={ <FormattedMessage id="Earning Report" defaultMessage="Earning Report"/>}
        />

        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Row className="m-2">
              <Col>
                <h1 sm="6" className="float-left">
                <FormattedMessage id="Earning Report" defaultMessage="Earning Report"/>
                </h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1"><FormattedMessage id="Today's Earn" defaultMessage="Today Earn"/></h3>
                  </Label>
                  <h4>{this.state.rowData?.today} Rs</h4>
                </div>
              </Col>
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1"><FormattedMessage id="Weekly Earn" defaultMessage="Weekly Earn"/></h3>
                  </Label>
                  <h4>{this.state.rowData?.week} Rs</h4>
                </div>
              </Col>
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1"><FormattedMessage id="Month Earn" defaultMessage="Month Earn"/></h3>
                  </Label>
                  <h4>{this.state.rowData?.month} Rs</h4>
                </div>
              </Col>
              <Col>
                <div className="container text-center card justify-content-center">
                  <Label>
                    <h3 className="mt-1"><FormattedMessage id="Total Earn" defaultMessage="Total Earn"/></h3>
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
