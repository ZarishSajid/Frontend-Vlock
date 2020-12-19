import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import Link from "@material-ui/core/Link";
import { Redirect, NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//  import { createHashHistory } from "history";
import { history } from "react-dom";
import { Form } from "antd";
import axios from "axios";
import { Typography } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Select, Input } from "antd";
const FormItem = Form.Item;
const { Option } = Select;
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);
const { Text } = Typography;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onRedirect = this.onRedirect.bind(this);

    this.state = {
      //    SapId: "2284",
      //  password: "admin",
    };
  }
  onRedirect = () => {
    console.log("clicked");

    // const history = createHashHistory();
    // const history = useHistory();
    //  history.go("/components/Admin");
    this.props.history.push("/components/Admin");

    //  history.push("/components/Admin");
  };

  // change = e => {
  //   this.setState({
  //       [e.target.name]: e.target.value
  //   });
  // }
  // submitForm = (e) => {
  //   e.preventDefault();
  //   this.props.OnsubmitForm(this.state);
  // }

  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  render() {
    return (
      <MDBRow
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage:
            "url('https://techcrunch.com/wp-content/uploads/2017/10/gettyimages-844081956.jpg?w=730&crop=1')",
        }}
      >
        <MDBCard
          className="card-image"
          style={{
            marginTop: "20px",
            marginLeft: "270px",
            width: "15rem",
            height: "700px",
            //#00008B
            backgroundColor: "#2980B9 ",
          }}
        >
          <h4 style={{ marginTop: "50px", color: "white", marginLeft: "20px" }}>
            Lock Your Decision
          </h4>
          {/* <p style={{color:"white",marginLeft:"20px"}}>Please enter your credientials to login.If you are not a  member.</p> */}

          <NavLink to={"/Register"}>
            <p style={{ color: "white", marginLeft: "20px" }}>
              {" "}
              Please register Yourself.
            </p>
          </NavLink>
        </MDBCard>

        <MDBCard
          className="card-image"
          style={{
            marginTop: "20px",
            textColor: "blue",
            textColor: "black",
            marginLeft: "0px",
            width: "32rem",
          }}
        >
          {/* <form  onSubmit={this.submitForm.bind(this)}> */}
          <div className="text-blue rgba-stylish-strong py-5 px-5 z-depth-4">
            <div className="text-center">
              <h3 className="blue-text mb-5 mt-4 font-weight-bold">
                {/* <Avatar style={{marginLeft:"190px",color:"white",backgroundColor:"#f58742"}}  >
             <LockOutlinedIcon />
         </Avatar> */}
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1"
                  style={{
                    maxWidth: "80px",
                    height: "75px",
                    color: "blue",
                    marginRight: "100px",
                  }}
                  src={require("../../src/images/shards-dashboards-orignal.svg")}
                  alt="VLock"
                />
                <h4 style={{ marginLeft: "0px", color: "Black" }}>
                  Reset Password
                </h4>
                <a href="#!" className="green-text font-weight-bold"></a>
              </h3>
            </div>
            <br />
            <br />
            <PhoneInput
              country={"us"}
              value={this.state.phone}
              onChange={(phone) => this.setState({ phone })}
            />

            <br />

            <center>
              {" "}
              <NavLink to={`/components/Admin`}>
                <p style={{ color: "white", marginLeft: "30px" }}>
                  {" "}
                  Please register Yourself.
                </p>
                <MDBBtn
                  style={{ width: "180px" }}
                  onClick={() => this.onRedirect()}
                  color="primary"
                  rounded
                >
                  Reset
                </MDBBtn>
              </NavLink>
            </center>
            <br />
            {/* 
                </div>
                
              </MDBRow> */}
          </div>

          {/* </form> P*/}
        </MDBCard>
      </MDBRow>
    );
  }
}
