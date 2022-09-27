//how to set up MUI base in your application
//
//   1) npm install @mui/system  @emotion/react  @emotion/styled
//      the packages above will enable you to style the MUI components with the styled()``
//
//   2) //npm install @mui/base
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

// The classes object has this syntax [componentName]Classes
//it is important to use this object when defining the css for
//the component because MUI already defined alot of the javascript behind
//the scenes for these components,  and MUI will add one of the classes defined
// in this class object to the elements in the component.

//for example


//========================================== USING STYLED() TO STYLE MUI COMPONENTS ========================================================
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

//============================================ USING OBJECTS TO STYLES MUI COMPONENTS ======================================================

const css = `
     .myClass{
            width: 100px;
            height: 100px;
            background-color: blue;
            border-radius: 10px;
            
     }



`






function MUI() {

    const handleClick = () => {
        console.log("it works");
    }
    
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
            <style type="text/css">{css}</style>   
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
