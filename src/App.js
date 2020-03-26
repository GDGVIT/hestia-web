import React from 'react';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';
import Login from "./components/login";
import Feed from "./components/feed";
import News from "./components/news";
import Register from "./components/register";
import Nav from "./components/nav";
<<<<<<< HEAD
=======
import Home from "./components/home";
import Chat from "./components/chat/chats";
>>>>>>> 35955e87945b72e9759f99e7454e34addbc295b9

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
<<<<<<< HEAD
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/feed' component={Feed}/>
          <Route path='/news' component={News}/>
          {this.navtoggle()}
=======
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/home' component={Nav}/>
          <Route exact path='/chat' component={Chat}/>
>>>>>>> 35955e87945b72e9759f99e7454e34addbc295b9
        </div>
      </BrowserRouter>

    )
  }
}

export default App;
