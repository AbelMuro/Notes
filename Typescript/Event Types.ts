
//==================================================== EVENT TYPES ====================================================
/* 
      The real DOM has a list of built-in Event Types that can be used in
      event handlers. 

      Some libraries like React have their own Event types that must be used if
      the event handler is assigned to a JSX element
*/

/* 
        Event Types

    With every event listener or event handler, each event should be statically typed with the following
    built-in event types in TS
*/

const event : ClickEvent<>;            //some event types are generic, meaning that you must pass a DOM node type

const event : InputEvent<>;

const event : WheelEvent;

const event : PointerEvent;

const event : DragEvent;

const event : FocusEvent;

const event: SubmitEvent;


/* 
       DOM node types

    With every event type that requires a generic value, you must use the following DOM node types
    to enforce an event to only be triggered by a certain element
*/

HTMLDivElement;            
HTMLInputElement:
HTMLSectionElement:
HTMLArticleElement;
HTMLFormElement;



/* 
      'as' keyword

    You can use the 'as' keyword to convert an object that represent a node to an actual DOM node
*/


const element = document.querySelector('.someClass') as HTMLDivElement;

const handleClick = (e: ClickEvent<HTMLDivElement>) => {
       const targetElement = e.target as HTMLDivElement;            //type casting the target object into a DOM node
}

