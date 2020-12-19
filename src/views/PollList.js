import React from "react";
import { Container, Button } from "shards-react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { Table } from "reactstrap";
import {  Modal, ModalBody, ModalHeader } from "shards-react";
import axios from "axios";

class PollList extends React.Component {
    constructor(props) {
        super(props);
        this.state={

          name:"",
          email:"",
          sapID:"",
          department:"",
          isLoading:true ,
        pulls:[]
        }
       
    }
    componentDidMount() {
      this.fetchData();
    }


    fetchData()
    {
      const headers = {
        headers: {
        token: localStorage.getItem('token')
        }
      };
      const data = {
       name : this.state.name,
        email: this.state.email,
        sapID: this.state.sapID,
        department:  this.state.department,
        
      
        
      };
      axios.get(`https://03ddc0f96685.ngrok.io/vlock/user`, headers,data)
      //  console.log("header")
    
      .then((res) => {
       
        console.log("RESPONSE = ", res.data.data);
      this.setState({ isLoading:false,pulls:res.data.data });
      console.log(this.state.pulls);
    
    
        console.log(res.message);
       
      });
    
    
    
    }
    
  render() {
    const {pulls} =this.state;
    

    return (
    
      <div>
          <br/>
        <h3 style={{ marginLeft: "400px" }}>Poll List</h3>
       
        <div
          style={{ marginBottom: "10px" }}
          className="d-flex justify-content-center"
        ></div>
        <Table striped>
          <thead>
            <tr style={{ backgroundColor: "#85DBE9" }}>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Sap Id</th>
              <th>Department</th>
              <th></th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pulls.map((values,index)=>{
              return(
 <tr key={index}>
 <th scope="row">{index + 1}</th>
            <td>{values.name}</td>
              <td>{values.email }</td>
              <td>{values.sapID }</td>
              <td>{values.department}</td>

 
</tr>

              )
            })}
           

       
            
          </tbody>
          
        </Table>
        {/* <b>  <Button style={{marginTop:"30px",marginLeft:"420px" }} color= "#031738"  >Create New Poll</Button></b>  */}
      
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
     
     </div>
     

    );
  }
}

const mapStateToProps = (PollList) => {
  return { PollList };
};

export default PollList;
