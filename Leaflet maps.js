//using leaflet interactive maps for react


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

    /*specifying a tile layer, track resize and a marker to the map */
    useEffect(() => {
        if(!map) return;

        L.tileLayer(                                                          //adding a tile layer to the map to give it a specific look
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
          {maxZoom: 19}
        ).addTo(map);
        map.trackResize = true;                                              //track size will update the map everytime the viewport is resized
        L.marker([lat, long]).addTo(map);                                    // adding a marker to the map

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
