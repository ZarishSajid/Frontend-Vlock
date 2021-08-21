import React from "react";
import * as moment from "moment";
import { ListGroup, ListGroupItem, FormInput, Button } from "shards-react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ReactDOM from "react-dom";
import { MDBBtn } from "mdbreact";
import { FormSelect } from "shards-react";
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import Election from "../build/contracts/Election.json";
import axios from "axios";
import { Label } from "reactstrap";
import { Radio, Form } from "antd";
// const newDate = new Date();
// const formatDate = moment(newDate).format("YYYY-MM-DDTHH:mm");
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType:""
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);

  }

  handleDropdownChange(e) {
    console.log("You Selected", e.target.value);

    this.setState({ userType: e.target.value });
  }
  onRedirect = (e) => {
    console.log("clicked signup button");

    this.props.form.validateFieldsAndScroll((error, formData) => {
      console.log("inside before if condition field validator");
      if (!error && formData) {
        console.log("inside field after if validator", formData);

        axios
          .post(`http://localhost:8080/vlock/userregister`, {
            cnic: localStorage.getItem("cnic"),
            fullname: localStorage.getItem("fullname"),
            fathername: localStorage.getItem("fathername"),
            gender: localStorage.getItem("gender"),
            country: localStorage.getItem("country"),
            city: localStorage.getItem("city"),
            district: localStorage.getItem("district"),
            address: localStorage.getItem("address"),
            dob: localStorage.getItem("dob"),
            constituencyArea: localStorage.getItem("constituencyArea"),
            constituencyNo: localStorage.getItem("constituencyNo"),
            birthmark: localStorage.getItem("birthmark"),
            userType: this.state.userType
          })
          .then((res) => {
            console.log("RESPONSE = ", res);

            if (res.data.success) {
              alert("Registered Sucessfully!");
              this.props.history.push("/components/RegisterVoter");
            } else {
              console.log("errror");
              alert(res.data.message);
            }
            //res.sucess=();
          });
      }
    });
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const userData =
      this.props.location &&
      this.props.location.aboutProps &&
      this.props.location.aboutProps.userData;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle className="text-sm-left" />
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "20px",
                  marginLeft: "30px",
                  marginRight: "30px",
                  backgroundColor: "#569CE5",
                }}
              >
                <h4 style={{ color: "black", fontWeight: "bold" }}>
                  {" "}
                  <center>Registered Admin Information</center>
                </h4>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Full Name
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("fullname")}
                      </p>{" "}
                    </Col>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Father Name
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("fathername")}
                      </p>{" "}
                    </Col>{" "}
                  </Row>

                  <Row>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Gender
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("gender")}
                      </p>{" "}
                    </Col>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Country
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("country")}
                      </p>{" "}
                    </Col>{" "}
                  </Row>
                  <Row>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        City
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("city")}
                      </p>{" "}
                    </Col>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        District
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("district")}
                      </p>{" "}
                    </Col>{" "}
                  </Row>

                  <Row>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Constituency Area
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("constituencyArea")}
                      </p>
                    </Col>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Birth Mark
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("birthmark")}
                      </p>{" "}
                    </Col>{" "}
                  </Row>

                  <Row>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        DOB
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("dob")}
                      </p>{" "}
                    </Col>
                    <Col md="6" className="form-group">
                      <label
                        style={{
                          color: "black",
                          marginLeft: "30px",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Constituency Number
                      </label>
                      <p
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        {localStorage.getItem("constituencyNo")}
                      </p>{" "}
                    </Col>{" "}
                  </Row>
                  <Row>
                  <Col md="6" className="form-group">
                    <label
                      style={{
                        color: "black",
                        marginLeft: "30px",
                        fontWeight: "bold",
                      }}
                      htmlFor=""
                    >
                      Address
                    </label>
                    <p
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        padding: "20px",
                        marginLeft: "30px",
                        marginRight: "30px",
                      }}
                    >
                      {localStorage.getItem("address")}
                    </p>
                  </Col>
                  <Col  md="6" className="form-group">
                  <label
                      style={{
                        color: "black",
                        marginLeft: "30px",
                        fontWeight: "bold",
                      }}
                      htmlFor=""
                    >
                      Admin Type
                    </label>
                    <br/>
                    {getFieldDecorator("pollType", {
                      
                      initialValue: this.state.userType,
                    })}
                    <FormSelect
                      style={{border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                      marginLeft: "30px",
                       height: "80px", width: "26rem" }}
                      onChange={this.handleDropdownChange}
                    >
                      <option
                        style={{ color: "black" }}
                        value="L1"
                      >
                        Level 1 Admin
                      </option>
                      <option style={{ color: "black" }} value="L2">
                      Level 2 Admin

                      </option>
                      <option style={{ color: "black" }} value="L3">
                      Level 3 Admin

                      </option>

                    </FormSelect>
                  </Col>
                  </Row>
                  <MDBBtn
                    className="d-flex justify-content-center "
                    style={{ margin: "auto" }}
                    onClick={() => this.onRedirect()}
                    color="primary"
                    rounded
                  >
                    Registered Voter
                  </MDBBtn>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// ReactDOM.render(<Test />, document.querySelector("#root"));
export default Form.create()(Test);
