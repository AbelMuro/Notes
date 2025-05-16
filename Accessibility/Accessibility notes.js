/* 
            Accessibility is the idea that your website or application is accessible to all types of people.
            Web development uses the Web Content Accessibility Guidelines (WCAG) to set the standard in
            accessibility. WCAG uses 4 principles to set the standard.

                  Perceivable: Content should be available to all senses. This includes providing alternative text for images, captions for videos, and clear, readable text.
                  Operable: Users should be able to navigate and interact with the site using various input methods, such as keyboards and screen readers.          
                  Understandable: Information and UI components should be clear and intuitive. Avoid overly complex layouts and jargon.             
                  Robust: Websites should be compatible with different assistive technologies and future-proofed for evolving standards.

*/










//================================================ SEMANTIC HTML ================================================
/* 
            Semantic HTML is using HTML tags that describe its content in the tag name.
*/

        <p></p>
        <ul></ul>
        <main></main>
        <nav></nav>        












                    



//================================================ FOCUS ================================================
/* 
            You can use the :focus element to apply a certain style 
            to an element when it is focused on. This is useful for users
            that rely on a keyboard to navigate through the website (using Tab for example).
*/

input:focus {
  border-color: #008000;
  box-shadow: 0 0 5px #008000;
}


button:focus:not(:focus-visible) {            // :not(:focus-visible) will prevent the focus style from being applied if the user clicked on the element
  outline: none;
}







                    


                    



//================================================ ARIA ATTRIBUTES ================================================
/* 
            ARIA attributes are used to describe the functionality of the HTML tag. These attributes
            can be usefull for certain features in a web application that cannot be described properly
            with semantic HTML alone.
*/

                    
//--------------------- aria-label
/*
    Provides a label for elements that lack visible text (e.g., a button with just an icon).   
*/

<button aria-label="Search">
     <img src="search-icon.png" alt="" />
</button>


                    
//--------------------- aria-labelledby
/* 
     Specifies another element as a label for the current element.
     The specified element must have an id that matches the value assigned
     to aria-labelledby.
*/

<h2 id="section-title">
      'Featured Articles'
</h2>
          
<section aria-labelledby="section-title">
      'Latest articles curated for you.'
</section>



//--------------------- aria-describedby
/* 
      Specifies another element as a description for the current element.
      The specified element must have an id that matches the value assigned
      to aria-describedby.
*/

<p id="username-help">
     'Enter a unique username with at least 6 characters.'
</p>                    
<input type="text" aria-describedby="username-help">



//--------------------- aria-hidden
/* 
      Hides content from screen readers. The icon inside
      of a button should use the aria-hidden attribute
*/

<img src="decorative-image.jpg" aria-hidden="true" alt="">



//--------------------- aria-live
/* 
        Announces dynamic content updates to users without 
        requiring them to manually refresh. This attribute
        can have two values; polite or assertive
*/

<div aria-live="polite"> 
       'You have a new message.'
</div>



//--------------------- aria-expanded
/* 
        Indicates whether expandable content (like a dropdown menu) 
        is open or closed. 
*/

<button aria-expanded="false">
       Menu
</button>


                    
//--------------------- aria-controls
/* 
        Shows that an element controls another, useful for things 
        like tabs and accordions.
*/

<button aria-controls="menu">
      Toggle Menu
</button>
                    
<nav id="menu">
     <a>Home</a>
     <a>About</a>
     <a>Contact</a>
</nav>



//--------------------- aria-disabled
/* 
      Marks the current element as disabled
*/

<button aria-disabled="true">
      Proceed
</button>

                    

//--------------------- aria-required
/* 
       Indicates a required input field     
*/

<input type="text" aria-required="true">



//--------------------- aria-invalid
/* 
      Indicates an input that is invalid. You 
      may have to change the attribute dynamically.
*/

<input type="email" aria-invalid="true">      


                  
//--------------------- aria-current
/* 
     Marks the currently active element. The attribute
     will accept the following values
     
            page:       The current page within navigation.
            step:       The current step in a multi-step process.
            location:   The current location within a map or environment.
            date:       The currently selected date in a calendar.
            time:       The current time selection in a time-based widget.
            true:       A generic way to indicate the active element.
            false (default) – The element is not current.
*/

<a aria-current="page">
        Home
</a>                  
                    

                    
//--------------------- aria-role
/* 
      Defines the type of role the element has.      
      Aria-role can ONLY accept the following values.

            banner:        Identifies the site header.
            main:          Represents the main content.
            navigation:    Marks navigation links.
            complementary: Indicates secondary content (like a sidebar).
            contentinfo:   Defines footer information.
            
            button:        Defines a clickable button.
            checkbox:      Represents a checkbox input.
            progressbar:   Displays a progress indicator.
            slider:        Defines a draggable slider control.
            tab:           Represents a tab within a tablist.
            tooltip:       Provides additional information when hovered.

            alert:         Announces urgent information.
            log:           Displays real-time updates.
            status:        Provides non-intrusive updates.

            dialog:        Represents a modal or dialog box.
            alertdialog:   A dialog with an urgent alert.
*/

<div role="alert">
       Warning! Incorrect password.
</div>










                    


