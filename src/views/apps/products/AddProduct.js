import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  CustomInput,
  Label,
  Button,
} from "reactstrap";
//import axios from "axios";
import axiosConfig from "../../../axiosConfig";
// import { useParams } from "react-router-dom";
//import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import Axios from "axios";
import swal from "sweetalert";

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mrp: "",
      category: "",
      product: "",
      categoryList: [],
      productList: [],
    };
  }

  componentDidMount() {
    axiosConfig
      .get(`/admin/getproductcalegory`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({ categoryList: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axiosConfig
      .post(`/user/add_astro_product`, {
        astroid: localStorage.getItem("astroId"),
        product: this.state.product,
        category: this.state.category,
        price: this.state.mrp,
      })
      .then((response) => {
        console.log(response.data.data);
        if (response.data.message === "success") {
          swal("", "Product Updated Successfully");
        }

        this.props.history.push("/app/products/productlist");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Add Product"
          breadCrumbParent=" Product Management"
          breadCrumbActive="Add Product"
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add Product
              </h1>
            </Col>
            {/* <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/products/productlist")}
                  >
                    Back
                  </Button>
                )}
              />
            </Col> */}
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label>Category Name</Label>
                  <CustomInput
                    required
                    type="select"
                    name="category"
                    value={this.state.category}
                    onChange={(e) => {
                      this.changeHandler(e);

                      axiosConfig
                        .get(`/user/productbycategory/${e.target.value}`)
                        .then((response) => {
                          this.setState({
                            productList: response.data.data,
                          });
                          console.log("productList", response.data.data);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <option>Select.....</option>
                    {this.state.categoryList?.map((catList) => (
                      <option key={catList._id} value={catList._id}>
                        {catList.name}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label>Product Name</Label>
                  <CustomInput
                    required
                    type="select"
                    name="product"
                    value={this.state.product}
                    onChange={this.changeHandler}
                  >
                    <option>Select.....</option>
                    {this.state.productList?.map((proList) => (
                      <option key={proList._id} value={proList._id}>
                        {proList?.product?.productname}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label>Selling Price(MRP)</Label>
                  <Input
                    type="text"
                    name="mrp"
                    placeholder="Enter Price"
                    value={this.state.mrp}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
              </Row>
              {/* <Col lg="6" md="6" sm="6" className="mb-2">
                <Label className="mb-1">Status</Label>
                <div
                  className="form-label-group"
                  onChange={(e) => this.changeHandler1(e)}
                >
                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Active"
                  />
                  <span style={{ marginRight: "20px" }}>Active</span>

                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Inactive"
                  />
                  <span style={{ marginRight: "3px" }}>Inactive</span>
                </div>
              </Col> */}
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
    );
  }
}
export default AddProduct;
