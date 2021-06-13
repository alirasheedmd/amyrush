import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("")
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push(`/`)
    }
  }

  return (
    <Form id="search" inline onSubmit={submitHandler}>
      <Form.Group controlId="searchBox">
        <Form.Control
          type="text"
          name="search"
          value={keyword}
          className="mr-sm-2 ml-sm-5 serach-input"
          placeholder="Search Products..."
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
        />
      </Form.Group>
    </Form>
  )
}

export default SearchBar
