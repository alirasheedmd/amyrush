import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../actions/userActions"
import { useHistory, Route } from "react-router-dom"
import SearchBar from "./searchBar"
import { listProductsCategoryList } from "../actions/productAction"

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCategoryList = useSelector((state) => state.productCategoryList)
  const { categories } = productCategoryList

  const history = useHistory()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    history.push("/")
  }
  useEffect(() => {
    dispatch(listProductsCategoryList())
  }, [dispatch])

  return (
    <header id="header">
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
        className="main-header"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                className="logo"
                src="https://res.cloudinary.com/magwatt/image/upload/v1623513426/AmyRush_fckowm.png"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBar history={history} />} />
          <Navbar.Toggle
            className="main-menu"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto ">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar className="menu" expand="lg">
        <Container>
          <Nav>
            {categories.map((category) => (
              <Nav.Link href={`/search/category/${category}`} key={category}>
                {category}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
      <div className="menu-mobile">
        <ul className="category-list">
          {categories.map((category) => (
            <li className="category-item" key={category}>
              <a href={`/search/category/${category}`}>{category}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
