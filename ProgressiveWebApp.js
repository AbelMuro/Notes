//===================================================== CREATING A PROGRESSIVE WEB APP ===============================================================


/* 

  1) create a file called ServiceWorkers.js and place it inside the PUBLIC folder of project
                                      SERVICE WORKERS

  Service Workers are programs that enable your app to work even when there is no internet connection.  
  These programs are required to make a PWA (progressive web app) and they intercepting network requests 
  and caches them so that they can be used offline

  Cache is the technique of storing resources (images, files, etc...) for offline use 
  
  Remember, you will also need to install a manifest.json file in the 
  public folder of you project to make your app into a PWA
  Check the manifest notes.js repository for more info


  Workbox-Routing Module

    workbox-routing module is a module that makes it easy 
    to route network requests to different functions that provide responses 
*/


importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// this function will let the browser make a request to a server for images to be displayed
// if the server is unavailable, then the browser will access the cache for the images
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.NetworkFirst()
);








/* 
    2) create a file called manifest.json and place it inside the PUBLIC folder of project

                                MANIFEST FILE
  
     A web application manifest is a JSON text file that provides essential information about a web application. 
     The primary purpose of a manifest.json is to give the browser 
     the necessary details to install a progressive web app (PWA) on a device
     Remember to put the manifest.json file in the public folder of your app
     Also make sure to use the CORRECT image sizes for the icons below
*/

//make sure to put this line of code in the index.html
<link rel="manifest" href="/manifest.json"/>    
  
{
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "Galleria",
    "short_name": "Galleria",
    "description": "App that displays world-renowned paintings drawn by famous artists",
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


// 3)  You will need to also have this script in the index.html file
//     This will register the service workers in your app

    <script>
        if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register(`/ServiceWorkers.js`).then((registration) => {
                        console.log('Worker registration is successful', registration.scope);
                    }, (err) => {
                        console.log('Worker registration has failed', err);
                    })
                });
        } else 
                console.log('Service Worker is not supported by your browser.');
    </script>
