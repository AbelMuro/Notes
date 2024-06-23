//==================================GOOGLE MAPS WITH REACT================================================================
// REMEMBER: to use the google object from the window object, you HAVE to install google maps api
// window = {google: {maps: {...}}}
//as with every pre defined object, it has its set of functions and properties

// to install google maps into your react application, just use...
// npm install @react-google-maps/api

import React, {useCallback, useState} from 'react';
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from '@react-google-maps/api';


const center = {                            //if you are going to pass an object to panTo or setCenter
    lat: 44,                                //make sure it has these two properties
    lng: -80
};

const customMap = [
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{visibility: "off"}]
    },
    {
        featureType: "poi",
        stylers: [{visibility: "off"}]
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{visibility: "off"}]
    },
    {
        featureType: "transit",
        stylers: [{visibility: "off"}]
    }
];





function MyGoogleMap() {
    //the map state can be used to change the current position of the map with event handlers
    const [map, setMap] = useState(/** @type google.maps.Map */(null));    

    // <GoogleMaps onLoad={(map)=>{setMap()}}> </GoogleMaps>                // onLoad property will initialize the map state

    //useLoadScript will load the <script src="https://maps.googleapis.com....."> </script> in the html file
    const [libraries] = useState(["places"])                                //this library is used with the Autocomplete component
    const {isLoaded} = useLoadScript({  
        googleMapsApiKey: "API_KEY",
        libraries
    });



//---------------------------------------------(1) GEOCODING---------------------------------------------------------------------
   //RE-POSITIONING THE MAP BASED ON USER INPUT BY GEOCODING THE PHYSICAL ADDRESS INTO LATITUDE AND LONGITUDE
    const addressRef = useRef();

    const geocoding = () => {
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({address: addressRef.current.value}, (results, status)=> { //geocode will translate an address into longitude and latitude 
            if(status == "OK"){
                map.setCenter(results[0].geometry.location); //using setCenter() to recenter the map based on the results of the geocoding  
                var marker = new google.maps.Marker({        //you can dynamically create a marker like this on the google map            
                    position: results[0].geometry.location,  //position of the marker
                    map: map                                 //state map that 'contains' the actual google map
                })
                map.setZoom(15);                              //you can specify a specific map zoom here 
                // results[0]                                 // results[] is an array of objects that contain all the different results of the geocoding
                // results[0].geometry                        // geometry is an object that contains properties such as location
                // results[0].geometry.location               // location contains the latitude and the longitude
            }
            else
                alert("Address is invalid")
        })
    }

    // <button type="button" onClick={geocoding}> Click Here </button>







//------------------------------------------------ (1.5) REVERSE GEOCODING-------------------------------------------------------------
    // CONVERTING A LATITUDE AND LONGITUDE INTO A PHYSICAL ADDRESS

    const reverseGeocode = useRef();                            //this object will contain the human readable address of a latitude and longitude

    //if you want to call with function dynamically, make sure to make this function into ASYNC/AWAIT
    function reverseGeocoding(lat_lng) {
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({location: lat_lng}, (results, status)=>{          //geocode is an asynchronous function, meaning that javascript will NOT wait until this function finishes
            if(status == "OK")
                reverseGeocode.current = results[0].formatted_address;
            else
                reverseGeocode.current = "not a valid address";
        })
    }

    //reverse geocoding is mostly used for google maps api methods that need a latitude and longitude from user input
    //normally, people will just input a physical address in a text input box, so we use reverse geocoding to use the latitude and longitude 
    //from the physical address







//---------------------------------------------- (2) CALCULATING ROUTE BETWEEN TWO LOCATIONS --------------------------------------------------------------------
    //CALCULATING THE ROUTE BETWEEN TWO LOCATIONS
    //keep in mind that route() returns a promise

    const [directions, setDirections] = useState(null);                     //state object that will contain the directions between two locations
    const [distance, setDistance] = useState('');                           //these state objects are being used in the comments below the functions
    const [duration, setDuration] = useState('');
    const originRef = useRef("");                                           //originRef will reference an input element, we will use that reference to get the text inputed by the user
    const destinationRef = useRef("");

    async function calculateRoute() {
        const directionService = new google.maps.DirectionsService();       //DirectionsService() is a constructor that returns an object with pre defined methods that let us calculate a route
        
        let results = await directionService.route({                        //route() will calculate the route between the origin and the destination
            origin: originRef.current.value,                                //start of the route
            destination: destinationRef.current.value,                      //end of the route
            travelMode: google.maps.TravelMode.DRIVING                      //TravelMode = {DRIVING, BICYCLE, WALKING, ETC...}
        })
        setDirections(results);                                             //setting the directions state with the results that contain the actual route
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text)
        // results.routes[0]                                                //routes is an array that contains all the different routes calculated by route()
        // results.routes[0].legs[0]                                        //legs is an array that contains all the stopover waypoints or destinations specified
        // results.routes[0].legs[0].distance                               //each 'leg' is an object that contains info about the calculated route
        // results.routes[0].legs[0].duration                               //each 'leg' has properties like distance and duration 
        // results.routes[0].legs[0].distance.text                          //text returns a string that contains a human readable distance/duration                                                                      
    }
    
    function clearRoute() {
        setDirections(null);   
        setDistance("");
        setDuration("");
        originRef.current.value = "";                                       //removing the text from the input box
        destinationRef.currentvalue = "";                                   //removing the text from the input box
    }
    // <div> Distance is: {distance}</div>
    // <div> duration is: {duration}</div>
    // <input type="text" ref={originRef}/>                              
    // <input type="text" ref={destinationRef}/>
    // <button type="button" onClick={calculateRoute}> Calculate Route </button>
    // <button type="button" onClick={clearRoute}> Clear Route </button>
    // <GoogleMaps> <DirectionsRenderer directions={directions} /> </GoogleMaps>






