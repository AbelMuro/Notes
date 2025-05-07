

//============================================================== JQUERY ==============================================================


//------------------------------------------syntax:  $(element).action(speed, callback)   speed="slow", "fast" or milliseconds----------------------------------
//                                                  $(element).action(speed) is also allowed
//make sure to specify the ancestral elements to select a specific element


//the methods below can call a function AFTER the effect is finished
// if you call a function after the method .show(), the function will be called before the method finishes
$("#my_id");                                                    // ID selectors
$(".class_name");                                               // class selectors
$("*");                                                         // selects all elements
$("p").hide();                                                  // will hide all <p> elements, remember that .hide(speed, callback), speed can be in milliseconds, "slow" or "fast"
$("p").show();                                                  // will show all <p> elements, remember that .show(speed, callback) -> .show(1000, function(){}).... the function is executed after .show 
$("p").toggle();                                                // toggles between show and hide
$("p").fadeIn();                                                // element will fade in, also this method has the same parameters as .show and .hide
$("p").fadeOut();                                               // same as .show(), except it fades out
$("p").fadeToggle();                                            // same as .show(), except it toggles between fading in and out
$("p").fadeTo();                                                // same as .show(), except it has another parameter .fadeTo(speed, opacity, callback), opacity must be a number between 0 and 1, the element will fade to that opacity
$("p").slideDown();                                             // displays an element by "sliding down" from another element. .slideDown(speed, callback) -> the parameters are the same as .show()
$("p").slideUp();                                               // hides an element by "sliding up" towards another element... function syntax is the same as above
$("p").slideToggle();                                           // toggles between sliding up or down, function syntax is the same as .slideDown()
$("div").css("color", "red").slideUp().slideDown();             // CHAINING METHODS: the methods will be called in the order that it is written
$("div").wrap(<p></p>);                                         // wraps around <div> with a <p>


//inserting elements inside existing elements
$("div").append("<p> some element </p>");                        // appending element at the end of div element
$("div").prepend("<p> some element </p>");                       // appending element at the beginning of div element


//get and set methods for elements are below
$("p").text();                                                  //returns the text inside all <p> elements
$("p").text("<b> setting text for this element </b>");          //setting the specified text inside <p>, remember that you can also assign pre formatted text or any element inside .text()  
$("p").text(function(index, origText){ })                       //the function will be called and will return the content that will replace whaever is inside <p>...... also, index means the current element in the list of elements selected (if more than one <p> is selected)
$("<p></p>").text("this goes inside");                          //this will return a string: "<p> this goes inside </p>""
$("p").html();                                                  //returns the entire content inside <p> including any formatting tags (<b>, <pre>, etc...) as text
$("p").html("<b> setting pre formatted text </b>");             //setting text that is pre formatted by some tag                                                  
$("input").value();                                             //returns the value that a user inputted
$("div").attr("backgroundColor", "red");                        //changing the attribute background color of every <div> to red
$("div").attr("backgroundColor", function(index, origValue){}); //same as the callback function in .text()
$("div").attr({                                                 //you can change multiple attributes like this
    "backgroundColor": "blue",
    "textAlign": "center",
    "color" : "green"
});
$("div").remove();                                               //removes the selected element from the document, including any child elements
$("div").empty();                                                //removes the child elements from the parent containter
$("div").addClass("my_class other_class");                       //adding two new css classes to every element <div>
$("div").removeClass("my_class");                                //removing my_class from every element "div" 
$("div").toggleClass("my_class");                                //this method will toggle between addClass() and removeClass()

//dimension methods are below, remember that you can set a width/height for an element by .width(500)
$("div").width();                                               //returns the width of the element, excluding any padding, border or margin
$("div").height();
$("div").innerWidth();                                          //returns the width of the element, inludes padding but not border or margin
$("div").innerHeight();
$("div").outerWidth();                                          //returns the width of the element, includes padding and border, but not the margin
$("div").outerHeight();
$("div").outerWidth(true);                                      //returns the width of the element, inluding all padding, border and margin
$("div").outerHeight(true);
$(window).width();                                               //returns the width of the viewport, this can be extremely useful
$(window).height();

//jquery arrays
$.makeArray($("div"));                                            //returns an array



//--------------------------------------------event handlers, the above methods can go inside the functions() {} below that are nested inside the parameters-----------------------------------------------
$("p").click(function(){ $(this).hide() });                     //this keyword refers to the <p> element
$("p").hover(function(){});
$("input").focus(function(){});
$("p").on("click", function(){});                               //you can add more than one event handler inside the "on()" method
$("p").on({                                                     //same as above but just different syntax
    click: function(){},
    mouseenter: function(){},
    mouseleave: function(){}
});





//--------------------------------------------CSS with jquery syntax------------------------------------------------------------
$("div").css("background-color","red");             // changing the css attribute of every <div>
$("div").css("background-color");                   /// when you omit the second parameter, the method will return the value of background-color
$("div").css({                                      // you can set multiple attributes with this method
    "background-color" : "yellow",
    "color" : "red",
    "text-align" : "center"
});
$("div p");                                         // selects every <p> that is nested within every <div>
$["div, p, section"];                               // selecting all <div>, <p>, <section>
$("div[color=red]");








//---------------------------------------------ANIMATE with jquery--------------------------------------------------------------

//make sure to rememeber to set the position of the element as either relative, fixed, or absolute to actually move it
//you can animate almost ALL css properties, just remember that the syntax is paddingLeft instead of padding-left

$("div").animate({
    left: "250px",                          //moving the object towards a position that has a distance of 250px from the left of the viewport
    opacity: "0.5",                         //during the duration of the animation, the element will become half transparent
    height: "150px",                        //during the timeline of the animation, the element will become bigger and bigger until it reaches 150 px in height
    width: "150px",                             // and 150px in width        
    });
//if height:"+=150" then this means that 150 will be added to the current height of the element 
$("div").animate({ fontSize: "100px"}, "slow");     //the second parameter of .animate() can take slow, fast or a value in milliseconds, this means that the element will have a "slow" animation and stop until it reaches 100px


//when you create multiple .animate(), jquery will call the methods one by one
$("div").animate({height:"250px"});
$("div").animate({height:"250px"});
$("div").animate({height:"250px"});
$("div").animate({height:"250px"});
$("div").stop();                                //stops the current animation,  .stop(stopAll, goToEnd)  ->  stopAll is boolean, specifies whether to stop all queued animations, goToEnd is boolean, specified whether to go to end of animations 









//---------------------------------------document ready function-------------------------------------------

$(document).ready( function(){} );                              // this will call the specified function when the document has finished loading
$(function(){});                                              // this does the same thing as above
