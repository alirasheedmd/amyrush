import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux" // useSelector will display the products on the screen
import Product from "../components/Product"
import { Row, Col } from "react-bootstrap"
import { listProducts } from "../actions/productAction"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, products, pages, page, error } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber)) // this will fireoff the productAction.js (listProduct that will fetch data)
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
