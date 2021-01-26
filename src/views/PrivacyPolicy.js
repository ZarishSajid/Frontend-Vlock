import React from "react";
import { Input, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";
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
        <MDBRow
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:
              "url('https://techcrunch.com/wp-content/uploads/2017/10/gettyimages-844081956.jpg?w=730&crop=1')",
          }}
        >
          <Card
            sm
            className="mb-4"
            style={{
              height: "40rem",
              width: "50rem ",
              marginTop: "30px",
              marginLeft: "250px",
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
                <center>Terms & Conditions</center>
              </h4>
            </CardHeader>
            <CardBody>
              <ListGroup flush>
              <p style={{color:"black"}}> By submitting this, user agrees to be bound by these Terms and Conditions. </p>
             <p  style={{color:"black"}} >1- University has the right to active or inactive your poll incase of violation of the rules</p>
              <p  style={{color:"black"}}>2-Your poll should not contain inappropriate content otherwise University has the right to block or disapprove your poll</p>
              <p  style={{color:"black"}}>3 -In case of having any issue regarding the content of the poll you are voting, please send email to the teamvlock@gmail.com</p>
              <p  style={{color:"black"}}>4- If you have any issue in updating your profile, you can contact admin via email.</p>
              <p  style={{color:"black"}}>5- It is mandatory to watch user guide before casting any vote</p>
              </ListGroup>
              <center><NavLink
                        to={{
                          pathname: "/Register",
                        }}
                      >
              <Button
                style={{ marginTop: "20px" }}
                type="secondary"
              >
                Back
              </Button>
              </NavLink>
              </center>
            </CardBody>
           
          </Card>

          </MDBRow>
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
