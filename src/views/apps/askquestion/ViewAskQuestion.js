import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
// import { history } from "../../../../history";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import "../../../assets/scss/pages/users.scss";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Route } from "react-router-dom";
import axiosConfig from "../../../axiosConfig";
// import ReactHtmlParser from "react-html-parser";

class ViewAskQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/user/getone_ask_qus/${id}`)

      .then((response) => {
        //console.log(response.data);
        console.log(response.data.data);
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Breadcrumbs
            breadCrumbTitle="Ask Question"
            breadCrumbParent="Home"
            breadCrumbActive="View Ask Question"
          />
          <Row>
            <Col sm="12"></Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Ask Question
                </h1>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/askquestion/uerAskQuesList")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Row className="mb-5 mt-2">
                <Col md="6" sm="12" className="mb-4">
                  <h4>Question</h4>
                  <h6 className=""> {this.state.data.question}</h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  {/* <h6 className=""> {this.state.data?.rashiId?.rashi_title}</h6> */}
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Answer</h4>
                  <h6 className=""> {this.state.data.answer}</h6>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewAskQuestion;
