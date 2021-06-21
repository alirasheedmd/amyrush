import React from "react"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" id="productCard">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="productImage" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <strong>${product.price}</strong>
        </Card.Text>
        <Card.Text as="div">
          <Rating value={product.rating} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
