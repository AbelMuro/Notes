/* 
            Framer-motion is an animation library used to create animations for React

            npm install framer-motion
*/



/* 
            A FEW THINGS TO NOTE HERE:

            if the website shifts to the left or right, you can fix this bug by using the following selector

            html, body, #root {
              max-width: 100vw;
              overflow-x: hidden;          //this will prevent the website from being moved to the left or right
              transition: none;            //this can also help prevents bugs with framer motion
            }


*/



//======================================================== DECLARATIVE ANIMATIONS:  <motion/> component ================================================================================================
/* 
            The <motion/> component is used to create animation with a component.
            Most animations that framer-motion uses consist of changing the values
            of a css property. The <motion/> component changes these css values by 
            using three props; initial, animate and transition to create the
            animation
*/


//-------------------------- Initial and Animate Props
/* 
            The initial and animate props accept an object that
            has css properties. The initial prop will have the 
            initial styles of the component. The animate prop will
            have the styles the component will animate into.
*/

import {motion} from 'framer-motion';

function App() {
     return(
            <motion.div 
                 key='1'                                                      // key prop is required for img tags or any element that has a img as a child
                 initial={backgroundColor: 'white', x: 0} 
                 animate={                                                
                        backgroundColor: 'red', 
                        x: [-100, -50, 0, 50, 100, 150]                        //will animate through an array of values
                 }>
            </motion.div>
     )
}




//-------------------------- Transition Prop
/* 
            The transition prop is used to control and specify
            how an animation will take place. Keep in mind, that
            certain transitions, like staggerChildren, require variants
            to work
*/


function Circle () {
  return(
    <> 
       <motion.div       
          initial={{opacity: 0, scale: 0.5}}                    //you can set false to this attribute and the animation will cancel automatically 
          animate={{opacity: 1, scale: 1.2}}                    //if you set null to one of the css properties, it will use the default value for the property
          transition={{
              type: 'spring',                                   // Spring-based animation
              bounce: 0.24,                                     // determines the level of bounciness the animation will be, must be a value between 0 and 1 
              damping: 6,                                       // Strength of opposing force. If set to 0, spring will oscillate indefinitely. Set to 10 by default.
              mass: 21,                                         // Mass of the moving object. Higher values will result in more lethargic movement. can be any number
              stiffness: 150,                                   // Stiffness of the spring. Higher values will create more sudden movement
            
              type: 'tween',                                    // Duration-based animation
              duration: 3,                                      // duration of the animation
              delay: 0.5,                                       // can delay the animation in seconds                                        
              ease: [0, 0.71, 0.2, 1.01],                       // defines a timing function, can be 'linear', 'ease-in', 'ease-out', or an array of integers

              type: 'keyframes',                                // Sequence-based animation (typically used for animating css properties through an array)

              repeat: 1, 2, 'Infinite',                         // the number of times the transition will occur
              repeatType: 'loop, reverse, mirror',              // loop repeats the animation from the start, reverse alternates between forward and backwards playback
              repeatDelay: 0.3,                                 // the delay between each repeating transition  

              opacity: {duration: 0.2},                         // you can assign a transition to a specific property like this
              from: 90,                                         // this defines the initial value for ALL css properties that are in the animate prop, this is similar to initial prop   
              times: [0, 0.2, 1],                               // by default, the animation is spaced evenly, you can override this with the times prop 0 -> 0.2 -------> 1
          }}                 
        />  
  )
}







//-------------------------- Variants Prop
/* 
            Variants are a way to modularize your props and objects
            Complex animations can require large objects to be assigned
            to the initial and animate props of your motion component.
            You can simplify your code by using variants. Keep in mind, 
            the parent component has to trigger the animations first,
            then the child components animations are triggered
*/
const item = {
      hidden: { 
            opacity: 0,
      },
      visible: {  
            opacity: 1,
            transition: {  
              when: "beforeChildren or afterChildren",          // parent component transitions will finish before or after childrens transition
              delayChildren: 0.2,                               // similar to the property above, but it offers a more precise delay 
              staggerChildren: 0.1,                             // first child will be delayed by 0.1, the second child delayed by 0.2, the third child delayed by 0.3 (requires variants to work)
              staggerDirection: -1,                             // direction in which the children are delayed, -1 means the last child is delayed by 0.1, the second to last child is delayed by 0.2...     
            },
      }
}


