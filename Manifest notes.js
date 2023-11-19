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
        "src": "/quiz icon.png",                    //this image is used for splash screens
        "type": "image/png",
        "sizes": "512x512",
        "purpose": "any",
      },
       {
        "src": "/quiz icon.png",                   //this icon is used for your app in mobile devices (think of the youtube app on your phone, that app has an icon of a red box and a white play buttohn) 
        "type": "image/png",
        "sizes": "196x196",
        "purpose": "any maskable"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
