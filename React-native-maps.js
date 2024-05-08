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
  return(            
        <MapView
            style={{width: '100%', height: 200}}
            initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />  )
}










