import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NavMenu from './components/Navigation'
import PostList from './components/PostList'
import BlogPost from './components/BlogPost'
import AuthorPage from './components/Author'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <NavMenu />
      <div>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/author/:username" component={AuthorPage} />
        </Switch>
      </div>
    </div>
  )
}

export default App
