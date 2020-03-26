import React from 'react';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';
import Login from "./components/login";
import Feed from "./components/feed";
import News from "./components/news";
import Register from "./components/register";
import Nav from "./components/nav";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
      redirect: null
    }
  }

  componentDidMount(){
    console.log(this)
  }

  navtoggle(){
    return(<Nav />)
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <BrowserRouter> 
        <div className="App">
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/feed' component={Feed}/>
          <Route path='/news' component={News}/>
          <Route path='/chat' component={Chat}/>
          {this.navtoggle()}
        </div>
      </BrowserRouter>

    )
  }
}

export default App;
