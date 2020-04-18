import React from 'react'
import {Line, Pie} from 'react-chartjs-2'
import back from '../assets/back.png'
import { Card, Row, Col, Radio, Select } from 'antd'
import { formatCountdown } from 'antd/lib/statistic/utils';
import NumberFormat from 'react-number-format';

const { Option } = Select;


export default class Stats extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fullstat:{
                        "case":[],
                        "recovered":[],
                        "deaths":[],
                        "globalData": {
                            "recentCase": 'loading',
                            "recentDeath": 'loading',
                            "recentRecovered": 'loading',
                            "totalCases": 'loading'
                        } 
                    },
            dataPie:[],
            dataPie2:[],
            dataLine1:[],
            dataLine2:[],
            dataLine3:[],
            chosen:'world',
            allCountries:[],
            selected: 'india',
            currentCountry:[]
        }
    }

    setChartData = (chartD) =>{
        this.setState({
            dataPie:{
                labels: ['Active', 'Recovered', 'Deceased' ],
                datasets:[
                {
                    data:[
                        chartD.recentCase,
                        chartD.recentRecovered,
                        chartD.recentDeath
                    ],
                    backgroundColor:[
                    '#ffdd86',
                    '#1fd9d9',
                    '#ff589c',
                    ]
                }
                ]
            }
        })
    }

    setLineData = (sike) =>{
        let dates1 = [],
            counts1 = [],
            dates2 = [],
            counts2 = [],
            dates3 = [],
            counts3 = [],
            i = 0,
            j=0,
            k=0;
        sike.case.forEach(units=>{
            dates1[i] = "";
            counts1[i] = units.count;
            i+=1;
        })
        sike.recovered.forEach(units=>{
            dates2[j] = "";
            counts2[j] = units.count;
            j+=1;
        })
        sike.deaths.forEach(units=>{
            dates3[k] = "";
            counts3[k] = units.count;
            k += 1;
        })

        this.setState({
            dataLine1:{
                  
                labels:dates1,
                datasets:[
                {   
                    data:counts1,
                    backgroundColor:[
                    'rgba(255,221,134, 0.3)',
                    ],
                    pointBackgroundColor:'transparent',
                    pointBorderColor:'transparent',
                    borderColor:'#ffdd86'    
                }
                ]
            },
            dataLine2:{
                  
                labels:dates2,
                datasets:[
                {   
                    data:counts2,
                    backgroundColor:[
                    'rgba(31,217,217, 0.3)',
                    ],
                    pointBackgroundColor:'transparent',
                    pointBorderColor:'transparent',
                    borderColor:'#1fd9d9',
                }
                ]
            },
            dataLine3:{
                  
                labels:dates3,
                datasets:[
                {   
                    data:counts3,
                    backgroundColor:[
                    'rgba(255,88,156, 0.3)',
                    ],
                    pointBackgroundColor:'transparent',
                    pointBorderColor:'transparent',
                    borderColor:  '#ff589c'  
                }
                ]
            }
        })
    }