function App() {
    return (
        <motion.div
            initial="hidden"                        // framer-motion will get the 'hidden' property from the 'item' object and assign it to this prop       
            animate="visible"                       // framer-motion will get the 'visible' property from the 'item' object and assign it to this prop
            variants={item}                         // you must assign the object that contains the css properties here             
        >
              <motion.div                                            
                  variants={otherVariant}            // the initial and animate prop will automatically be set by framer-motion, 
               />    
        </motion.div>
    )
}





//-------------------------- Dynamic Variants Prop
/* 
            You can also use variants dynamically by using a callback
*/
const item = {
      hidden: {  
            opacity: 0,
      }.
      visible: i => ({                        
             opacity: 1,
             transition: {
                delay: i * 0.3,
      }) 
}

function App(){
    return(
            array.map((val, i) => {
                 return(
                        <motion.div
                              custom={i}                                    //custom prop is used to pass a value to the dynamic variant callback
                              initial="hidden"                           
                              animate="visible"                       
                              variants={item}>                                 
                       </motion.div>
                 )       
            })
    )
}                  





//-------------------------- Exit Prop
/* 
            The exit prop is used to create 'exit' animations.
            In other words, before the component is unmounted,
            it will go through one final animation. Keep in mind,
            that the 'exit' prop will only work if you wrap the component
            with AnimatePresence
*/
import {motion, AnimatePresence}

function App() {
    const [remove, setRemove] = useState(false);

    const handleClick = () => {
        setRemove(!remove);
    }

    return(
        <>
            <AnimatePresence initial={false}>           // you can set initial to false to skip the first initial animation
                 {
                 remove &&  
                      <motion.div                      
                           initial={opacity: 0}
                           animate={opacity: 1}
                           exit={opacity: 0}           // the exit prop will use the exit property from the object in variants
                  />
                  } 
            </AnimatePresence>
            <button onClick={handleClick}>
                Remove from dom
            </button>                            
        </>     
    )
}



//-------------------------- Gestures
/* 
            Gestures are event handlers that trigger animation
            when the event is triggered. These props will accept
            an object with css properties

            Event handlers that start with 'while' will provide a built 
            in way of creating an animation

            Event handlers that start with 'on' are more optimized for
            creating animations. They trigger animations more smoothly
            compared to the default event handlers in React
*/

function App() {
  return (
       <motion.div 
          initial={{opacity: 0}}

          whileHover={{scale: 1.2, transition: {duration: 2}}}   
          onHoverStart={(e) => {}}                 //function that fires when the user hovers over the element
          onHoverEnd={(e) => {}}                   //function that fires when the users mouse leaves the element

          whileTab={{scale: 0.9}}                  //gesture for click events
          onTabStart={(e, info) => {}}             //function that fires when the tab start on the element (info = {point: {x, y}})
          onTabCancel={(e, info) => {}}            //function that fires when the tab ends (info = {point: {x, y}})

          whileInView={{opacity: 1}}               //gesture for elements that first appear in the viewport
          viewport={{once: true}}                  //the whileInView gesture will only run once

          whileDrag={{color: 'red'}}               //gesture for elements that are currently being dragged
          onDragStart={(e, info) => {}}            //function that fires when the user starts dragging the element
          onDragEnd={(e, info) => {}}              //function that fires when the user stops dragging the element

          whileFocus={{scale: 1.2}}                //gesture for input elements or any element that receives focus

          onPanStart={(e, info) => {}}             //function that fires when the user presses down on an element and then moves away at least 3 pixels  (info = {point: {x, y}})  for mobile -> touch-action: none; this will disable pan on mobile device
          onPanEnd={(e, info) => {}}               //function that fires when the user stop panning
      />          
    )
}



















//======================================================== IMPERATIVE ANIMATIONS: HOOKS ================================================================================================


//-------------------------- useCycle() hook
/* 
            useCycle() hook is similar to useState(), it is used to toggle between two different sets of styles
*/


function App() {
    const [toggle, setToggle] = useCycle(false, true);               //toggle will have either true or false as the values, setToggle() is a function used to toggle between true and false

    const handleClick = () => {
        setToggle();
    }

    return(
        <>
            <motion.div
                initial={false}                                          // we have to set initial to false for useCycle to work here
                animate={toggle ? {color: 'red'} : {color: 'blue'}}>                             
            </motion.div>    

            <button onClick={handleClick}>                              //clicking on this button will toggle between the 'open' styles and the 'closed' styles
                click me
            </button>    
        </>

    )
}





//-------------------------- useAnimate() 
/* 
            useAnimate() can be used to create complex animations. 
            The hook retuns a ref object that can be assigned to a component,
            and also returns a function that returns a callback that can
            be used to trigger animations

            syntax:
                        const [ref, animate] = useAnimate();

                        const promise = animate(selector, animateTo, transition)                       //returns a promise

                                 selector = can be any valid css selector, can also be a ref object returned from useAnimate()
                                 animateTo = an object that has css properties, the element will animate to these values
                                 transition = an object that has the transition properties for the animation
*/


import {useAnimate} from 'framer-motion';

function App() {
    const [ref, animate] = useAnimate();    

    const createSequenceAnimation = async () => {
          await animate(ref.current, { x: 0 }, {duration: 0.5})                      
          await animate(ref.current, { x: 100}, {duration: 0.5, delay: 2})                   
          await animate(ref.current, { x: 20}, {duration: 0.5})
          await animate('div', {y: 45}, {duration: 0.4})                                   // you can also use any valid css selector in the first argument
    }

    const stoppingAnimation = () => {
          const animating = animate('#box', {y: -20});
          animate.stop();                                                                  // you can stop an animation with the .stop() method
    }

    return(    
        <div ref={ref}></div>
    )
}





//-------------------------- useAnimationControls()
/* 
            useAnimationControls() hook lets you create complex animations.
            This hook also provides a way to start and stop animations.

            const controls = useAnimationControls();

            controls.start();                        //starts an animation , returns a promise
            controls.set();                          //instantly sets a css property and skips the animation, does NOT return a promise
            controls.stop();                         //stops the ongoing animation, does NOT return a promise
*/

function Animate() {
    const controls = useAnimationControls();  

    const animation = async () => {
            await controls.start({ scale: 2 , transition: {type: 'spring'}})                
            await controls.start('visible');                                                //you can trigger an animation from a variant object  
            await controls.start(custom => ({                                               //you can use a custom prop to pass data to this callback
                 scale: custom * 3       
            }))
            controls.set({backgroundColor: red});                                           //instantly sets a property and skips the animation
            controls.stop();                                                                //stops any ongoing animations
        }

    return (
            <div 
               custom='3' 
               initial='hidden' 
               animate={controls}>
            </div> 
      )
}


































//======================================================== DECLARATIVE ANIMATIONS: DRAGGABLE PROPS ================================================================================================
/* 
            Framer-motion has alot of 'drag' props that can be used to 
            animate a draggable component
*/


//-------------------------- Draggable Components
/* 
       To make a component draggable, you only need to set the 'drag' prop
       you can set drag='x' or drag='y' to force the element to only drag on the x-axis or y-axis  
*/

function App() {
    return(
        <motion.div drag> </motion.div>
    )
}


//-------------------------- Draggable Components with constraints
/* 
       You can create constraints on a draggable component.
       The component can't be dragged past a certain constraint
*/
function App(){
    return(
        <motion.div
            drag
            dragConstraints={{            
                  top: 50,                    // component can be dragged 50px to the top from the origin                        
                  left: 50,                   // component can be dragged 50px to the left from the origin  
                  right: 50,                  // component can be dragged 50px to the right from the origin  
                  bottom: 50,                 // component can be dragged 50px to the bottom from the origin  
            }}>
    )
}


//-------------------------- Draggable Components using Parent Components as Constraints
/* 
            You can use a parent component as a constraint for a 
            draggable child component. You can do this by assigning
            the same ref object to the parent component and to the child component's
            dragContraints prop. The child component won't be able to be dragged
            outside the parent component
*/

function App() {
       const constraint = useRef();     

       return (
            <motion.div ref={contraint}>       
                   <motion.div
                         drag
                         dragConstraints={constraint}
                   />
            </motion.div>
       )
}




//-------------------------- Drag and Drop Components
/*
            You can use the 'onDragEnd' prop to see if a dragged component
            has been dropped on top of a drop zone. Then you can add the 
            dragged component as an item to a list with the useState() hook, 
            and then use the drop zone to display all items that have been dropped.
*/
function DragDropExample() {
  const [droppedItems, setDroppedItems] = useState([])

  const isOnDropZone = (e, info) => { 
       const dropZone = document.getElementById("drop-zone").getBoundingClientRect();
              
       if(info.point.x >= dropZone.left && info.point.x <= dropZone.right && 
          info.point.y >= dropZone.top && info.point.y <= dropZone.bottom)
              setDroppedItems([...droppedItems, 'new item'])     
  }

  return (
    <div>
      <motion.div drag onDragEnd={isOnDropZone}>
             Drag Me
      </motion.div>

      <motion.div id="drop-zone">
            Drop Here
            {droppedItems.map(() => {})}
      </motion.div>
    </div>
  );
}



//-------------------------- Miscilleneaous Draggable Props

function App() {         
    return(
        <motion.div     
            dragSnapToOrigin={true}        // this will force the element to go back to its origin when the user stops dragging the element
            dragElastic={1}                // must be a value between 0 and 1; the degree of movement allowed outside of constraints
            dragMomentum={true}            // applies momentum (element keeps moving) when the user stops dragging the element
            dragPropagation                // if a child component is dragged, it will also drag the parent component with it
            dragListener={false}           // setting this to false will ensure that this element can ONLY be dragged using useDragControls()
            dragTransition={{              // applies an animation when the user lets go of the draggable element and hits one of the contraints
                bounceStiffness: 600,      // the animation takes the form of a spring
                bounceDamping: 10 
            }}
          />
      )
}















//======================================================== IMPERATIVE ANIMATIONS: DRAGGABLE HOOKS ================================================================================================


//-------------------------- useDragControls()
/* 
            You can use the useDragControls() hook to control when and how a component 
            can be dragged. Instead of relying on the user manually dragging the component,
            you can programmatically enable the dragging.

            const dragControls = useDragControls();   // dragControls must be assigned to the dragControls prop of the component you want to enable dragging

                        dragControls.start();         // start() method enables dragging on a component
                        dragControls.end();           // end() method prevents dragging on a component
                        dragControls.isDragging;      // isDragging property tells you if the component is currently being dragged
*/

function DragControls () {
  const dragControls = useDragControls();

  const startDrag = (e) => {
      dragControls.start(e, {snapToCursor: true})
  }
  
  return(
      <button onPointerDown={startDrag}>            
          Click here to enable dragging
      </button>
      <motion.div 
        className={'box'} 
        dragControls={dragControls}
        dragListener={false}                        // prevents default dragging, this component can only be dragged if the .start() method was called
      />
  )
}
























//======================================================== DECLARATIVE ANIMATION: SCROLLING PROPS ================================================================================================
/* 
            You can create scrolling animation by using the 'viewport' props in motion components
*/


//-------------------------- whileInView Props
/* 
            You can use the whileInView props to enable animation when the 
            component first enters the screen
*/
function App() {
    return(
          <motion.div 
            className={'circle'}    
            initial={{opacity : 0}}
            whileInView={{opacity: 1, transition: {duration: 0.7}}}   
            onViewportEnter={(entry) => {}}          //function that is fired when the element appears in the viewport (Provides the IntersectionObserverEntry with details of the intersection event)
            onViewportLeave=((entry) => {})          //function that is fired when the element leaves the viewport  (Provides the IntersectionObserverEntry with details of the intersection event)
          />
    )    
}


              

//-------------------------- viewport Props
/* 
            You can use viewport props to customize the behavior of
            scrolling animation
            
*/

function App() {
    const containerRef = useRef();
  
    return(
        <div ref={containerRef} style={{overflow: 'hidden'}}> //(this must have a scroll bar)
            <motion.div 
              initial={{opacity: 0}}
              whileInView={{opacity: 1}   
              viewport={{
                  once: true,           // animation will only occur once
                  root: containerRef,   // by assigning a ref object here, the container that has this same ref will act as the viewport
                  margin: '100px',      // The more margin, the longer it will take for the viewport to see the element, the less margin, the less it will take to see the element in the viewport                       
                  amount: 0.6,          // define the percentage of the element that has to be in view for the scrolling animation to occur  (0 to 1)      
              }}                
            />
       </div>
    )
}
  










//======================================================== IMPERATIVE ANIMATION: SCROLLING HOOKS ================================================================================================
/* 
            You can use the useScroll() hook to get current progress of scrolling on the x-axis and y-axis
            within a container that has a scrollbar


            const {scrollYProgress, scrollXProgress } = useScroll()
            
            ____________
            |          |
            |          |
            |          |            <--- if scroll bar is halfway, then scrollYProgress will be 0.5
            |          |
            |__________|
*/

function Circle() {
    const {scrollYProgress, scrollXProgress } = useScroll();        //we get the current value of the scroll position on the y-axis
  
    return(
          <motion.div 
            className={'circle'}         
            style={scaleX: scrollYProgress}                         //this component will be resized based on the current value of scrollYProgress                                     
          />
    )    
}

















//======================================================== DECLARATIVE ANIMATION: GRID/FLEX ANIMATIONS ================================================================================================
/* 
            You can also create animation for grids and flex boxes with the 'layout' prop
*/

//-------------------------- layout Prop
/* 
            The 'layout' prop in the motion component can automatially add animation to a grid or flex box
            Layout animations are triggered when a grid's items has changed because of a re-render (items are removed, re-arranged, or added).
            If there is a property that you dont want to animate with layout, you will need to set the inline styles for that property
*/



function App() {
    const [list, setList] = useState();

    return(
        <motion.div className='grid' layout>       
             <motion.div className='box' layout/>          // setting layout to the child components can fix a distortion bug that occurs sometimes
             <motion.div className='box' layout/>  
             <motion.div className='box' layout/>
        </motion.div>    

    )
}


//-------------------------- layoutScroll
/* 
            If a grid/flex container has a scrollbar, then you need to use the 'layoutScroll' prop
            to trigger animations when the items of the grid have changed
*/
function App(){
     return(
          <motion.div className={'gridWithScroll'} layoutScroll style={{overflow: 'scroll'}}>     
             <motion.div className={'box'} layout></motion.div>    
             <motion.div className={'box'} layout></motion.div>    
             <motion.div className={'box'} layout></motion.div>
          </motion.div>    
     )
}



//-------------------------- <LayoutGroup/> Component
/* 
    The <LayoutGroup/> component ensures that when one component has its layout changed, the other layouts will be smoothly moved
    
    [accordion]                  [accordion]
    [accordion]                      content
                                     content
                                  [accordion]              //this accordion will have an animation when its pushed down
*/

function Accordion() {                                      //this component will display a drop down
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}>
        <motion.h2 layout>header</motion.h2>
        {isOpen ? 'content' : null}
    </motion.div>
  )
}

