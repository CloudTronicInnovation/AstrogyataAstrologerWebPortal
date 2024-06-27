import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  FormGroup,
} from 'reactstrap'
//import axios from "axios";
import axiosConfig from '../../../axiosConfig'
// import { useParams } from "react-router-dom";
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Route } from 'react-router-dom'
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb'
import swal from 'sweetalert'

export class UserQuestionReply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: '',
    }
  }

  // toggle = (tab) => {
  //   this.setState({
  //     activeTab: tab,
  //   })
  // }

  componentDidMount() {
    let { id } = this.props.match.params
    axiosConfig
      .get(`/user/getone_ask_qus/${id}`)
      // .get(`/user/getone_ask_qus/637cbcae8dbfccbcd79fb005`)
      .then((response) => {
        console.log(response)
        this.setState({
          question: response.data.data.question,

          //   dealer: response.data.data.dealer,
        })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value })
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()
    let { id } = this.props.match.params

    axiosConfig
      // .post(`/user/reply/637cbd538dbfccbcd79fb007`
      .post(`/user/reply/${id}`, {
        // astroid: localStorage.getItem('astroId'),
        answer: this.state.answer,
      })
      .then((response) => {
        console.log(response.data.data)
        if (response.data.message === 'success') {
          swal('', 'Product Updated Successfully')
        }

        this.props.history.push('/app/askquestion/userAskQuesList')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle=" User Ask Question Reply"
          breadCrumbParent="Home"
          breadCrumbActive=" User Ask Question Reply"
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                User Ask Question Reply
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push(`/app/askquestion/userAskQuesList`)
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="12" md="12" sm="12" className="mb-2">
                  <Label>Question</Label>
                  <Input
                    required
                    type="text"
                    name="question"
                    placeholder="Question"
                    value={this.state.question}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="12" md="12" sm="12" className="mb-2">
                  <Label>Answer</Label>
                  <textarea
                    className="form-control"
                    placeholder="answer..."
                    maxLength={200}
                    name="answer"
                    value={this.state.answer}
                    onChange={this.changeHandler}
                  ></textarea>
                </Col>
              </Row>
              <Row></Row>
              <Col lg="12" md="12" sm="12" className="mb-2">
                <Label className="mb-1">Status</Label>
                <div
                  className="form-label-group"
                  onChange={(e) => this.changeHandler1(e)}
                >
                  <input
                    style={{ marginRight: '3px' }}
                    type="radio"
                    name="status"
                    value="Active"
                  />
                  <span style={{ marginRight: '20px' }}>Active</span>

                  <input
                    style={{ marginRight: '3px' }}
                    type="radio"
                    name="status"
                    value="Inactive"
                  />
                  <span style={{ marginRight: '3px' }}>Inactive</span>
                </div>
              </Col>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Save
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }
}
export default UserQuestionReply