//----------------------------------------------- (3) GEOLOCATING-------------------------------------------------------------------
    //GETTING THE USERS LOCATION AND MOVING THE MAP TO THAT LOCATION

    const usersLocation = useRef()                                      //its a good idea to store the users location in a local object

    const moveToUsersLocation = () => {
        if(!navigator.geolocation) {                                    //navigator.geolocation will return false if the browser does not support it
            alert("geolocation is not supported by your browser");
            return; 
        }
        else{                                                           //navigator is another object that is a part of the global object window
            navigator.geolocation.getCurrentPosition((position) => {    //getCurrentPosition will get the position of the device used to view the app   
                let currentPosition = {                                 //position is an object that contains a coord object with the latitude and longitude
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                usersLocation.current = currentPosition                 //storing the users location in this object                  
                map.setCenter(currentPosition);                         //storing the latitude and longitude in an object and passing it to setCenter()
                var marker = new google.maps.Marker({                   //creating a new marker based on the position of the user's device
                    position: currentPosition,
                    map: map                                            
                })
                map.setZoom(15)                                         //setting the zoom 
            },                                                                                          
            () => {                                                     //this second callback is an error handler
                alert("unable to retrieve your location")
                return;
            })
        }
    }



//------------------------------------------------- (4) NEARBY SEARCH-----------------------------------------------------------------------------------------------------------
//SEARCHING FOR NEARBY RESTAURANTS, GROCERY STORES, BUSINESSES, ETC..., BASED ON THE USERS CURRENT LOCATION

//keep in mind that if you want to search for nearby places of a location that is specified through an input text box,
//you will want to use a geocoding function with async/await, because nearbySearch() only accepts an object with latitude and longitude
const searchNearbyRestaurants = () => {
    let request = {
        location: {lat: -34, lng: 45},                                      //current location of the device/user
        radius: 500,                                                        //radius of the area in which to look for the businesses
        keyword: "McDonald's"                                               //name of the businesses that we want to look for
        //type: "store"                                                     //you can also search for nearby business by using the type property, 
    }                                                                       //   but keep in mind that you must remove 'keyword' property
    let places = new google.maps.places.PlacesService(map)                  //calling the PlacesServices constructor
    places.nearbySearch(request, (results, status)=>{                       //nearbySearch will search the map for any businesses that has the keyword in request object
        if(status != "OK") return;                                                 
        results.forEach((result)=>{                                         //results is an array containing all the places found nearby the choosen location
            //result contains data about the location (place_id, name, latitude, longitude )
        })
      
    })
}



//------------------------------------------------- (5) MARKERS ------------------------------------------------------------------------------------------------------------------
//keep in mind that if you want to create markers dynamically, 
//you will need to geocode the users input into latitude and longitude 
//before using the function below

//by adding the map state to the Marker constructor, the marker will automatically appear on the map
function createMarkers() {
    let marker = new google.maps.Marker({                                   //creating a marker with the Marker() constructor
        position: {lat: 44, lng: -10},                                      //this constructor only accepts an object with latitude and longitude
        map: map,                                                            //passing the state object
        title: "location"                                                   //this is what will appear when you hover over the marker
    })

    marker.addListener("click", () => {                                     //you can use addListener to handle events
        //usually, you want to use getDetails() to get info about the marker selected
    })

}


//----------------------------------------------------- (6) GET DETAILS OF A LOCATION -------------------------------------------------------------------------------
//getDetails() will enable you to obtain data from a specific location
//keep in mind that getDetails() is asynchronous, so if you want
//to call this function dynamically, you want to use AYNC/AWAIT

function getLocationDetails() {
    let placeService = new google.maps.places.PlacesService(map);
    placeService.getDetails({
        placeId: "u29ghauwhubd98",                            //you must specify the place id of a specific location                          
        fields: ["name", "photos", "opening_hours", "utc_offset_minutes", "vicinity", "rating"] //properties of the location that we want to obtain
        },
        (place, status) => {                                       //place is an object containing all the data of the location
            if(status != "OK") return;
            let locationData = {                                  //storing the data of the location into an object
                name: place.name,
                image: place.photos[0].getUrl(),
                address: place.vicinity,
                rating: place.rating,
                openHours: place.opening_hours.isOpen(),
            }
        }
    )
}






//-----------------------------------------------------------------------------------------------------------------
//keep in mind that you should use global objects that contain lat and lng
    return isLoaded ? (
        <>
        {/*Remember that you can include the tags below inside the GoogleMap tags */}
{/*1*/}<input type="text" ref={addressRef}/>        {/* this will reposition the map based on user input */}
{/*1*/}<button type="button" onClick={geocoding}> Click here </button>  {/* this will call the event handler that will use user input to calculate the re-position*/}

{/*2*/}<input type="text" ref={originRef}/>           {/*Getting user input to calculate the origin of the */}                    
{/*2*/}<input type="text" ref={destinationRef}/>
{/*2*/}<button type="button" onClick={calculateRoute}>Calculate Route</button>
{/*2*/}<button type="button" onClick={clearRoute}> Clear Route</button>

{/*3*/}<button type="button" onClick={moveToUsersLocation}></button>

        <Autocomplete className="someClass">            {/* you can also apply some css to Autocomplete */}
            <input type="text" />                      {/*this input box will now have autocomplete (remember not to include {} inside <Autocomplete >)*/}
        </Autocomplete>
        <GoogleMap 
            mapContainerStyle={mapContainer}            //you can pass an object that contains css properties that define the way the map will render
            mapContainerClassName={".class"}            //you can pass a class name from a css file that will define the way the map will render
            center={{lat: 44, lng: -80}}                //center is the initial position of the map, you must pass an object with the two properties lat and lng
            zoom={10}                                   //zoom is the initial zoom when the map is loaded onto the DOM
            onLoad={(map)=>{setMap(map)}}               //when the google map loads, it will initialize the map state
            options={{                                  //these properties are used to remove the default options that control the map
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: false,
                stlyles: customMap,                      //you can also include a custom map made from a different website, just convert the JSON into valid javascript
            }}>
        
            
                {/* These are all the child components for GoogleMap*/}
                <Marker icon={{
                        url: "http://maps.gstatic.com/mapfiles/markers2/icon_green.png",
                        scaledSize: new google.maps.Size(50,50),    //setting the size of the new marker
                        anchor: new google.maps.Point(5,5)           //not sure what this property does
                    }} position={{lat: 44, lng: -80}}/>             {/* Marker will position a marker on the map based on the position property*/}

                {directions && 
/*2*/                  <DirectionsRenderer directions={directions}/> } {/* Directions Renderer is used to calculate routes*/}
        </GoogleMap>         
        </>

    ): (<div>is loading...</div>);                                   {/* you can create a loading screen here*/}
}
