import React from "react";
import { Input, CardBody } from "reactstrap";

import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import axios from "axios";
import { Form, Typography } from "antd";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
} from "shards-react";
const FormItem = Form.Item;
const { Text } = Typography;
class title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: localStorage.getItem("name"),
      password: localStorage.getItem("password"),
      department: localStorage.getItem("department"),
      cpassword: "",
    };
  }

  onRedirect = (e) => {
    this.props.form.validateFieldsAndScroll((error, formData) => {
      if (!error && formData) {
        const headers = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        const data = {
          cnic:formData.cnic,
          fullname: formData.fullname,
          password: formData.password,
        };
        console.log("fullname in profile", localStorage.getItem("fullname"));
      
        if (formData.password !== formData.cpassword) {
          alert("Your Password did not match");
          return;
        }
        axios
          .put(`http://localhost:8080/vlock/update`, data, headers)

          .then((res) => {
            console.log("RESPONSE = ", res);
            console.log(res.message);
            if (res.data.success) {
              alert("Updated Sucessfully");
              window.location.reload(false);
            } else {
              //  console.log("else")
              alert(res.data.message);
            }
            // window.location.reload(false);

            //res.sucess=();
          });
      }
    });
  };
  // Name=(e) => {
  //   this.setState({name: e.target.value
  //   })

  // }
  // Email = e=>{
  //   this.setState({email: e.target.value
  //   })
  // }
  // Password = e=>{
  //   this.setState({password: e.target.value
  //   })
  // }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <br />
        <Form onSubmit={this.onRedirect}>
          <Card
            sm
            className="mb-4"
            style={{
              height: "43rem",
              width: "50rem ",
              marginTop: "30px",
              marginLeft: "145px",
            }}
          >
            <CardHeader
              style={{
                border: "1px solid white",
                borderRadius: "10px",
                padding: "25px",
                marginLeft: "30px",
                marginRight: "30px",
                backgroundColor: "#569CE5",
              }}
            >
              <h4 style={{ color: "black", fontWeight: "bold" }}>
                {" "}
                <center>Profile</center>
              </h4>
            </CardHeader>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                    <Col md="14" className="form-group">
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        Full Name
                      </label>
                      <p
                        style={{
                          border: "1px solid lightgray",
                          borderRadius: "4px",
                          padding: "17px",
                        }}
                      >
                        {localStorage.getItem("fullname")}
                      </p>{" "}
                    </Col>

                      <br />
                      
                     
                      <Col md="14" className="form-group">
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        htmlFor=""
                      >
                        CNIC Number
                      </label>
                      <p
                        style={{
                          border: "1px solid lightgray",
                          borderRadius: "4px",
                          padding: "17px",
                        }}
                      >
                        {localStorage.getItem("CNIC")}
                      </p>{" "}
                    </Col>

                      <br />
                      <FormItem
                        style={{ color: "red" }}
                        label={
                          <Text style={{ fontWeight: "bold", color: "black" }}>
                            New Password
                          </Text>
                        }
                      >
                        {getFieldDecorator("password", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter  your password",
                            },
                            // {
                            //   validator: (rule, value, callback) => {
                            //      if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)) {
                            //       callback(" Your password must include 1 lowercase character, 1 uppercase character,1 number and 1 special character in (!@#*&/^)");
                            //     }
                            //     return callback();
                            //   }
                            // }
                          ],
                          initialValue: this.state.password,
                        })(<Input placeholder="password" type="password" />)}
                      </FormItem>

                      <br />
                      <FormItem
                        style={{ color: "red" }}
                        label={
                          <Text style={{ fontWeight: "bold", color: "black" }}>
                            Confirm Password
                          </Text>
                        }
                      >
                        {getFieldDecorator("cpassword", {
                          rules: [
                            {
                              required: true,
                              message: "Please re-enter  your password",
                            },
                          ],
                          initialValue: this.state.cpassword,
                        })(
                          <Input
                            placeholder=" Confirm Password"
                            type="password"
                          />
                        )}
                      </FormItem>
                      <b />
                      <b>
                        {" "}
                        <Button
                          style={{ marginLeft: "330px", marginTop: "20px" }}
                          onClick={() => this.onRedirect()}
                          color="primary"
                        >
                          Update
                        </Button>
                      </b>

                      {/* <a
                    style={{
                      color: "primary",
                      textDecorationLine: "underline",
                      marginLeft: "300px",
                    }}
                    href="/ResetPassword"
                  >
                    Reset Password
                  </a> */}
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Form>
      </div>
    );
  }
}

title.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
};

title.defaultProps = {
  title: "User Profile",
};
title = Form.create()(title);
export default title;
