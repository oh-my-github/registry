import React from 'react'
import { Route, IndexRoute, } from 'react-router'

import App from './components/App'
import ProfilePage from './containers/ProfilePage'
import NotFoundPage from './components/NotFoundPage'
import AboutPage from './containers/AboutPage'

export default (
  <Route path="/registry" component={App}>
    <IndexRoute component={ProfilePage} />
    <Route path="/registry" component={ProfilePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/*" component={NotFoundPage} />
  </Route>
)
