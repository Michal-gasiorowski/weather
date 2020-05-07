import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'weather-icons/css/weather-icons.css'
import 'weather-icons/css/weather-icons-wind.min.css'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import img7 from './7.jpg'

const API_key = "fb5683d6b3a699793194088bd3706fbe"
//const city = "London"

const Input = ({value, onChange, onSubmit, status}) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <input type="text" id="city-input" name="input" value={value} onChange={onChange} />
      <button type="submit" value="Wyślij">OK</button>
      <p className="error">{status}</p>
    </form>
  )
}

class WeatherApp extends React.Component {
  constructor(){
    super()
    this.state = {
      input: "Krakow",
      wait: false,
      city: undefined,
      temp: undefined,
      tempOdczuwalna: undefined,
      min: undefined,
      max: undefined,
      preasure: undefined,
      rain: undefined,
      country: undefined,
      weather: undefined,
      icon: undefined,
      wind: undefined,
      windSpeed: undefined,
      status: "Wpisz nazwę miasta",
      visible: false,
      tlo: img1,
      opacity: 1,

    // city: "Krakow",
    // temp: "7.42",
    // tempOdczuwalna: "2.24",
    // min: "6.67",
    // max: "8.33",
    // pressure: "1014",
    // rain: "2.29",
    // country: "PL",
    // weather: "moderate rain",
    // icon: "501",
    // wind: "270",
    // windSpeed: "6.2",
    // status: "Wpisz nazwę miasta",
    // visible: false,

    }
    //this.handleChange =this.handleChange.bind(this);
    //this.handleClick =this.handleClick.bind(this);
   // this.getWeather();
  }

  //API FETCH
  getWeather = async () => {
    
    
    try{ const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=metric&appid=${API_key}`
    );
    const response = await api_call.json();
    
    
    let rain = 0
      if (response.rain !== undefined){
        rain = response.rain["1h"]
      }

    this.setState({

      status: "Sukces!",
      opacity: 0,
      
    })

    

    setTimeout(() => { 
      let backimg
      if(response.weather[0].id >= 200){backimg = img2}
      if(response.weather[0].id >= 300){backimg = img3}
      if(response.weather[0].id >= 500){backimg = img4}
      if(response.weather[0].id >= 600){backimg = img5}
      if(response.weather[0].id >= 700){backimg = img6}
      if(response.weather[0].id >= 801){backimg = img7}
      
      this.setState({
        city: response.name,
        temp: response.main.temp,
        tempOdczuwalna: response.main.feels_like,
        min: response.main.temp_min,
        max: response.main.temp_max,
        pressure: response.main.pressure,
        rain: rain,
        country: response.sys.country,
        weather: response.weather[0].description,
        icon: response.weather[0].id,
        wind: response.wind.deg,
        windSpeed: response.wind.speed,
        
        tlo: backimg,
        opacity: 1,
        visible: true,
      })
     }, 1000);

  }catch(e){
    this.setState({
      status: "ERROR (prawdopodobnie api jest chwilowo niedostępne)"
    });
  }    
  }
  
    //INPUT CHANGE
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
   
    //console.log(this.state.input)
  }

  //SUBMIT BUTTON / API FETCH
   onSubmit = (event) => {
    
  

    if(!this.state.wait){
      this.getWeather();
    }else{
      this.setState({
        status: "Poczekaj 5 sekund..."
      });
    } 
    
    this.setState({
      wait: true
    });

    setTimeout(() => {
      this.setState({
        wait: false,
        status: "Wpisz nazwę miasta"
      });
    },5000)
        
    event.preventDefault();
  }
  
  //RENDER
  render(){
    
    
    
    return(
    <div id="main">
      <div id="background" style={{
        backgroundImage: `url(${this.state.tlo}`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: this.state.opacity,
        }}>
      </div>
    <div id="container">
    
    <Input onChange={this.handleChange} value={this.state.input} onClick={this.handleClick} button={this.state.input} onSubmit={this.onSubmit} status={this.state.status}/>
    <App 
      city={this.state.city} 
      temp={this.state.temp} 
      country={this.state.country} 
      icon={this.state.icon} 
      max={this.state.max} 
      min={this.state.min}
      pressure={this.state.pressure}
      rain={this.state.rain}
      tempOdczuwalna={this.state.tempOdczuwalna}
      weather={this.state.weather}
      wind={this.state.wind}
      windSpeed={this.state.windSpeed}
      visible={this.state.visible}
      opacity={this.state.opacity}
    />
    </div>
    </div>
    )
  }

}

ReactDOM.render(

  <WeatherApp />,

  document.getElementById('root')
);


