import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
    <Container fluid={contained}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <br/>
              <NavLink tag={Link} to={item.to}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Row>
    </Container>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "",
  menuItems: [
    // {
    //   title: "Home",
    //   to: "#"
    // },
    // {
    //   title: "Services",
    //   to: "#"
    // },
    // {
    //   title: "About",
    //   to: "#"
    // },
    // {
    //   title: "Products",
    //   to: "#"
    // },
    // {
    //   title: "Blog",
    //   to: "#"
    // }
  ]
};

export default MainFooter;
