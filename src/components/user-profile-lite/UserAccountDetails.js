import React from "react";
import { Input } from "reactstrap";

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
import { Form ,Typography} from "antd";
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
      name: "",
      email: "",
      password: "",
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
        };
        axios
          .put(`http://localhost:8080/vlock/update`, data, headers)

          .then((res) => {
            console.log("RESPONSE = ", res);
            console.log(res.message);
            if (res.data.success) {
              alert("Updated Sucessfully");
            } else {
              //  console.log("else")
              alert(res.data.message);
            }
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
      <Form onSubmit={this.onRedirect}>
        <Card
          small
          className="mb-4"
          style={{ height: "400px", width: "40rem ", marginTop: "30px" }}
        >
          <CardHeader className="border-bottom"></CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                <FormItem
                style={{ color: "red" }}
                label={
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Name
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
                  <b />
                  <b>
                    {" "}
                    <Button
                      style={{ marginTop: "0px" }}
                      onClick={() => this.onRedirect()}
                      color="primary"
                      theme="accent"
                    >
                      Update
                    </Button>
                  </b>

                  <a
                    style={{
                      color: "primary",
                      textDecorationLine: "underline",
                      marginLeft: "300px",
                    }}
                    href="/ResetPassword"
                  >
                    Reset Password
                  </a>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Form>
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
