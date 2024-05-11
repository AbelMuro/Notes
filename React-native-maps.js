/* 
            STEPS to install react-native-maps

            1) npm install react-native-maps

            FOR IOS

                2) cd ios
                   pod install
    
                3) Go to ios/<project name>/AppDelegate.mm  

                    (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
                    {
                        [GMSServices provideAPIKey:@"_YOUR_API_KEY_"];        //add this line of code to the top of the function scope
                    }

                4) Go to your podfile and modify the following lines of code

                    platform :ios, '13.4'                                      //add this to the top of the function scope
                
                    target 'fooddasherapp' do
                      rn_maps_path = '../node_modules/react-native-maps'       //make sure this is above use_native_modules!
                      pod 'react-native-google-maps', :path => rn_maps_path

                      config = use_native_modules!

               5) Go to ios/<project name>/Info.plist and add the following line of code

                   	<key>NSLocationWhenInUseUsageDescription</key>
	                  <string>We use your location to provide the closest restaurant that you can use to order from</string>

               6) cd ios
                   pod install


            FOR ANDROID

                2) android/app/src/main/AndroidManifest.xml
                
                      <application>
                          <meta-data
                              android:name="com.google.android.geo.API_KEY"
                              android:value="API_KEY"/>
                      </application>

*/


import MapView from 'react-native-maps';

function App() {
	const [region, setRegion] = useState({		//you can move the center of the map with this function	
            latitude: 12.3445,
            longitude: -14.2002,
        })
	
	const map = useRef();
        map.current.animateToRegion({			// OR you can move the center of the map with animation
            latitude: 12.3445,
            longitude: -14.2002,
        })
	
	return(            
	        <MapView
		    region={region}				//You can use a state to change the center of the map
		    ref={map}
	            style={{width: '100%', height: 200}}
	            initialRegion={{				//you will not need this prop if you have region prop set
	                    latitude: 37.78825,
	                    longitude: -122.4324,
	                    latitudeDelta: 0.0922,
	                    longitudeDelta: 0.0421,
	                }}>
			<Marker
			    image={icons['green']}		//you can load an image like this
	                    coordinate={{
	                        latitude: 37.78825,
	                        longitude: -122.4324,
	                    }}> 
	                    <Image 				//OR by using a child Image component
	                        source={icons['green']} 
	                        style={{width: 35, height: 35}}
	                        resizeMode='contain'/>
	                </Marker>		
		</MapView>
	)
}





//================================================ GEOCODING =======================================
/*
	Geocoding is the process of converting a physical address (1950 21st ST san pablo), 
 	to latitude and longitude.

  	Latitude and longitude are two numbers that google maps can use to pinpoint a location
*/

	
	//address to lat/long
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


//=============================================== PLACES API ===========================================
/* 
	The places API can be used to search for restaurants, museums, stores, etc..

 	The api will return data about these locations

*/

    const searchNearbyRestaurants = async () => {
        try{
            let response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${usersLocation.lat},${usersLocation.lng}&radius=5000&keyword=${'McDonalds'}&key=${'API_KEY'}`);
            let results = await response.json();
            return results.results;         
        }
        catch(error) {
            console.log('error', error);
        }
    }

   
  //when you search for a restaurant and get the data, it will also return a property called photos[], 
  //this array will have a 'photo_reference' that can be used in the following Image component
      <Image 
          source={{uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${'photo_reference'}&sensor=false&maxheight=1600&maxwidth=1600&key=${'API_KEY'}`}} 
          style={{width: '100%', height: 100}}
           />



