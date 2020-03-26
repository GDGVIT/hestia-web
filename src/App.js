import React from 'react';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';
import Login from "./components/login";
import Register from "./components/register";
import Nav from "./components/nav";
import Home from "./components/home";
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
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/home' component={Nav}/>

        </div>
      </BrowserRouter>

    )
  }
}

export default App;
