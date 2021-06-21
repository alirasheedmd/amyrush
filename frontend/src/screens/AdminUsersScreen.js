import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Table, Row, Col } from "react-bootstrap"
import { deleteUser, getAllUsers } from "../actions/userActions"
import Loader from "../components/Loader"
import { LinkContainer } from "react-router-bootstrap"

const AdminUsersScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: deleteSuccess } = userDelete

  const usersList = useSelector((state) => state.usersList)
  const { loading, users } = usersList
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers())
    } else {
      history.push("/")
    }
  }, [dispatch, history, deleteSuccess, userInfo])

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : (
        <Table bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default AdminUsersScreen
