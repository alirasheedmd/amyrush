import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <div id="footer">
      <footer id="large-screen">
        <Container>
          <Row>
            <Col className="text-center py-3">Copyright &copy; AmyRush</Col>
          </Row>
        </Container>
      </footer>
      <footer id="small-screen">
        <div className="footer-icons-list">
          <div className="item">
            <i className="footer-icon fas fa-home"></i>
            <br />
            <span className="item-text">Home</span>
          </div>
          <div className="item">
            <i className="footer-icon fas fa-shopping-bag"></i>
            <br />
            <span className="item-text">Home</span>
          </div>
          <div className="item">
            <i className="footer-icon fas fa-tag"></i>
            <br />
            <span className="item-text">Home</span>
          </div>
          <div className="item">
            <i className=" footer-icon far fa-user-circle"></i>
            <br />
            <span className="item-text">Home</span>
          </div>
          <div className="item">
            <i className=" footer-icon fas fa-store"></i>
            <br />
            <span className="item-text">Home</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
