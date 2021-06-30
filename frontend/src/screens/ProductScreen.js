import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap"
import Rating from "../components/Rating"
import Message from "../components/Message"
import {
  createProductReview,
  listProductDetails,
} from "../actions/productAction"
import { addToCart } from "../actions/cartActions"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productContants"
import Meta from "../components/Meta"

const ProductScreen = ({ history, match }) => {
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { error: errorReviewCreate, success: successReviewCreate } =
    productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [qty, setQty] = useState(1)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (successReviewCreate) {
      alert("Review Submitted")
      setRating(0)
      setComment("")
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    } else {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successReviewCreate])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    history.push("/cart")
  }
  const review = { rating, comment }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(review, match.params.id))
  }

  return (
    <Container>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-2">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="primary">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>
                      Name: {review.name} <br />
                    </strong>
                    <Rating value={review.rating} />
                    Review: {review.comment}
                    <p>{review.createdAt.slice(0, 10)}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>

          {userInfo && (
            <Row>
              <Col md={6}>
                {errorReviewCreate && (
                  <Message variant="danger">{errorReviewCreate}</Message>
                )}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <h4>Write A Cutomer Review</h4>
                    <Form.Label>Ratings</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select ...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Submit Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                    />
                  </Form.Group>
                  <Button type="submit">Submit</Button>
                </Form>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  )
}

export default ProductScreen
