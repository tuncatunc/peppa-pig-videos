import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WebPlayer from './WebPlayer'
import GlobalStyle from '../styles/GlobalStyle'

const App = props => (
  // The video player will be deployed to root folder
  // Otherwise set <BrowserRouter basename='subfolder name'>
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={WebPlayer}></Route>
      <Route exact path='/:activeVideo' component={WebPlayer}></Route>
    </Switch>
    <GlobalStyle />
  </BrowserRouter>
)

export default App
