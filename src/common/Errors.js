import React from "react";
import { Container, Button } from "shards-react";
import {components} from 'react'
import {Link } from 'react-router-dom';
import Admin from "../views/Admin";

const Errors = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <h3>Not Found!</h3>
        <p>This is page is not present. Please try again later.</p>
        <Link to={`/login`}><Button pill>&larr; Go Back</Button></Link>
        {components/Admin}
      </div>
      </div>
  </Container>
);

export default Errors;
