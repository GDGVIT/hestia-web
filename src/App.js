import React from 'react';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, Redirect, withRouter} from 'react-router-dom';
import './App.css';
import Login from "./components/login";
import Register from "./components/register";
import Nav from "./components/nav";
import Home from "./components/home";
import Chat from "./components/chat/chats";
import Profile from "./components/profile/profile";
import Feed from "./components/feed";
import News from "./components/news";
import Report from './components/report';
import { loadReCaptcha } from 'react-recaptcha-v3'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      showNav: false
    }
    console.log(props)
  }
  componentDidMount(){
    if(localStorage.getItem("token")){
      this.setState({
        showNav: false
      })
  }
  loadReCaptcha('6LdiB-UUAAAAACYC2AlMS9hrw18fQA4FK7-s0LDw');
  }
  showNav(){
    if(this.state.showNav){
      return(<Nav />);
    }else{
      return(null);
    }
  }
  render(){
    return(
      <BrowserRouter> 
        <div className="App">
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/chat' component={Chat}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/feed' component={Feed}/>
          <Route exact path='/news' component={News}/>
          <Route exact path='/report' component={Report}/>

          {this.showNav()}
        </div>
      </BrowserRouter>

    );
  }
}

export default withRouter(App);
