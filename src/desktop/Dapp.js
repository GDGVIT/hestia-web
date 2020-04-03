import React from 'react';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, Redirect, withRouter, Switch} from 'react-router-dom';
import './dapp.css';
import Dlog from './dlog';
import Dmain from './main';
import Register from './dregister';
import Aboutus from './aboutus';
import Orgs from '../orgs'

class Dapp extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    page404 = () =>{
        return(<div>This page does not exist</div>)
      }
    render(){
        return(
            <BrowserRouter>
                <div className="Dapp">
                    <Switch>
                        <Route exact path='/' component={Aboutus}/>
                        <Route exact path='/main' component={Dmain}/>
                        <Route exact path='/dlogin' component={Dlog}/>
                        <Route exact path='/dregister' component={Register}/>
                        <Route exact path='/organisations' component={Orgs}/>
                        <Route component={this.page404}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Dapp;