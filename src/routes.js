import React from 'react'
import { Route, IndexRoute, } from 'react-router'

import App from './components/App'
import ProfilePage from './containers/ProfilePage'
import AboutPage from './components/AboutPage'
import NotFoundPage from './components/NotFoundPage'

export default (
  <Route path="/registry" component={App}>
    <IndexRoute component={ProfilePage} />
    <Route path="/registry" component={ProfilePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/*" component={NotFoundPage} />
  </Route>
)
