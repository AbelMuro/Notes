//how to set up MUI base in your application
//
//   1) npm install @mui/system  @emotion/react  @emotion/styled
//      the packages above will enable you to style the MUI components with the styled()``
//
//   2) //npm install @mui/base
//      the package above contains all the components in the MUI framework
//  
//          keep in mind that all MUI components are organized into 'slots'
//          you can think of slots as just html tags that are nested within each other
//          the root 'slot' is the parent html tag and the inner 'slot' is the actual MUI component
//          for example: the badge component has root slot of <span class="BaseBadge-root"> and the inner slot is another <span class="BaseBadge-badge">
            
import ButtonUnstyled from '@mui/base/ButtonUnstyled';         //you will have to import every component individually like this
import BadgeUnstyled from "@mui/base/BadgeUnstyled";            
import {styled} from '@mui/system';  


//its a good idea to have objects store values for css like this
const blue = {
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2"
}


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

    const handleClick = () => {
        console.log("it works");
    }
    
    //not to self: component use uppercase (Root) while componentProps use lowercase(root)
    // component was meant to overwrite the tag that the component uses, and componentProps was meant to change the props of the component
    return(
        <>
                {<!--Root slot}
            <Button onClick={handleClick} id="someID" className="random"> "Click Me" </Button>  {<!-- you can assign any attribute to the component as props, these attributes will be propagated to the root slot}                                                        
            <BadgeUnstyled component={{Root: 'div'}}/>                                          {<!-- the root slot will be transpiled into a div, (instead of span, which is the default)}
            <BadgeUnstyled component={'div'}/>                                                  {<!-- this is a shortcut to the above, basically }
            
                {<!-- Inner Slot}
            <BadgeUnstyled componentsProps={{ badge: { className: 'random' } }} />              {<!-- accessing one of the inner slots (badge) of the component and assigning an attribute to that slot}
            
        </>
    
    )









}
