import React from 'react'
import Loader from 'react-loader-spinner'

export default class Loader1 extends React.Component {
 //other logic
   render() {
    return(
        <div className='loaderS'>
            <Loader
                type="TailSpin"
                color="#00d2d2"
                height={50}
                width={50}
                timeout={null} //3 secs

            />
        </div>
    );
   }
}
