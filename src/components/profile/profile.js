import React from 'react';
import Nav from '../nav';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current: null
        }
    }

    render(){
        return(
            <div>
                Profile Page
            <Nav />
            </div>

        );
    }
}
export default Profile;
