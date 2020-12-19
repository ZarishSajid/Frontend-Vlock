import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = () => (
  
  <Card small className="mb-3"  style={{height:"300px"}}>
    <CardBody>
      <Form className="add-new-post">
        <b style={{color:"black"}}>Description</b>
        <FormInput size="lg" className="mb-3" placeholder="" />
      
        {/* <ReactQuill className="add-new-post__editor mb-1" /> */}

      </Form>
    </CardBody>
  </Card>
);

export default Editor;
