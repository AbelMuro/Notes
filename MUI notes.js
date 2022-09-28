//how to set up MUI base in your application
//
//   1) npm install @mui/system  
//      this package enables you to use styled()
//
//   2) npm install @emotion/react  @emotion/styled
//
//   3) //npm install @mui/base     or     npm install @mui/material
//      the package above contains all the components in the MUI framework
//  
//     keep in mind that all MUI components are organized into 'slots'
//     you can think of slots as just html tags that are nested within each other
//     the root 'slot' is the parent html tag and the inner 'slot' is the actual MUI component
//     for example: the badge component has root slot of <span class="BaseBadge-root"> and the inner slot is another <span class="BaseBadge-badge">
            
import ButtonUnstyled, {ButtonUnstyledClasses} from '@mui/base/ButtonUnstyled';         //you will have to import every component individually like this
import BadgeUnstyled, {BadgeUnstyledClasses} from "@mui/base/BadgeUnstyled";            //each component has an object that contains all their classes
import SwitchUnstyled, {switchUnstyledClasses} from '@mui/base/SwitchUnstyled';     

import {styled} from '@mui/system';  


















//====================================================== MUI BASE: UNSTYLED COMPONENTS =======================================================

//-------------------------------------------------- USING STYLED() TO STYLE MUI COMPONENTS ------------------------------------------------------ 
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
//keep in mind that you can also use the class objects above in the same way you are using them below

//------------------------------------------------ USING OBJECTS TO STYLES MUI COMPONENTS --------------------------------------------------

//you can define css classes like this
const css = `
     .mySwitch{
            width: 100px;
            height: 100px;
            background-color: blue;
            border-radius: 10px;
            
     }
                                                                    // this will select all elements with classes .mySwitch and MuiChecked
    .mySwitch.${switchUnstyledClasses.checked} {                    // .mySwitch.Mui-checked      
        background: #007FFF;                                        // when you click on this switch, MUI will automatically add .Mui-checked to the class list of the element                                    
    }                                                               // this is the reason why you want to use the class object 

`

function MUI() {
 
    // not to self: component use uppercase (Root) while componentProps use lowercase(root)
    //
    // --------------------OVERWRITTING HTML STRUCTURE----------------------
    // component: was meant to overwrite the tag that the ROOT slot uses in the component,
    // components: was meant to overwrite the tag that ANY slot uses in the component, 
    // --------------------OVERWRITING PROPS FOR ALL SLOTS------------------
    // componentsProps: was meant to change the props for ANY slot in the component
    //
    // BEST PRACTICE: if the component only has one slot, like ButtonUnstyled, then you should use component instead of components
    // NOTE TO SELF: components are written in uppercase(Root) and componentsProps are written in lowercase(root)
    
    return(
        <>
            <style type="text/css"> {css} </style>                                              {//you can include an object with all the css like this}
            <SwitchUnstyled className={"mySwitch"}/>                                            {//you can include the classes like this}
                {// Root slot}
            <Button onClick={handleClick} id="someID" className="random"> "Click Me" </Button>  {// you can assign any attribute to the component as props, these attributes will be propagated to the root slot}                                                                
            <BadgeUnstyled component={'div'}/>                                                  {// this is a shortcut to the root slot of the component }
            <BadgeUnstyled components={{Root: 'div'}}/>                                         {// the root slot will be transpiled into a div, (instead of span, which is the default)}
            <BadgeUnstyled componentsProps={{ root: {className: "anyClass"}}}>                  {// you can access ALL slots of the component with componentsProps}            
            
            
                {// Inner Slot}
            <BadgeUnstyled components={{badge: 'div'}}/>                                        {// the inner slot will be transpiled into a div, (instead of a span) }
            <BadgeUnstyled componentsProps={{ badge: { className: 'random' } }} />              {// accessing one of the inner slots (badge) of the component and assigning an attribute to that slot}
            
        </>
    
    )

}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//========================================================= MUI MATERIAL ============================================================================

import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles';

//you can create your own custom colors like this
const theme = createTheme({
      palette: {
            customColor: {
                 main: '#FC3631',                                    //hex code for a shade of red, this will the main color of the button
                 contrastText: '#FFF'                                //hex code for a shade of gold, this will the color of the text in the button  
            }
      }        
})


function MUI() {
            
       const handleClick() {}

      return(
            <ThemeProvider theme={theme}> 
                <Button variant="contained"> Click me! </Button>                           {//variant prop gives you different types of button}
                <Button sx={{width: 400, backgroundColor: 'red'}}> Click here! </Button>   {//sx property lets you change the build in css properties of the components}
                <Button onClick={handleClick}> Click me!</Button>                          {//you can add event handlers like this}
                <Button color="customColor"> Click me!</Button>                            {//you can add your own custom colors like this}
            </ThemeProvider>
      
      )
            
}



