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










//================================================ ARIA ATTRIBUTES ================================================
/* 
            ARIA attributes are used to describe the functionality of the HTML tag. These attributes
            can be usefull for certain features in a web application that cannot be described properly
            with semantic HTML alone.

              Common ARIA attributes:
 
                    aria-labelledby:  Links an element to another that serves as its label (similar to aria-label but references an existing element).                
                    aria-describedby: Associates an element with additional descriptive information.                
                    aria-hidden:      Hides content from screen readers (useful for decorative elements).               
                    aria-live:        Announces dynamic content updates to users without requiring them to manually refresh.              
                    aria-expanded:    Indicates whether expandable content (like a dropdown menu) is open or closed.               
                    aria-controls:    Shows that an element controls another, useful for things like tabs and accordions.
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
     Links an element to another that serves as its label (similar to aria-label but references an existing element).
*/

<h2 id="section-title">
      'Featured Articles'
</h2>
          
<section aria-labelledby="section-title">
        'Latest articles curated for you.'
</section>











