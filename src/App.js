import React from 'react';


function App({opacity, visible, city, temp, country, icon, max, min, pressure, rain, tempOdczuwalna, weather, wind, windSpeed}) {
  let AppHeight
  let AppPadding
  if(visible){
    AppHeight = "720px"
    AppPadding = "10px"
  }
  return (
    <div className="Appback">
    <div className="App" style={{height: AppHeight, padding: AppPadding, opacity: opacity}}>
      <h1>{city}, {country}</h1>
      <h2>{temp}&deg;</h2>
      <i className= {`wi wi-owm-${icon} size`} ></i>
      <div className="odczuwalna">Temperatura odczuwalna: <b>{tempOdczuwalna}&deg;</b></div>
      <div className="minimalna">Temp minimalna: <b>{min}&deg;</b> maksymalna: <b>{max}&deg;</b></div>
      <div className="cisnienie">Ciśnienie: <b>{pressure} hPa</b></div>
      <div className="wiatr">Wiatr: <i className= {`wi wi-wind from-${wind}-deg`} ></i> <b>{windSpeed} m/s</b></div>
      <div className="opady">Opady: <b>{rain} mm</b></div>

      
    </div>
    </div>
  );
}

export default App;
