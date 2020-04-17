import React from 'react';
import logo from './assets/logo.png';
import explore from './assets/explore.png';
import feed from './assets/feed.png';
import news from './assets/news2.png';
import Akina from './assets/akina.apk';


const Aboutus = (props) =>{
    return(
        <div className="parent">
        <div className="logo">
            <img alt="logo" src={logo}></img>
        </div>
        <div className="what">
            <h2>Why Akina?</h2><br/>
            <h4>The way the world is right now, everyone needs help. Amidst all the chaos, we wanted to bring everyone some positivity with Akina, a platform we built to deal with various issues people are facing right now. Akina is your one-stop to get the latest updates from the World Health Organisation, to request for anything that you need and let the community help you. Akina aims to aid people by bringing them a platform to elevate individuals to become a community.</h4>
        </div>
           
        <div className="buttons">
                    <div className="button1">
                        <button onClick={()=>{props.history.push("/login")}}>Visit Website</button>
                        <p style={{marginTop:"10px",cursor:"pointer",color:"#989898"}} onClick={()=>{props.history.push("/login")}}>PWA available on the web app.</p>
                    </div>
                    <div className="button2">
                        <a className="download" href={Akina} download="Akina">Download App</a>
                        <p className="covid">Due to Covid-19 our app is taking some time to process on the Play Store, meanwhile you can download it from our server.</p>
                    </div>
                </div>
        <div className="features">
            <h2>Features</h2>
        </div>
        <div className="parent1">
        <div className="feed">
        <div className="feedlogo">
            <div className="circle">
                <img alt="logo" src={feed}></img>
            </div>
            <div className="text">
                <h3>Feed</h3>
            </div>
        </div>
        {/* <div className="border"></div> */}
        <div className="content">
            <h5>The go-to place for everyone that needs help with supplies and wants to help out others in need of supplies. This section displays a continuous list of resources people around you are in need of as well as an option for you to add your requests. For the listed requests, you can either suggest a shop that can supply the resource or help them out yourself if you have some to spare. When a request is accepted, Akina provides a chat room between the requestor, the person who made the request, and the requestee, the person willing to help, to coordinate and facilitate communication.
            </h5>
        </div>
        
        </div>
        <div className="feed">
            <div className="feedlogo1">
            <div className="text" style={{paddingRight:"10px"}}>
                    <h3>News</h3>
                </div>
                <div className="circle1">
                    <img alt="logo" src={news}></img>
                </div>
            </div>
            {/* <div className="border2"></div> */}
            <div className="content">
                <h5 className="content1">One of the most important issue, to tackle during this time of crisis, is to stay informed but various sources spreading misinformation makes it very difficult to decide which resource is legitimate. Hence, we only bring you official news from The World Health Organisation to make sure each update we give you is credible.</h5>
            </div>
            </div>
        </div>
        <div className="features">
            <h2>Upcoming Features</h2>
        </div>
        <div className="what">
            <h4>The times are changing and with them so our the needs of everyone around the world. To make sure we stay ahead, we have a few features that we are working hard to bring them to you as soon as possible.</h4>
        </div>
        <div className="parent1">
            <div className="feed">
                <div className="feedlogo">
                    <div className="circle2">
                        <img alt="" src={explore}></img>
                    </div>
                    <div className="text">
                        <h3>Explore</h3>
                    </div>
                </div>
            {/* <div className="border3">&nbsp;</div> */}
            <div className="content">
                <h5>In times of need, trying to find resources is not only difficult but stressful as well. The explore section brings you a list of resources, active organizations around you to help you get what you need with the least effort right when you need them.
                </h5>
            </div>
            
            </div>
            <div className="feed">
                <div className="feedlogo1">
                <div className="text" style={{paddingRight:"10px"}}>
                        <h3>Updates</h3>
                    </div>
                    <div className="circle1">
                        <img alt="logo" src={news}></img>
                    </div>
                </div>
                {/* <div className="border2">&nbsp;</div> */}
                <div className="content">
                    <h5 className="content1">We are actively finding sources, apart from W.H.O. For credible information and integrating them into the platform to provide information relevant not just to the global scope but to you as an individual.</h5>
                </div>
                </div>

                       <div className="what">
        <h4>We’d also like to mention that our project is completely open-source and we would welcome any Pull Requests that can help us to drive this project forward. You can find all our project repositories <a href="https://github.com/GDGVIT/akina">here</a>.</h4>
    </div>  
        

        
                <div className="buttons">
                    <div className="button1">
                        <button onClick={()=>{props.history.push("/login")}}>Visit Website</button>
                        <p style={{marginTop:"10px",cursor:"pointer",color:"#989898"}} onClick={()=>{props.history.push("/login")}}>PWA available on the web app.</p>
                    </div>
                    <div className="button2">
                        <a className="download" href={Akina} download="Akina">Download App</a>
                        <p className="covid">Due to Covid-19 our app is taking some time to process on the Play Store, meanwhile you can download it from our server.</p>
                    </div>
                </div>
                <div className="features">
                    <h2>Contact Us</h2>
                </div>
                <div className="what" style={{marginBottom:'50px'}}>
                    <h4>We are all ears for any suggestions and feedback that you might have for us. Please reach out to us on <a href="mailto:akina.dscvit@gmail.com">akina.dscvit@gmail.com</a> for anything you want to say.</h4>
                </div>
        
        
            </div>



            <div className="team-heading">
        <h1 style={{color:"#00d2d2"}}>The Team</h1>
            </div>
    <div className="nj">
    <div className="kid">
      <div className="row">
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
        <div className="col">
            <div className="photo">
                <img src="./assets/nirmit.jpeg"/>
            </div>
            <div className="content">
                <h4>Name</h4>
                <h5>Role</h5>
            </div>
        </div>
      </div>
    </div>
</div> 






        </div>
        
        
        
        
        );
}

export default Aboutus;