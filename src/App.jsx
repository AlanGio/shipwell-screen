import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import Routes from './Routes'
import Layout from './component/Layout'


// This file was auto generated previously using SASS preprocessor
// This import allows the app to have css control, hash it to prevent chache conflicts
// And do some build process like minification, autoprefixer, etc
import './assets/css/app.css'


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  </Provider>
)


export default App
