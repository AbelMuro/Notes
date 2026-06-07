/* 

					                 PROTOTYPE INHERITANCE
                           
			     Prototype inheritance allow objects in javascipt to inherit methods and properties from 
      		 other objects. Every function constructor in javascript has a property called prototype. This prototype 
	    		 property is an object that has methods and properties that can be used by the objects constructed from the 
	  		   constructor. This same prototype object has ANOTHER property called prototype that points to the Object Prototype,
			     and this prototype has another collection of method and properties that can be used by the object itself.
      		 This is what creates the prototype chain in javascript. When a method inside an object is called, javascript 
	    		 will first look for the definition of the method inside the object, if it doesn't find it there, then it 
	  		   looks up the prototype chain for the definition. The examples below shows how prototype is used in javascript



				-------- VISUAL ---------
    
	    				[[Prototype]] is an internal reference that links an object/array to its prototype
					    Every reference-type in javascript has this internal reference.
	    			  and every instance of a function constructor also has this internal reference
	
	    				const array = [];  		                   //this is the same as new Array()
					   |
					   |
					   |
					   |
					    ---> [[Prototype]]  --> Array.Prototype = {
                          										push, 
                          										pop, 
                          										filter, 
                          										map, 
                          										[[Prototype]]  -->  Object.Prototype = {
                          							}			     		                   toString, 
                          														                   hasOwnProperty, 
                          														                   [[Prototype]] -------> null
                          														              }	             	     					


*/
// 				------- CUSTOM PROTOTYPE -------

	     				function Person(name) {
		 			        this.name = name
					    }
	
	    				Person.prototype.greet = () => {		            // Using prototype will save memory in JS because you create only one instance of this method
					         console.log(`Hello ${this.name}`);		      // declaring the greet method inside the constructor will create an instance of the method
					    }						                                    // EVERYTIME we create an object from the Person() constructor
	
	    				const carlos = new Person('Carlos');
	 				    carlos.greet();


//				------- ARRAYS PROTOTYPE (most reference-types in JS follow this pseudo implementation) -------

  				    function Array() {			        // pseudo code
	     				    this.array = [];
				      }

       				Array.prototype.push = () => {}
	    				Array.prototype.pop = () => {}
	 				    Array.prototype.map = () => {}

      			  const myArray = new Array();		// same as myArray = []
	   				  myArray.push(1);
     
