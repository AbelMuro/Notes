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

    
    const addLayerToMap = () => {
        if(!map) return;

        L.tileLayer(                                                          
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',    //adding a tile layer to the map to give it a specific look
          {maxZoom: 19}
        ).addTo(map);

        map.trackResize = true;          
    }

    const addMarkersToMap = () => {
        const icon = L.icon({
            iconUrl: icons['marker'],
            iconSize: [40, 48],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
        })

        L.marker([lat, long], {icon: icon}).addTo(map);            // you can exclude the second argument if you want to use the default icon  
        L.marker([lat, long], {icon: icon}).addTo(map);             //you can add as many markers to the map like this
    }
    

    /* initializing the map*/
    useEffect(() => {
        setMap(L.map('map', {                                               //must be an ID of an element
            center: [lat, long],
            zoom: 13
        }));
    },[])


    useEffect(() => {
        if(!map) return;
    
        addLayerToMap();
        addMarkersToMap()

        setTimeout(() => {
            map.invalidateSize(true)                                         /* this will check to see if the map's size has changed and will update it accordingly*/
        }, 200)
        
        return () => {                                                        //clean up
            map.off();
            map.remove();
        }
    }, [map])


    return(
            <div id={'map'}></div>                                          //the actual map, remember to set the width and height of this container
        )
}

export default Map;
