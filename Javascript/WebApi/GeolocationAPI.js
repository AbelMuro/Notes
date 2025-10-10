/* 
    The Geolocation API is a way of getting the users current location in latitude and longitude, keep in mind that the browser will
    always ask permission from the user before attaining their location
*/

  if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  else
      console.log('Geolocation is not supported by your browser');


const showPosition = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.long; 
}

const showError = (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
      }
    }
