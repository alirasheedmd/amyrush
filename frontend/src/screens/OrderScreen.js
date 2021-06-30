import React, { useEffect, useState } from "react"
import { PayPalButton } from "react-paypal-button-v2"
import { Link } from "react-router-dom"
import { Col, Row, ListGroup, Image, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions"
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderContants"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState({ loading: false, loaded: false })

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
    if (!sdkReady.loaded && !sdkReady.loading) {
      const addPaypalScript = () => {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = `https://www.paypal.com/sdk/js?client-id=AZ-UpfjafBihGkp0AQ29VofI0btcI5M8HBeBCi6gHI2zNrJOydXBncAdHnpKCeTDdMMfeRYzxrmFLRAf`
        script.async = true
        script.onload = () => {
          setSdkReady({ loading: true, loaded: false })
        }
        document.body.appendChild(script)
      }
      sdkReady.loading && addPaypalScript()
      setSdkReady({ loading: false, loaded: true })
    } else {
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      setSdkReady({ loading: false, loaded: false })
      dispatch(getOrderDetails(orderId))
    } else {
    }
  }, [
    dispatch,
    orderId,
    successPay,
    order,
    successDeliver,
    sdkReady.loaded,
    userInfo,
    history,
  ])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const orderDelivered = { isDelivered: true }

  const orderDeliverHandler = () => {
    dispatch(deliverOrder(orderId, orderDelivered))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Your order is {order._id}</h5>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {order.user.name}</strong>
              </p>
              <p>
                <strong>
                  Email:
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </strong>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalcode},{" "}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            {order.isDelivered ? (
              <Message variant="success">Order is Delivered</Message>
            ) : (
              <Message variant="danger">Order not delivered</Message>
            )}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {order.paymentMethod}
            </ListGroup.Item>
            {order.isPaid ? (
              <Message variant="success">Order is Paid</Message>
            ) : (
              <Message variant="danger">Order Not Paid</Message>
            )}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady.loaded ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                      className="zindex"
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver ? (
                <Loader />
              ) : !order.isDelivered && userInfo.isAdmin ? (
                <Button onClick={orderDeliverHandler} variant="light">
                  Mark as delivered
                </Button>
              ) : (
                <></>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
