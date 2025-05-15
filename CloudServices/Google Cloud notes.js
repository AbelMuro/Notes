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

 		You will also need to create a firewall policy specifically for your vm instance
		  	Go to Compute Engine -> VM instances -> On the VM instance, click on the 3 dots on the far right -> view network details -> Network interface details, click on the Network option -> firewalls
     			-> click on Add firewall rule
	
 				Name: allow-https-for-my-app
     				Network: default (must be the network your VM instance is running pn)
	 			Target Tags: allow-https-for-my-app	(or you can select All instances of network)    (if you choose a tag name, you need to assign it to the vm instance)
				Direction of traffic: ingress (incoming traffic)
    				Actions on match: allow
				Targets: all instances in the network
    				Source filter: ipv4 or ipv6
 				Source ipv4 filter: 0.0.0.0/0
     				Specified protocols and ports: Check TCP and use the https port your app is running on (443)

    				Click on create
	

	0.5) By default, vm instances will be connected to a VPC network that enables iPV4 addresses to connect to the instance, 
 	     if you want to allow iPV6 addresses to connect to your instance then...

	     click on the three dots in the instance -> View network details -> IP addresses -> Reserve External Ip address
      
      		Select the following options...
			select IPV6
    			select the region that you instance is running on
       			select the vpc network that you instance is connected to (subnetwork should be the same)
	  		select the VM instance	


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
      		sudo apt-get install libcap2-bin 							// installs the libcap2-bin package that is used to manage linux capabilities such as permissions
		sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` 			// Grant Node.js permission to bind to privileged ports (like port 443)... The setcap command allows Node.js to bind to such ports without needing to run as root.
		sudo apt install git -y									// installs gitbash
		git clone YOUR_REPO_URL								 	// clones your repo
		cd YOUR_PROJECT_FOLDER									// changes directory to the folder that has the clone
  
		nano ~/.bashrc										// open  the shell configurations file and put the env variables at the very end of the file
  			export VARIABLE_NAME="value"				
		        export VARIABLE_NAME="value"
		        export VARIABLE_NAME="value"							// once you're done writing the env variables, press ctrl + o to 'write out' the file, then exit
	  	source ~/.bashrc									// save and reload the file

		npm install										// installs all dependencies for the app




	3) You must buy a domain for your server/website, go to ionos.com and then buy a domain
  	    When you buy a domain, the website will provide you with a SSL certificate and Key file
       	    save these files in your repository

	     	3.1) Go to your domain list in ionos, and select the domain you just bought.
	      
			     DNS -> Add Record -> Select A
		
		      		 Host Name = @
			     	 Points to = external-ip-address of the VM instance
		
		                 Click create
		
		 	    DNS -> Add Record -> Select AAAA
		
				Host Name = @
		  		Points to = ipv6-address that you assigned to vm instance in step 0.5
		
		    		click create


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



*/














//================================================= GOOGLE CLOUD RUN ===========================================================================
/*
    Google cloud run is a service that is used to deploy serverless functions and websites


//-------------------------- DEPLOY NODE.JS with DOCKER --------------------------

          
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

    2) gcloud auth login                                                           	 //login with google
    
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




//---------------------------------------------------- GOOGLE MAPS WITH REACT ----------------------------------------------------
/* 
	You can use the google maps API in a React application. Use npm install @react-google-maps/api
 	and this command will populate the google property of the window object

  		window.google = {maps: {...}}}
*/


//------------------------ Initialize Google Maps
/* 
	You can use the GoogleMaps component to render a map in your app.
 	Use the onLoad event handler to get the state of the map.
  	Also, use useLoadScript() hook to load the necessary script for
   	google maps.

    	Once the onLoad event handler is called, the map state will have access 
     	to the following methods

	      	map.setZoom(15);				//sets the zoom level for the actual map
		map.setCenter({lat: 23.43, lng: 12.43})		//sets the center of the map to the specified coordinates
       
*/


import {GoogleMap, useLoadScript} from '@react-google-maps/api';

function App() {
	const [map, setMap] = useState(/** @type google.maps.Map */(null));
	const {isLoaded} = useLoadScript({  
	        googleMapsApiKey: "API_KEY",
	    });

	return isLoaded && (
		<GoogleMaps 
			mapContainerStyle={mapContainer}            // you can pass an object that contains css properties that define the way the map will render
	                mapContainerClassName={".class"}            // you can pass a class name from a css file that will define the way the map will render
	                center={{lat: 44, lng: -80}}                // center is the initial position of the map, you must pass an object with the two properties lat and lng
	                zoom={10}                                   // zoom is the initial zoom when the map is loaded onto the DOM
	                onLoad={(map) => setMap(map)}               // when the google map loads, it will initialize the map state
	                options={{                                  // these properties are used to remove the default options that control the map
	                   zoomControl: true,
	                   streetViewControl: true,
	                   mapTypeControl: true,
	                   fullscreenControl: false,
	                   styles: customMap,                        // you can also include a custom map made from a different website, just convert the JSON into valid javascript
	               }}>
		</GoogleMaps>
	)
}





//------------------------ Geocoding
/* 
	Geocoding is the process of converting a human-readable address
 	to latitude and longitude. You can use the geocode() method to 
  	do this.
*/

      function geocoding() {
          let geocoder = new google.maps.Geocoder();

          geocoder.geocode({address: '1950 21st ST, San Pablo, CA, USA, 94806'}, (results, status) => { 
              if(status !== "OK") return;
		// results[0]                                 // results[] is an array of objects that contain all the different results of the geocoding
		// results[0].geometry                        // geometry is an object that contains properties such as location
		// results[0].geometry.location               // location is an object with properties latitude and the longitude
          })
      }



//------------------------ Reverse Geocoding
/* 
	Reverse geocoding is the process of converting latitude and longitude
 	into a human-readable address.
*/

    function reverseGeocoding(lat_lng = {lat: 23.432, lng: -43.45}) {
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({location: lat_lng}, (results, status) => {          //geocode is an asynchronous function, meaning that javascript will NOT wait until this function finishes
            if(status !== "OK") return;

            const address = results[0].formatted_address;
        })
    }




//------------------------ Geocoding URL
/*
	You can use this api for geocoding purposes
*/
	// geocoding
    async function geocoding (address) {
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

	// reverse geocoding
    async function reverseGeocode (latlng) {
        try{
            let response = await fetch(`https://geocode.maps.co/reverse?lat=${-24.3423}&lon=${12.3423}&api_key=API_KEY`);
            let results = await response.json();
            return results.display_name;
        }
        catch(error){
            console.log(error);
        }
    }



