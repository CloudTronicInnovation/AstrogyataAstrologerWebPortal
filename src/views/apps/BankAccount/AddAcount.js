import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  CustomInput,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import swal from "sweetalert";
import { CloudLightning } from "react-feather";

const bankNames = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Punjab National Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Canara Bank",
  "Bank of Baroda",
  "Union Bank of India",
  "IndusInd Bank",
  "IDFC First Bank",
  "Federal Bank",
  "Yes Bank",
  "RBL Bank",
  "IDBI Bank",
  "Oriental Bank of Commerce",
  "South Indian Bank",
  "UCO Bank",
  "Bandhan Bank",
  "Karur Vysya Bank",
  "Dhanlaxmi Bank",
  "Indian Bank",
  "Punjab & Sind Bank",
  "Vijaya Bank",
  "Andhra Bank",
  "Corporation Bank",
  "Syndicate Bank",
  "Jammu and Kashmir Bank",
  "Karnataka Bank",
  "City Union Bank",
  "Saraswat Bank",
  "Lakshmi Vilas Bank",
  "Catholic Syrian Bank",
  "Nainital Bank",
  "Dena Bank",
  "United Bank of India",
  "Allahabad Bank",
  "Central Bank of India",
  "Bank of Maharashtra",
  "State Bank of Patiala",
  "State Bank of Mysore",
  "State Bank of Bikaner and Jaipur",
  "State Bank of Travancore",
  "State Bank of Hyderabad",
];
const AddAccount = (props) => {
  const [mrp, setMrp] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [bankName, setBankName] = useState("");
  const [account, setAccount] = useState("");
  const [C_account, setC_account] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [pancardNumber, setPancardNumber] = useState("");

  const changeHandler1 = (e) => {
    setCategory(e.target.value);
  };

  const changeHandler = (e) => {
    // if (e.target.name === "product") {
    //   setProduct(e.target.value);
    // } else if (e.target.name === "mrp") {
    //   setMrp(e.target.value);
    // }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosConfig
      .post(`/user/add_astro_product`, {
        astroid: localStorage.getItem("astroId"),
        product: product,
        category: category,
        price: mrp,
      })
      .then((response) => {
        console.log(response.data.data);
        if (response.data.message === "success") {
          swal("", "Product Updated Successfully");
        }

        props.history.push("/app/products/productlist");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              Add Account
            </h1>
          </Col>
        </Row>
        <CardBody>
          <Form className="m-1" onSubmit={submitHandler}>
            <Row>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Account HolderName</Label>
                <Input
                  type="number"
                  name="holderName"
                  placeholder="Enter HolderName"
                  value={holderName}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setHolderName(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Bank Name</Label>
                <CustomInput
                  required
                  type="select"
                  name="bankName"
                  value={bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                  }}
                  defaultValue=""
                >
                  <option value="">Select a Bank</option>
                  {bankNames?.map((bank, index) => (
                    <option key={(bank, index)} value={bank}>
                      {bank}
                    </option>
                  ))}
                </CustomInput>
              </Col>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>IFSC Code</Label>
                <Input
                  type="text"
                  name="ifsc"
                  placeholder="Enter IFSC"
                  value={ifsc}
                  onChange={(e) => {
                    setIfsc(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Account Number</Label>
                <Input
                  type="number"
                  name="account"
                  placeholder="Enter Account Number"
                  value={account}
                  onKeyDown={(evt) => {
                    if (
                      evt.key === "e" ||
                      evt.key === "E" ||
                      evt.key === "-" ||
                      evt.key === "+"
                    ) {
                      evt.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAccount(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Confirm Account Number</Label>
                <Input
                  type="number"
                  name="c_account"
                  onKeyDown={(evt) => {
                    if (
                      evt.key === "e" ||
                      evt.key === "E" ||
                      evt.key === "-" ||
                      evt.key === "+"
                    ) {
                      evt.preventDefault();
                    }
                  }}
                  placeholder="Enter Confirm Account Number"
                  value={C_account}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Pancard Number</Label>
                <Input
                  type="text"
                  name="txtPANCard"
                  placeholder="Enter Pan"
                  value={pancardNumber}
                  onChange={(e) => {
                    setPancardNumber(e.target.value);
                  }}
                />
              </Col>
            </Row>

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
};

export default AddAccount;
