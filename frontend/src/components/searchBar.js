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
    <Form inline onSubmit={submitHandler}>
      <Form.Group controlId="searchBox">
        <Form.Control
          type="text"
          name="search"
          value={keyword}
          className="mr-sm-2 ml-sm-5"
          placeholder="Search Products..."
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
        />
      </Form.Group>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBar
