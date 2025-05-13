//============================================ REACT NATIVE RADIO BUTTONS =========================================
//npm install react-native-radio-buttons-group


import RadioGroup from 'react-native-radio-buttons-group';

function App() {
    const [category, setCategory] = useState('Funny');          

      const categories = [
        {
            id: 'Funny',                     //must be unique and a non-empty string            
            label: 'Funny',
            value: 'Funny',
            borderColor: 'white',            //color for the border of the dot
            color: 'white',                  //color of the dot in the middle
            labelStyle: {color: 'white'}      // styles for the label
        },
        {
            id: 'Music',
            label: 'Music',
            value: 'Music',
        },
        {
            id: 'Sports',
            label: 'Sports',
            value: 'Sports',
        }
    ]

  
    return(
          <RadioGroup 
              radioButtons={categories} 
              onPress={setCategory}              //setCategory will automatically select the value prop of the radio button
              selectedId={category}
              containerStyle={{                  //you can use this prop to align the radio buttons in their container
                    alignItems: 'start'
                }}
        /> )
}
