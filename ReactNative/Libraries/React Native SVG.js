//=================================================== REACT NATIVE SVG ===============================================
//  npm install react-native-svg
//  npm install react-native-svg-transformer -D
//  you may need to run the following commands if you are getting an error
//  cd ios
//  pod install

import { SvgXml } from 'react-native-svg';

function App () {
    return(<SvgXml xml={'<svg><svg>'} width='295px' height='16px'/>)
}

export default App;
