//==================================================== GOOGLE CLOUD ============================================================================

/* 
    Google cloud is a service that provides cloud computing. Google has a number of data centers around the globe, 
    these data centers have computers, disk drives and virtual resources that can be utilized by other developers to 
    build a website, software or server for their business or organization.

    In other words, if a small business wants to deploy a server for their company, they can use google cloud
    to host their servers, because google already has the hardware (in their data centers) required to maintain and contain servers
    Developers dont need their own physical hardware or computer to host the server 24/7 when they have google cloud.


    INSTALLING GOOGLE CLOUD CLI

	- For windows only, download the google cloud CLI (https://cloud.google.com/sdk/docs/install)
	
		gcloud init

	- For macOS only, run the following commands to install google cloud CLI
	
	        brew install google-cloud-sdk
	        gcloud init

*/










//================================================= GOOGLE CLOUD COMPUTE ENNGINE ===================================================================
/* 
	Compute Engine is a service that provides Virtual Machines (VM) that allow you to customize the hardware of the virtual machine to meet your needs (CPU, memory, etc)
 	Typically, you can use these VM's to run a server on a different computer that is maintained by google. Keep in mind that a server has to be running on a computer 24/7.


	0) Go to Google Compute Engine in your Google Cloud Console and click on create new instance (take note of the instance name and the zone)

  	1) You can access the terminal of the VM in google compute engine -> Go to VM instances, then click on the SSH of the instance
	   You can also access the terminal of the VM in your local computers' terminal by using the following command 
    	  (keep in mind that the terminal will have a different username, and you wont have permissions to change the files of other users unless you use sudo as a prefix to all of your commands)

		 gcloud compute ssh INSTANCE_NAME --zone=ZONE_NAME

 	2) A terminal should pop up in your computer, then run the following commands.

    		sudo apt update										// updates the package index
		sudo apt install curl -y								// install curl
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash		// installs nvm
		nvm install 21.6.1									// installs node.js version 21.6.1
  		nvm run 21.6.1									        // we run the current version of node.js
		sudo apt install git -y									// installs gitbash
		git clone YOUR_REPO_URL								 	// clones your repo
		cd YOUR_PROJECT_FOLDER									// changes directory to the folder that has the clone
  
		nano ~/.bashrc										// open  the shell configurations file and put the env variables at the very end of the file
  			export VARIABLE_NAME="value"				
		        export VARIABLE_NAME="value"
		        export VARIABLE_NAME="value"							// once you're done writing the env variables, press ctrl + o to 'write out' the file, then exit
	  	source ~/.bashrc									// save and reload the file

		npm install										// installs all dependencies for the app
		npm start 										// runs the app in the cloud


		-if you are having permission issues running npm start, run the following commands
  			sudo apt-get install libcap2-bin 						// installs the libcap2-bin package that is used to manage linux capabilities such as permissions
			sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` 		// Grant Node.js permission to bind to privileged ports (like port 443)... The setcap command allows Node.js to bind to such ports without needing to run as root.


	3) You must buy a domain for your server/website, go to ionos.com and then buy a domain
  	    When you buy a domain, the website will provide you with a SSL certificate and Key file
       	    save these files in your repository


  	4) To run node.js app with HTTPS you must first configure your app to use HTTPS

   		const express = require('express');
		const https = require('https');
   		const path = require('path');
     		const fs = require('fs');

     		const app = express();   
       		const privateKeyFilePath = path.join(__dirname, '../SSL/private.key');			//you can generate these files with certbot, or obtain them from a registrar that lets you buy domains (ionos, google domains, etc..)
		const certificateFilePath = path.join(__dirname, '../SSL/certificate.crt'); 

		const options = {
		    key: fs.readFileSync(privateKeyFilePath),
		    cert: fs.readFileSync(certificateFilePath),
		}

		https.createServer(options, app).listen(443, (error) => {
		    if(error){
		        console.log('HTTPS error occurred: ', error);
		        return;
		    }
		    console.log('HTTPS server is running on port 443')
		})

  	 5) Run the following command to enable https traffic to the VM 

   		gcloud compute firewall-rules create allow-https --allow tcp:443
     		gcloud compute firewall-rules list

	       NAME NETWORK 	DIRECTION 	PRIORITY 	ALLOW 	DENY 	DISABLED 
	       allow-http 	default 	INGRESS 	1000 	tcp:80 	False 
	       allow-https 	default 	INGRESS 	1000 	tcp:443 False 
	       default-allow-http default 	INGRESS 	1000 	tcp:80 	False 
	       default-allow-https default 	INGRESS 	1000 	tcp:443 False 			//just make sure that this line appears in your list of firewall rules
	       default-allow-icmp default 	INGRESS 	65534 	icmp 	False 
	       default-allow-internal default 	INGRESS 	65534 	tcp:0-65535,udp:0-65535,icmp 	False 
	       default-allow-rdp default 	INGRESS 	65534 	tcp:3389 	False 
	       default-allow-ssh default 	INGRESS 	65534 	tcp:22 	False

	      	   -You can also change the firewall rules for the VM by configuring the VPC network of the VM
		  	Go to Compute Engine -> VM instances -> On the VM instance, click on the 3 dots on the far right -> view network details -> Network interface details, click on the Network option -> firewalls




*/