//------------------------- Geolocating
/* 
 	You can access the users location by using the geolocating method.
  	Keep in mind that geolocation is a Web API, its not part of the 
   	Google maps API
*/

    const moveToUsersLocation = () => {
        if(!navigator.geolocation) {                                    //navigator.geolocation will return false if the browser does not support it
            alert("geolocation is not supported by your browser");
            return; 
        }
        else{                                                           //navigator is another object that is a part of the global object window
            navigator.geolocation.getCurrentPosition((position) => {    //getCurrentPosition will get the position of the device used to view the app   
                const currentPosition = {                                 //position is an object that contains a coord object with the latitude and longitude
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };                          
            },                                                                                          
            () => {                                                     //this second callback is an error handler
                alert("unable to retrieve your location")
                return;
            })
        }
    }



//------------------------- Nearby Search
/* 
	You can search for nearby points of interest with the PlacesService() method.
 	It returns an array of locations that are near a certain point
*/
const searchNearbyRestaurants = () => {
    let request = {
        location: {lat: -34, lng: 45},                                      // the origin of where we will search for points of interest
        radius: 500,                                                        // radius of the area in which to look for the businesses
        keyword: "McDonald's"                                               // name of the businesses that we want to look for
        //type: "store"                                                     // you can also search for nearby business by using the type property, 
    }                                                                      
    let places = new google.maps.places.PlacesService(map)                  
    places.nearbySearch(request, (results, status)=>{                       // nearbySearch will search the map for any businesses that has the keyword in request object
        if(status !== "OK") return;                                                 
        results.forEach((result) => {                                       // results is an array containing all the places found nearby the choosen location
	/* 
		result = { 
			place_id,
			latitute,
			longitude
		}
	*/
        })
      
    })
}


//------------------------- Markers
/* 
	You can use the Marker() constructor to create a marker
 	in the map. The marker will automatically appear on the map 

	    	origin property is used to select an icon within a sprite sheet (image with multiple icons)
	
		+--------------------------+
		|  Icon 1  |  Icon 2  |  Icon 3  |
		|   (0,0)  |  (50,0)  | (100,0)  |
		+--------------------------+
	 
		origin: new google.maps.Point(50, 0)  will select the second icon in the sprite sheet for the marker
*/


