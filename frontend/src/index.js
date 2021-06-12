import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import "./index.scss"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import "./bootstrap.min.css"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
serviceWorker.unregister()
