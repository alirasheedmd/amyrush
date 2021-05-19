import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

//@description Create Product
//@route post /api/products/:id
//@access public

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    price,
    image,
    description,
    rating,
    numReviews,
    countInStock,
  } = req.body

  const product = new Product({
    user: req.user._id,
    name,
    brand,
    category,
    price,
    image,
    description,
    countInStock,
    rating,
    numReviews,
  })
  const createdProduct = await product.save()
  if (createdProduct) {
    res.status(201).json(createdProduct)
  }
})

//@description Update Product
//@route put /api/products
//@access private admin

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = req.body.name || product.name
    product.brand = req.body.brand || product.brand
    product.category = req.body.category || product.category
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image
    product.description = req.body.description || product.description
    product.countInStock = req.body.countInStock || product.countInStock
    product.rating = req.body.rating || product.rating
    product.numReviews = req.body.numReviews || product.numReviews

    const updatedProduct = await product.save() // after we save user in database it will return the updateduser so we will save it to a variable.

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not Found")
  }
})

//@description Fetch all products
//@route GET /api/products when you put question mark in the url it can be accessed with query
//@access public

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, // we are using regex becuase when some one type ip we need iphone to come up
          $options: "i",
        },
      }
    : {}
  const products = await Product.find({ ...keyword })

  res.json(products)
})

//@description Fetch a single product
//@route GET /api/products:id
//@access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

//@description Delete product by ID
//@route GET /api/products/:id/delete
//@access private/ admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product Removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

//@description Create Product Review
//@route POST /api/products/:id/reviews
//@access private/ admin

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    //We will check if the user has already given review.
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(404)
      throw new Error("Product Already Reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    //Now we will push the object we created in the reviews array of the product that we crated
    product.reviews.push(review) //

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numReviews

    await product.save()
    res.status(201).json({ message: "Review Added" })
  } else {
    res.status(404)
    throw new Error("Cannot Create Review")
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
}
