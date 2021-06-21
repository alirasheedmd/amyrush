import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Table, Row, Col } from "react-bootstrap"
import Loader from "../components/Loader"
import { LinkContainer } from "react-router-bootstrap"
import { getOrders } from "../actions/orderActions"
import Message from "../components/Message"

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)

  const { loading, error, order } = orderList

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Is Paid</th>
                <th>Is Delivered</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  {order.isPaid ? (
                    <td>
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    </td>
                  ) : (
                    <td>
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    </td>
                  )}
                  {order.isDelivered ? (
                    <td>
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    </td>
                  ) : (
                    <td>
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    </td>
                  )}
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light">Details</Button>
                  </LinkContainer>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default OrderListScreen
