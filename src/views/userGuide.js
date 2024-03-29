import { NavLink } from "react-router-dom";
import React from "react";
import { Container, Button } from "shards-react";
import ReactPlayer from "react-player";

import { ImCross, ImCheckmark } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { Table } from "reactstrap";
import * as moment from "moment";
import { IoMdCreate } from "react-icons/io";
import getToken from "../helpers/auth";
import { AiOutlineEye } from "react-icons/ai";
import { Spinner } from "reactstrap";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Loader from "react-loader-spinner";

class CastVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollType: "",
      startDate: "",
      endDate: "",
      status: "",
      createdBy: "",
      isLoading: true,
      pulls: [],
      _id: "",
      index: "",
    };
  }

  render() {
    const { pulls } = this.state;
    // if (this.state.loading) return <Loader />;
    const { match } = this.props;

    return (
      <div>
        <br />
        <h4 style={{ marginLeft: "350px", color: "black" }}>
          How To Import Your Private Key{" "}
        </h4>

        <center>
          {" "}
          <br />
          <ReactPlayer
            controls
            url="https://youtu.be/_-eu_g_aG_U"
          />
        </center>
      </div>
    );
  }
}

const mapStateToProps = (CastVote) => {
  return { CastVote };
};

export default CastVote;
