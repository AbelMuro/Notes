//using leaflet interactive maps for react

//remember to put the following lines in yout HTML file!
/*
    <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""/>
            
    <script 
        src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
        crossorigin="">
    </script>
*/

import React, {useEffect, useState} from 'react';

function Map({lat, long}) {
    const [map, setMap] = useState();
    

    /* initializing the map*/
    useEffect(() => {
        setMap(L.map('map', {                                               //must be an ID of an element
            center: [lat, long],
            zoom: 13
        }));
    },[])


    /* adding a tile layer to the map*/
    useEffect(() => {
        if(!map) return;

        L.tileLayer(                                                          //adding a tile layer to the map to give it a specific look
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
          {maxZoom: 19}
        ).addTo(map);
        
        map.trackResize = true;                                                //track size will update the map everytime the viewport is resized

        return () => {                                                        //clean up
            map.off();
            map.remove();
        }
    }, [map])

    
    /* Adding a marker to the map */
    useEffect(() => {
        if(!map) return;

        const icon = L.icon({
            iconUrl: 'url of custom icon goes here',
            iconSize: [40, 48],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
        })
        
        L.marker([lat, long], {icon: icon}).addTo(map);                       // you can exclude the second argument if you want to use the default icon

        return () => {                                                        //clean up
            map.off();
            map.remove();
        }
    }, [map])


    /* this will check to see if the map's size has changed and will update it accordingly*/
    useEffect(() => {
        if(!map) return;

        setTimeout(() => {
            map.invalidateSize(true)                                         //this is mostly useful for updating the map when we enter the page in tablet mode or mobile
        }, 200)
    })

    return(
            <div id={'map'}></div>                                          //the actual map, remember to set the width and height of this container
        )
}

export default Map;