//================================================= GOOGLE CLOUD RUN ===========================================================================
/*
    Google cloud run is a service that is used to deploy serverless functions and websites


//-------------------------- DEPLOY NODE.JS with CLOUD RUN -------------------------------------------------

          
    1) Use Docker to create an image of your node.js app (look at docker notes for more info)

    1.5) Create a cloudbuild.yaml file in the root directory of your repository

    steps:
	- name: 'gcr.io/cloud-builders/npm'
	  args: ['install']
	- name: 'gcr.io/cloud-builders/npm'
	  args: ['run', 'build']
	- name: 'gcr.io/cloud-builders/docker'
	  args: ['build', '-t', 'gcr.io/PROJECT-ID/ANY-NAME', '.']			//you can get the PROJECT-ID from the google cloud console, from the top right corner.
	- name: 'gcr.io/cloud-builders/docker'
	  args: ['push', 'gcr.io/PROJECT-ID/ANY-NAME']
	- name: 'gcr.io/cloud-builders/gcloud'
	  args:
	   - 'run'
	   - 'deploy'
	   - 'PROJECT-ID'
	   - '--image'
	   - 'gcr.io/PROJECT-ID/ANY-NAME'
	   - '--region'
	   - 'us-central1'
	   - '--platform'
	   - 'managed'
	  images:
	  - 'gcr.io/PROJECT-ID/ANY-NAME'
	  env:
	   - 'API_KEY=12345657'
	   - 'accountname=whatever'

    2) gcloud auth login                                                            //login with google
    
    3) Run the following commands 
    
        docker tag name-of-image gcr.io/PROJECT_ID/name-of-image                    // you can get PROJECT_ID from the google console 
        docker push gcr.io/PROJECT_ID/name-of-image                                 // This will uploade the image to the Google Artifact registry

        //if you have an issue with authorization, run the following command
        gcloud auth configure-docker

    4) Then go to 'Google Cloud Run' and then click on Deploy Container (click on 'service' in the dropdown)

    5) Select Docker Hub and Artifact Registry
       In the 'Container Image Url', click on select, and find the image that you uploaded on the Artifact Registry
       In 'Containers, Volumes, Networking, Security', select 'Variables & Secrets' and put your env variables there
       
    6) Click on Create
       
*/ 











//=================================================== GOOGLE LOGIN ====================================================================

/* 
    You will need to create a client Id for the google sign-in process

    1) Go to google cloud and create a new project

    2) Then go to API & Services

    3) Go to OAuth consent screen and click on publish
    
    4) Then go to Credentials and create a new 0Auth client-id and save it

        make sure you add the front end app's url to the authorized origins of the client-id

    5) npm install @react-oauth/google
    

*/


import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function App() {
  
  return(
     <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
        <GoogleLoginButton/>
     </GoogleOAuthProvider>
  )
}


function GoogleLoginButton() {
    const login = useGoogleLogin({
        onSuccess: async (token) => {
             console.log(token)
        },
        onError: async (error) => {
            console.log(error)
        },
        onNonOAuthError: (error) => {
            console.log('Typically used when the user closes the popup and decides not to log in with google')
        },
    })

    const handleClick = () => {
        login();
    }

    return(
            <button onClick={handleClick}>
                Google
            </button>
    )
}













//================================================================= GOOGLE MAPS =================================================================

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






    

//================================================ GEOCODING API =======================================
/*
	You can use this api for geocoding purposes
*/

	
	// address to lat/long
    const geocode = async (address) => {
        try{
            let response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=API_KEY`);
            let results = await response.json();
            let latlong = results[0];
            return {lat: latlong.lat, lon: latlong.lon};            
        }
        catch(error){
            console.log(error);
        }
    }



	// lat/long to address
    const reverseGeocode = async (latlng) => {
        try{
            let response = await fetch(`https://geocode.maps.co/reverse?lat=${-24.3423}&lon=${12.3423}&api_key=API_KEY`);
            let results = await response.json();
            return results.display_name;
        }
        catch(error){
            console.log(error);
        }
    }







    
    



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






  