function App() {                                           // with LayoutGroup, the accordion on the bottom will be pushed down smoothly
  return (                                                 // when the accordion on the top is spread open
    <LayoutGroup>          
      <Accordion />
      <Accordion />
    </LayoutGroup>  
  )
}
    



//LAYOUT-ID: When a new component is added that has a layoutId prop that matches an existing component, 
//it will automatically animate out from the old component.
//MAKE SURE TO DISABLE TRANSITION CSS PROPERTY ON THE ELEMENTS THAT HAVE LAYOUTID
//ALSO MAKE SURE TO USE THE KEY PROP ON THE MOTION COMPONENT WITH LAYOUTID THAT HAS A IMG ELEMENT AS A CHILD ELEMENT TO AVOID VISUAL BUGS

/* 
     [ ________             ]        

              |
              |            //there will be an animation that occurs here
              v
     
     [           __________ ]
*/

function App() {
  const [example, setExample] = useState(false)

  return (
    <div className={'container'}>
        <div className={'box'}>
          {example && <motion.div className={'line'} layoutId="underline" />  }   // this line will move to the element on the bottom when it's removed from the dom
        </div>
        <div className={'box'}>
          {!example && <motion.div className={'line'} layoutId="underline" />  }  //this line will move to the element on the top when it's removed from the dom
        </div>
    </div>

  )
}
    


















//========================================================================================== HOOKS ======================================================================================
const x = useMotionValue();              // motion values are objects that are assigned to the style attribute of elements
                                         // they are used to keep track of a specific css property
                                         //in this case, x will keep track of the elements position on the x-axis
                                         // you can assign x to one of the hooks below to apply a different animation to a different css property


const {scrollYProgress,                   //current value of the y-axis scroll position
       scrollXProgress                    //current value of the x-axis scroll position
      } = useScroll();                    //returns a motion value that contains data about the scrolling position of the webpage


const scaleX = useSpring(x, {            // useSpring() accepts a motion value and will return another motion value
    stiffness: 100,                      // the returned motion value will be used to create an animation that resembles a spring
    damping: 30,                         //in this example, any changes made to x will make scaleX grow or shrink
    restDelta: 0.001
})


const background = useTransform(         //useTransform() accepts a motion value and will return another motion value
    x,                                   //the returned motion value will be used to create an animation that changes the background color
    [-100, 0, 100],                                                // we map these values            
    ["linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",  //to these values
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"]
  )


              
const dragControls = useDragControls();   //useDragControls() can drag an element A by click on another element B
const startDrag = (e) => {                //you will need an event handler that calls the start() function
    dragControls.start(e, {snapToCursor: true})//the start() function will drag the element B
}
    <button onPointerDown={startDrag}>      //Element A calls the event handler
       click me
   </button>
   <motion.div 
      className={'box'} 
      dragControls={dragControls}          //Element B will be dragged
    />
              


const [x, cycle] = useCycle({x : -100}, {x: 120});            //hook that lets you cycle between two animations

    <div animate={x} onTapStart={() => cycle()} onTapEnd={() => cycle()}>
                
    </div>











//==================================== useScroll() and useSpring() ====================================================

/*  
    useSpring() is a hook that returns a motion value and will animate a certain css property based on stiffness, damping and restDelta props
    useScroll() is a hook that returns 4 values; 

    scrollYProgress: the current progress of the scroll position of the viewport (y-axis) 0-1
    scrollXProgress: the current progress of the scroll position of the viewport (x-axis) 0-1

    In the example below, we are using useScroll() and useSpring() together to create 
    an animation that expands an element based on the progress of the scroll in the viewport's y-axis
    We create the illusion of a progress bar that stays fixed to the top of the viewport
    and will grow or shrink as the user scrolls down or up
*/

import {motion, useScroll, useSpring}

function ProgressBar() {
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,         //how fast the animation occurs
        damping: 30,            //how fast the animation ends
        restDelta: 0.001
    })

    return(
        <motion.div className={'progress-bar'} style={{scaleX}} />  
    )
}

/* 
    .progress-bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 10px;
        background-color: red;
        transform-origin: 0%;
    }
*/














//================================== useMotionValue() and useTransform() =============================================================
//These two hooks are used together to keep track of changes during an animation
//useMotionValue returns a motion value, a variable that keeps track of the changes of a specific css property
//Basically, you can change an Element A by assigning a motion value to Element B, any changes made to element B will affect Element A

import {motion, useMotionValue, useTransform } from 'framer-motion';

function App() {
  const x = useMotionValue(0);                          //this motion value will keep track of changes in the x-axis of an element
  const background = useTransform(                      //useTransform() will use the motion value and create animations based on the current value
    x,
    [-100, 0, 100],                                     // if x is -100, then we will animate to the first linear gradient in th 
    ["linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"]
  )

  return(
      <motion.div className={'container'} style={{background}}> //the background color will change as you drag the child element
          <motion.div 
            className={'box'} 
            style={{x}}                                 //you must assign the motion value to the style prop
            drag='x'                                     //when this component is dragged, it will cause changed to the motion value
            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}>
          </motion.div>      
      </motion.div>
  )
}



//useTransform() with functions
function TransformWithFunctions() {
    const count = useMotionValue(0)
    const rounded = useTransform(count, latest => Math.round(latest))    //passing a function to the second argument can be used to format the motion values
    const [,animate] = useAnimate();
  
    useEffect(() => {
        const controls = animate(count, 100, {duration: 1.2})
        return controls.stop
    }, [])
    
    return <motion.div>{rounded}</motion.div>
}




































