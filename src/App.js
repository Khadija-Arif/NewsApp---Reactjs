import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom'
export default class App extends Component {
  apiKey = "Your api key"
  pageSize=15;
  render() {
    return (
      <div>
       <BrowserRouter>
         
        <Navbar/>
       
        <Routes>
            <Route exact path='/' element={<News apiKey= {this.apiKey} key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path='/business' element={<News apiKey= {this.apiKey} key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route exact path='/science' element={<News apiKey= {this.apiKey} key="sciecne" pageSize={this.pageSize} country="us" category="science" />} />
            <Route exact path='/technology' element={<News apiKey= {this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
            <Route exact path='/sports' element={<News apiKey= {this.apiKey} key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route exact path='/health' element={<News apiKey= {this.apiKey} key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route exact path='/entertainment' element={<News apiKey= {this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
