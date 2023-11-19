// A web application manifest is a JSON text file that provides essential information about a web application. 
// The primary purpose of a manifest.json is to give the browser 
// the necessary details to install a progressive web app (PWA) on a device
// Remember to put the manifest.json file in the public folder of your app

//make sure to put this line of code in the index.html

<link rel="manifest" href="/manifest.json"/>

{
    "short_name": "Quiz App",
    "name": "Front end Quiz App",
    "icons": [
      {
        "src": "/favicon-32x32.png",
        "type": "image/png",
        "sizes": "32x32"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