function createMarkers() {
    const marker = new google.maps.Marker({                                
        position: {lat: 44, lng: -10},                                    
        map: map,                                                            // passing the map state object
        title: "location",                                                   // this is what will appear when you hover over the marker
	icon: {
	        url: "https://example.com/custom-icon.png", 		    // URL of the custom icon
	        scaledSize: new google.maps.Size(50, 50),		    // Resize the icon
	        origin: new google.maps.Point(0, 0), 			    // Origin point (used for sprite sheets)
	        anchor: new google.maps.Point(25, 50) 		            // Anchor point (defines where the icon is positioned relative to the point on the map)
	}
    })

    marker.addEventListener("onclick", (e) => {                               // you can add an event listener to the marker object
	
    })

}



//------------------------- Marker Component
/* 
	You can use the <Marker/> component to render a marker
 	on your map.
*/

function App() {
	return (
		<Marker 
		    icon={{
			url: "http://maps.gstatic.com/mapfiles/markers2/icon_green.png",  // URL of the custom icon
			scaledSize: new google.maps.Size(50,50),     			  // Resize the icon
			origin: new google.maps.Point(0, 0), 			    	  // Origin point (used for sprite sheets)
			anchor: new google.maps.Point(5,5)           			  // Anchor point (defines where the icon is positioned relative to the point on the map)
		     }} 
                    position={{lat: 44, lng: -80}}					  ///Marker will position a marker on the map based on the position property*/}
                />              			  
	)
}



//------------------------- Get details of a location
/* 
	You can use the getDetails() method to get meta data of
 	a specific location
*/

function getLocationDetails() {
    let placeService = new google.maps.places.PlacesService(map);
    placeService.getDetails({
        placeId: "u29ghauwhubd98",                            	//you must specify the place id of a specific location                          
        fields: ["name", "photos", "opening_hours", "utc_offset_minutes", "vicinity", "rating"]  //details of the location that we want to obtain
        },
        (place, status) => {                                       //place is an object containing all the data of the location
            if(status !== "OK") return;
            const locationData = {                                
                name: place.name,
                image: place.photos[0].getUrl(),
                address: place.vicinity,
                rating: place.rating,
                openHours: place.opening_hours.isOpen(),
            }
        }
    )
}



//------------------------- Calculating the route between two locations
/* 
	You can use the route() method to calculate a route between two
 	points of interest.
*/

import {DirectionsRendered} from '@react-google-maps/api'

function App() {
    async function calculateRoute() {
	const directionService = new google.maps.DirectionsService();       // DirectionsService() is a constructor that returns an object with pre defined methods that let us calculate a route
	
	const results = await directionService.route({                      // route() will calculate the route between the origin and the destination
	    origin: {lat: 2.34, lng: 4.56},                                 // start of the route
	    destination: {lat: 4.56, 9.22},                                 // end of the route
	    travelMode: google.maps.TravelMode.DRIVING                      // TravelMode = {DRIVING, BICYCLE, WALKING, ETC...}
	})
	    /* 
                 results					            // results can be passed to the directions prop of <DirectionsRenderer/> component
		 results.routes[0]                                          // routes is an array that contains all the different routes calculated by route()
		 results.routes[0].legs[0]                                  // legs is an array that contains all the stopover waypoints or destinations specified
		 results.routes[0].legs[0].distance                         // each 'leg' is an object that contains info about the calculated route
		 results.routes[0].legs[0].duration                         // each 'leg' has properties like distance and duration 
		 results.routes[0].legs[0].distance.text                    // text returns a string that contains a human readable distance/duration           
	    */                                                                     
    }
    
    return(
	   <GoogleMaps> 
		<DirectionsRenderer directions={results} /> 			//you can get the results from the promise returned by the route() method
	    </GoogleMaps>	 
    )    
}



//------------------------- Autocomplete
/* 
	You can use the autocomplete feature in google maps api
 	to display recommendations to the user whent they start typing
  	an address.
*/
import {Autocomplete} from '@react-google-maps/api';

function App() {
	const {isLoaded} = useLoadScript({  
	        googleMapsApiKey: "API_KEY",
		libraries: ["places"]
	    });
	
	return isLoaded && (
	        <Autocomplete className="someClass">            {/* you can also apply some css to Autocomplete */}
	            <input type="text" />                      {/*this input box will now have autocomplete (remember not to include {} inside <Autocomplete >)*/}
	        </Autocomplete>		
	)
}


















  

