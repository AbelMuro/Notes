//how to set up MUI base in your application
//
//   1) npm install @mui/system  @emotion/react  @emotion/styled
//      the packages above will enable you to style the MUI components with the styled()``
//
//   2) //npm install @mui/base
//      the package above contains all the components in the MUI framework
//  
            
import ButtonUnstyled from '@mui/base/ButtonUnstyled';         //you will have to import every component individually like this
import BadgeUnstyled from "@mui/base/BadgeUnstyled";            
import {styled} from '@mui/system';  


//you can use any css property here
const Button = styled(ButtonUnstyled)`                    //styled is a function that lets us use css properties to style MUI components
    color: white;                                         
    background-color: ${blue[500]};                       //you can also include any js variable and interpolate it like this
    border: none;
    border-radius: 20px;
    padding: 1.2rem;
    display: block;
    width: 100px;
    margin: auto;
    cursor: pointer;

    &:hover {                                              //& operator points to the Button component, this is similar to .Button:hover
        background-color: ${blue[600]};
    }

    &:active{                                             //& operator points to the Button component, this is similar to .Button:active
        background-color: red;
    }
`

function MUI() {


    return(
        <>
            <Button> "Click Me" </Button>
            <BadgeUnstyled component={{Root: 'div'}}/>        {/* the component prop lets use change the html tag that the component get transpiled into */}
            <BadgeUnstyled component={'div'}/>                {/* this is a shortcut to the above, basically/}
        </>
    
    )









}
