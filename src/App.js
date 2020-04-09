import React from 'react';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, Redirect, withRouter, Switch} from 'react-router-dom';
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
import Mychat from './components/profile/mychats';
import Myreqs from './components/profile/myreqs';
import Edit from './components/profile/edit';
import Sap from './components/sap';
import Suggestions from './components/profile/suggestions';
import Aboutus from './aboutus';
import Orgs from './orgs'
import POrgs from './page404'


import { loadReCaptcha } from 'react-recaptcha-v3';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      showNav: false
    }
    // console.log(props)
  }
  componentDidMount(){
    if(localStorage.getItem("token")){
      this.setState({
        showNav: false
      })
  }
  loadReCaptcha('6LdiB-UUAAAAACYC2AlMS9hrw18fQA4FK7-s0LDw');
  }
  page404 = () =>{
    // this.props.history.push("/")
    return(<div>This page does not exist</div>)
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
        <Switch>
          <Route exact path='/' component={Aboutus}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/chat' component={Chat}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/feed' component={Feed}/>
          <Route exact path='/news' component={News}/>
          <Route exact path='/report' component={Report}/>
          <Route exact path='/mychats' component={Mychat}/>
          <Route exact path='/myreqs' component={Myreqs}/>
          <Route exact path='/edit' component={Edit}/>
          <Route exact path='/suggestashop' component={Sap}/>
          <Route exact path='/suggestions' component={Suggestions}/>
          <Route exact path='/organisations' component={Orgs}/>
          <Route component={POrgs}/>
          </Switch>
          {this.showNav()}
        </div>
      </BrowserRouter>

    );
  }
}

export default withRouter(App);
