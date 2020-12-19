import React from "react";

import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button,
} from "shards-react";

class Candidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",

    };
    
  }

  onUserRegister() {
    
    console.log(this.state);
  };

  
  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col md="6" className="form-group">
              <label htmlFor="">Email Adress</label>
              <FormInput
               
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e)=> {this.setState({email:e.target.value})}}
              />

              <Col md="6" className="form-group">
                <label htmlFor="">Name</label>
                <FormInput
                 
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={(e)=> {this.setState({name:e.target.value})}}
                />

                <Button onClick={()=>this.onUserRegister()}>Click me!</Button>
              </Col>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }

  
}

export default Candidate;
