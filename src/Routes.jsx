import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './component/Home'
import NotFound from './component/404'


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)


export default Routes
