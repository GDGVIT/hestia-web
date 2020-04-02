import React from 'react';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, Redirect, withRouter} from 'react-router-dom';
import './dapp.css';
import Dlog from './dlog';
import Dmain from './main';
import Register from './dregister'

class Dapp extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <BrowserRouter>
                <div className="Dapp">
                    <Route exact path='/main' component={Dmain}/>
                    <Route exact path='/dlogin' component={Dlog}/>
                    <Route exact path='/dregister' component={Register}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Dapp;