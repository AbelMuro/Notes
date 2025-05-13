
//=========================================== REACT NATIVE ELEMENT DROPDOWN ====================================
//npm install react-native-element-dropdown --save

import { Dropdown } from 'react-native-element-dropdown';


function SelectRestaurant() {
    const [value, setValue] = useState(null);
    const [focus, setFocus] = useState(false);

    const data = [
        {label: 'McDonalds', value: 'McDonalds'},
        {label: 'Jack in the Box', value: 'Jack in the Box'}
    ];

    useEffect(() => {
        console.log(value);
    }, [value])

    return(
        <Container>                                               //styles for the container surrounding the dropdown
            <Dropdown 
                style={{        
                  width: 220,
                  height: 50,
                  paddingHorizontal: 8,
                  position: 'absolute',
                  right: -5,
                  top: -10,                                      //styles for the dropdown box (you may be better off at using position properties)
                }}                            
  
                data={data}
                labelField="label"
                valueField="value"
  
                iconStyle={{width: 20, height: 20}}                //styles for the arrow

                value={value}
                onChange={item => setValue(item)}

                placeholder={!focus ? 'Select Restaurant' : '...'} 
                placeholderStyle={}
                selectedTextStyle={}                              //styles applied to the item that is selected
                  
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}

                renderLeftIcon={() => (
                    <AntDesign                                    //icon to be displayed on the left
                        style={}
                        color={focus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />            
        </Container>

    )
}
