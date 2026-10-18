//using leaflet interactive maps for react

/*
    npm install leaflet react-leaflet
*/

import {MapContainer, Marker, Tooltip, Popup} from 'react-leafet';

function Map() {

    return (
        <MapContainer className={styles.container} center={[latitude, longitude]} zoom={13}>
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker 
                position={[latitude, longitude]} 
                eventHandlers={{
                    click: () => {},
                    mouseover: () => {}
                }}
                icon={new Icon({
                    iconUrl: icons['marker'],
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                })}
                >
                <Tooltip direction={'top'} opacity={1} offset={[0, -60]}></Tooltip>             //popup that appears when user hovers over marker
                <Popup></Popup>                                                                 //popup that appears when user clicks on marker
            </Marker>
                    
     
            <ReCenterMap latitude={latitude} longitude={longitude}/>                             //This is a custom component that uses useMap to re-center the map container
        </MapContainer>
    )

}




/* 
        function ReCenterMap({latitude, longitude}) {
            const map = useMap();
        
            useEffect(() => {
                map.setView([latitude, longitude], 13);
            });
        
            return null;
        }

*/