// COMPONENT DID MOUNT
    componentDidMount(){
        fetch('https://hestia-info.herokuapp.com/stats',{
            method: 'GET'
        })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            this.setState({
                fullstat: data.time_series
            })
            this.setChartData(data.time_series.globalData);
            this.setLineData(data.time_series)

        })
        .catch(error=>console.error(error))
        fetch('https://hestia-info.herokuapp.com/allCountries',{
            method:'GET'
        }) 
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                allCountries: data.allCountries
            })
        })
        .catch(error=>{
            error?console.log(error):(console.log(''));
        })

        fetch(`https://hestia-info.herokuapp.com/allCountriesData/${this.state.selected}`,{
            method: 'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.countryData)
            this.setState({
                currentCountry: data.countryData,
                dataPie2:{
                    labels: ['Active', 'Recovered', 'Deceased' ],
                    datasets:[{
                        data:[
                                data.countryData.active,
                                data.countryData.recovered,
                                data.countryData.deaths
                            
                        ],
                        backgroundColor:[
                        '#ffdd86',
                        '#1fd9d9',
                        '#ff589c',
                        ]
                    }]
                    
                }
            })
            console.log(this.state.currentCountry)
            console.log(this.state.dataPie2)
        })
        .catch(err0r=>console.error(err0r))
    }




    goBack=()=>{
        this.props.history.push('/news')
    }

    handleRadio =(e)=>{
        // console.log(e)
        this.setState({
            chosen: e.target.value
        })
    }

    // SEARCH DROPDOWN SELECT FUNCTIONS
    onChange=(value)=>{
        this.setState({
            selected: value
        })
        console.log(`selected ${value}`);
        fetch(`https://hestia-info.herokuapp.com/allCountriesData/${value}`,{
            method: 'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.countryData)
            this.setState({
                currentCountry: data.countryData,
                dataPie2:{
                    labels: ['Active', 'Recovered', 'Deceased' ],
                    datasets:[{
                        data:[
                                data.countryData.active,
                                data.countryData.recovered,
                                data.countryData.deaths
                            
                        ],
                        backgroundColor:[
                        '#ffdd86',
                        '#1fd9d9',
                        '#ff589c',
                        ]
                    }]
                    
                }
            })
            console.log(this.state.currentCountry)
            console.log(this.state.dataPie2)
        })
        .catch(err0r=>console.error(err0r))



      }
      
    onBlur=()=>{
        console.log('blur');
      }
      
    onFocus=()=>{
        console.log('focus');
      }
      
    onSearch=(val)=>{
        console.log('search:', val);
      }
    // SEARCH DROPDOWN SELECT END






    render(){

        var {allCountries} = this.state;
        var theOptions = allCountries?(allCountries.map(data=>{
            return(<Option key={data} value={data}>{data}</Option>)
        })):(<Option key="loading" value="loading">loading</Option>);

        var {chosen} = this.state;
        var dataToDisp = chosen==='world'?(
            <div>
            <div>
            <Card key="total" className="profcard">
            <Row gutter={10} className="statCase">
                    <Col span={16}>
                        <div className="statNum" style={{textAlign:'left'}}>Total Cases</div>
                    </Col>
                    <Col span={8}>
                        <div className="statNum" style={{color:"#00d2d2"}}>
                            {/* {this.state.fullstat.globalData.recentTotalCases.toLocaleString(undefined, { minimumFractionDigits: 0 })} */}
                            {/* {this.format(this.state.fullstat.globalData.recentTotalCases)} */}
                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value = {this.state.fullstat.globalData.recentTotalCases} />
                            </div>
                    </Col>
            </Row>
            </Card>
            <Card key="cases" className="profcard">
                 <Row gutter={10} className="statCase">
                    <Col span={8} style={{borderRight:"1px solid lightgray"}}>
                        <div className="statNum" style={{color:"#ffdd86"}}>
                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value =  {this.state.fullstat.globalData.recentCase} />
                            </div>
                        <div className="statType">Active</div>
                    </Col>
                    <Col span={8} style={{borderRight:"1px solid lightgray"}}>
                        <div className="statNum" style={{color:"#00d2d2"}}>
                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value = {this.state.fullstat.globalData.recentRecovered} />
                            </div>
                        <div className="statType">Recovered</div>
                    </Col>
                    <Col span={8}>
                        <div className="statNum" style={{color:"#ff589c"}}>
                        <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value =  {this.state.fullstat.globalData.recentDeath} />
                            </div>
                        <div className="statType">Deceased</div>
                    </Col>
                </Row>
               
            </Card>

            </div>
 
            <div className="chartHolder">
                <Pie
                    data={this.state.dataPie}
                    options={{ 
                        maintainAspectRatio: false,
                        legend:{
                            display:false
                        }
                    }}
                
                /> 
                <div className="chart-legenD">
                    <div>
                        <div className="casesBG" style={{backgroundColor:'#ffdd86'}}></div>
                        <span className="percent">
                        {parseFloat(100*this.state.fullstat.globalData.recentCase/(this.state.fullstat.globalData.recentCase+this.state.fullstat.globalData.recentRecovered+this.state.fullstat.globalData.recentDeath)).toFixed(2)}%
                        </span>
                    </div>
                    <div>
                        <div className="casesBG" style={{backgroundColor:'#00d2d2'}}></div>    
                         <span className="percent">
                        {parseFloat(100*this.state.fullstat.globalData.recentRecovered/(this.state.fullstat.globalData.recentCase+this.state.fullstat.globalData.recentRecovered+this.state.fullstat.globalData.recentDeath)).toFixed(2)}%
                        </span>
                    </div>
                    <div>
                        <div className="casesBG" style={{backgroundColor:'#ff589c'}}></div>    
                         <span className="percent">
                        {parseFloat(100*this.state.fullstat.globalData.recentDeath/(this.state.fullstat.globalData.recentCase+this.state.fullstat.globalData.recentRecovered+this.state.fullstat.globalData.recentDeath)).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
            <div style={{textAlign:'center', marginTop:'50px', marginBottom:'20px'}}><h1>Trend Plots</h1></div>
            <div style={{textAlign:'center', marginTop:'50px', marginBottom:'20px'}}><h3 style={{color:'#ffdd86'}}>Total Cases</h3></div>
            <Line
                    data={this.state.dataLine1}
                    options={{ 
                        maintainAspectRatio: false,
                        legend:{
                            display:false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display:false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display:false
                                }   
                            }]
                        }
                    }}
                
                /> 
            <div style={{textAlign:'center', marginBottom:'20px'}}><h3 style={{color:'#1fd9d9'}}>Time</h3></div>
            
            <div style={{textAlign:'center', marginTop:'50px', marginBottom:'20px'}}><h3 style={{color:'#1fd9d9'}}>Recovered</h3></div>
            <Line
                    data={this.state.dataLine2}
                    options={{ 
                        maintainAspectRatio: false,
                        legend:{
                            display:false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display:false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display:false
                                }   
                            }]
                        }
                    }}
                
                /> 
            <div style={{textAlign:'center', marginBottom:'20px'}}><h3 style={{color:'#ffdd86'}}>Time</h3></div>

            <div style={{textAlign:'center', marginTop:'50px', marginBottom:'20px'}}><h3 style={{color:'#ff589c'}}>Deaths</h3></div>
            <Line
                    data={this.state.dataLine3}
                    options={{ 
                        maintainAspectRatio: false,
                        legend:{
                            display:false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display:false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display:false
                                }   
                            }]
                        }
                    }}
                
                /> 
            <div style={{textAlign:'center', marginBottom:'20px'}}><h3 style={{color:'#ff589c'}}>Time</h3></div>
        </div>
            ):(
            <div className="countryCss">
                <Select
                showSearch
                placeholder="Select a country"
                optionFilterProp="children"
                defaultValue='India'
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
            {theOptions}
            </Select>
            <div style={{marginTop:'20px'}}>
                <Card key="total" className="profcard">
                <Row gutter={10} className="statCase">
                        <Col span={19}>
                            <div className="statNum" style={{textAlign:'left'}}>Total Cases</div>
                        </Col>
                        <Col span={5}>
                            <div className="statNum" style={{color:"#ffdd86"}}>
                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value =  {this.state.currentCountry.cases} />
                            </div>
                        </Col>
                </Row>
                </Card>
                <Card key="cases" className="profcard">
                    <Row gutter={10} className="statCase">
                        <Col span={8} style={{borderRight:"1px solid lightgray"}}>
                            <div className="statNum" style={{color:"#ffdd86"}}>
                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value = {this.state.currentCountry.active} />
                            </div>
                            <div className="statType">Active</div>
                        </Col>
                        <Col span={8} style={{borderRight:"1px solid lightgray"}}>
                            <div className="statNum" style={{color:"#00d2d2"}}>
                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value = {this.state.currentCountry.recovered} />
                            </div>
                            <div className="statType">Recovered</div>
                        </Col>
                        <Col span={8}>
                            <div className="statNum" style={{color:"#ff589c"}}>
                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value = {this.state.currentCountry.deaths} />
                            </div>
                            <div className="statType">Deceased</div>
                        </Col>
                    </Row>
                
                </Card>

            </div>
            <div className="chartHolder">
                <Pie
                    data={this.state.dataPie2}
                    options={{ 
                        maintainAspectRatio: false,
                        legend:{
                            display:false
                        }
                    }}
                
                /> 
                               <div className="chart-legenD">
                    <div>
                        <div className="casesBG" style={{backgroundColor:'#ffdd86'}}></div>
                        <span className="percent">
                        {parseFloat(100*this.state.currentCountry.active/(this.state.currentCountry.active+this.state.currentCountry.recovered+this.state.currentCountry.deaths)).toFixed(2)}%
                        </span>
                    </div>
                    <div>
                        <div className="casesBG" style={{backgroundColor:'#00d2d2'}}></div>    
                         <span className="percent">
                        {parseFloat(100*this.state.currentCountry.recovered/(this.state.currentCountry.active+this.state.currentCountry.recovered+this.state.currentCountry.deaths)).toFixed(2)}%
                        </span>
                    </div>
                    <div>
                        <div className="casesBG" style={{backgroundColor:'#ff589c'}}></div>    
                         <span className="percent">
                        {parseFloat(100*this.state.currentCountry.deaths/(this.state.currentCountry.active+this.state.currentCountry.recovered+this.state.currentCountry.deaths)).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
            </div>
            );
        return(
        <div>
             <div className="main-title">    
                <Row>
                    <Col span={24}>
                    <div className="imgbacc">
                            <img src={back} alt="back to feed" onClick={this.goBack}></img>
                        </div>
                        <h1 style={{ 'fontSize':'24px', paddingTop:'8px', textAlign:'left'}}>Statistics</h1>
                    </Col>
                    {/* <Col span={6}>
                    <img onClick={this.gotoProfile} src={profile} alt="Profile logo"></img>
                    </Col> */}
                </Row>
            </div>
            <div className="radioz">
            <Radio.Group defaultValue={this.state.chosen} buttonStyle="solid" onChange={this.handleRadio}>
                    <Radio.Button value="world">World</Radio.Button>
                    <Radio.Button value="country">Country</Radio.Button>
            </Radio.Group>
            </div>
        {dataToDisp}
        </div>
        )
    }
}



