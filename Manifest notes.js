// A web application manifest is a JSON text file that provides essential information about a web application. 
// The primary purpose of a manifest.json is to give the browser 
// the necessary details to install a progressive web app (PWA) on a device
// Remember to put the manifest.json file in the public folder of your app
//Also make sure to use the CORRECT image sizes for the icons below

//make sure to put this line of code in the index.html
<link rel="manifest" href="/manifest.json"/>

{
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "Password Generator App",
    "short_name": "Generate Password",
    "description": "App that will generate a password for you",
    "icons": [
      {
        "src": "./icons/favicon-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "./icons/favicon-256x256.png",
        "sizes": "256x256",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "./icons/favicon-384x384.png",
        "sizes": "384x384",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "./icons/favicon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any maskable"
      }
    ]
  }
