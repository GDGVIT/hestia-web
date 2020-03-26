import React from 'react'
import logo from '../assets/group_5.png';
import { Link } from 'react-router-dom';
import { Button } from 'antd';


const Home = () =>{
    return(
        <div>
            <img src={logo} alt="Hestialogo"></img>
            <div>
                
                <Link to="/login">
                    <Button type="primary">
                        Login
                    </Button>
                </Link>
                
                <Link to="/register">
                    <Button type="primary">
                        Register
                    </Button>
                </Link>

            </div>
        </div>
    );
}
export default Home;