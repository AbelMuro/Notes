
//============================================= REACT NATIVE CHECKBOX =============================================
// npm install react-native-check-box

/* 
  Keep in mind that this component will only display one checkbox at a time,
  you will need to traverse through an array and return a new checkbox component 
  after every iteration
*/

import CheckBox from 'react-native-check-box';


function Ingredient({label}) {
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    }


    return(
        <CheckBox
            style={{height: 20}}                        //style applied to the container of the checkbox
            onClick={handleChecked}                     
            isChecked={checked}
            rightText={'text goes here'}                //prop that will display text on the right side of the checkbox
            rightTextStyle={{color: 'black'}}           //style for the right sided text
            checkedImage={ <Image source={icons['checkmark']} style={{width: 20, height: 20}}/>}    
            unCheckedImage={<Image source={icons['emptymark']} style={{width: 20, height: 20}}/>}
        />
    )
}
