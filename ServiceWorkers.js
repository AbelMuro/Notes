/* 
                                      SERVICE WORKERS

  Service Workers are programs that enable your app to work even when there is no internet connection.  
  These programs are required to make a PWA (progressive web app) and they intercepting network requests 
  and caches them so that they can be used offline

  Cache is the technique of storing resources (images, files, etc...) for offline use 
  
  Remember, you will also need to install a manifest.json file in the 
  public folder of you project to make your app into a PWA
  Check the manifest notes.js repository for more info

*/

//  -----------------------Remember to save this file 'ServiceWorker.js' into the public folder of your project (outside the src folder)-------------------------------

1)  // Install service worker 
    // (we open a cache, add specified resources to it, and ensures that the installation process doesn’t complete until the cache is ready)

      self.addEventListener('install', e => {
          e.waitUntil(                                                //waitUntil() is a method that tells the browser that work is ongoing until the promise that is passed is settled
            caches.open('Quiz app cache')                             //caches.open() is a method that opens up the browser caches
              .then((cache) => {                                      // cache is an object that we can use to access the cache
                return cache.addAll(['/', '/styles.css', '/app.js']);  //we update the cache with these resources
              })
          );
      });



2)    // Cache and return the requests
      //(everytime there is a fetch request, this event listener will intercept the request and store the request in the cache for offline use

        self.addEventListener('fetch', e => {
            e.respondWith(                                                    //respondWith() is a method that lets us customize how we respond to every 'fetch' request that is made
              caches.match(e.request)                                         //caches.match() is a method that checks if a fetch request already exists in the cache
                    .then((response) => {
                          if (response)                                       //if the response exists in the cache, we just return in
                              return response;
                          else                                                //if it doesnt, then we make a new fetch request and store the request in the cache for offline use
                             return fetch(e.request)
                                    .then((response) => {
                                        const cloneResponse = response.clone(); //we have to clone the response because the response stream can only be consumed once
                                        caches.open('Quiz App')                  //we open the cache
                                              .then((cache) => {
                                                  cache.put(e.request, cloneResponse) //and then we store the response in the cache
                                              })
                                       return response;
                                      })
                                    })
                                    .catch(() => {
                                        return new Response('Error');
                                    })
                  );
          });
 
3)    // Update service worker
      // We clean up resources from previous version of the service worker
      self.addEventListener('activate', e => {
              var cacheWhitelist = ['Quiz App'];                                         // an array of cache names that we want to keep in the cache          
              e.waitUntil(                                                               // waitUntil() is a method that tells the browser that work is ongoing until the promise that is passed is settled
                  caches.keys()                                                          // caches.keys() is a method that returns an array of all the cache names that we have stored
                        .then(cacheNames => {              
                              return Promise.all(                                        //Remember, Promise.all() is settled when ALL of the input promises are settled, but if one of them is rejected, then Promise.all() is rejected as well
                                      cacheNames.map(cacheName => {                      //we traverse through the cache list and delete all the cache that is NOT in the cacheWhileList array     
                                          if(cacheWhitelist.indexOf(cacheName) === -1) 
                                              return caches.delete(cacheName);                        
                                      })
                            );
                        })
                    );
              });



// You will need to also have this script in either the index.html file or the index.js file
// This will register the service workers in your app

    <script>
        if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register(`/ServiceWorker.js`).then((registration) => {
                        console.log('Worker registration is successful', registration.scope);
                    }, (err) => {
                        console.log('Worker registration has failed', err);
                    })
                });
        } else 
                console.log('Service Worker is not supported by your browser.');
    </script>






