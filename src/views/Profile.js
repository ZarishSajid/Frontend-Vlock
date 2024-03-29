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
      email: localStorage.getItem("email"),
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
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
        };
        console.log("name in profile", localStorage.getItem("name"));
        console.log("email in profile", this.email);
        console.log(
          "department in profile",
          localStorage.getItem("department")
        );

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
              localStorage.setItem("name", formData.name);

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
                      <FormItem
                        style={{ color: "red" }}
                        // onChange={(name) => this.setState({name })}
                        label={
                          <Text style={{ fontWeight: "bold", color: "black" }}>
                            Full Name
                          </Text>
                        }
                      >
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
                              message: "Full Name is Required",
                            },

                            // {
                            //   validator: (rule, value, callback) => {
                            //      if (!value.match(/^[a-zA-Z]+$/)) {
                            //       callback("Alphabets only");
                            //     }
                            //     return callback();
                            //   }
                            // }
                          ],
                          initialValue: this.state.name,
                        })(<Input placeholder=" Full Name" />)}
                      </FormItem>
                      <br />
                      <FormItem
                        style={{ color: "red" }}
                        label={
                          <Text style={{ fontWeight: "bold", color: "black" }}>
                            Email
                          </Text>
                        }
                      >
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              type: "email",
                              message: "Please enter valid E-mail",
                            },
                            {
                              required: true,
                              message: "Email is Required",
                            },
                          ],
                          initialValue: this.state.email,
                        })(<Input placeholder=" abc@gmail.com" type="email" />)}
                      </FormItem>
                      <br />
                      <br />
                      <FormItem
                        style={{ color: "red" }}
                        label={
                          <Text style={{ fontWeight: "bold", color: "black" }}>
                            Department
                          </Text>
                        }
                      >
                        {getFieldDecorator("department", {
                          rules: [
                            {
                              required: true,
                              message: "Department is Required",
                            },
                          ],
                          initialValue: this.state.department,
                        })(
                          <Input
                            placeholder=" Please enter your department"
                            type="text"
                          />
                        )}
                      </FormItem>

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
