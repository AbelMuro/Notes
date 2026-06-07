  
//============================================================== THIS ============================================================== 
/* 
    THIS is a keyword that refers to an object that owns a function that was called


          ----- VISUAL
    
          window.first.second.third.myMethod();
    
          function myMethod() {
              console.log(this);                    // this will refer to the 'third' object
          }
*/

//-------------------THIS in the global scope


this;                                       //if you use THIS in the global scope, then it refers to the global object Window





//-------------------THIS in regular functions
//THIS in functions refers to the object that calls/invokes the function
//For an object to 'own' a function, the function must be one of the 
//properties of the object

//myObject 'owns' the function 'myMethod'
let myObject = {
      name: "abel",
      age: 29,
      myMethod: function() {                  //since we assigned this function to one of the properties of myObject, this function belongs to myObject 
            function inner(){}                //this inner function is not owned by myObject, it is owned by Window global object
            return this.name + this.age;      //THIS refers to myObject
      }
}

//Window 'owns' this function
function myFunction(){
    return this;                            //this will also return the global window object;
}

window.myFunction();                       //all functions are part of the window object






//------------------- THIS in arrow functions
//THIS in arrow functions refers to the parent object of the object that owns the arrow function
//remember, that functions in javascript are also objects


//arrowFunction doesnt have a parent object, so THIS will just point to the window object
window.arrowFunction();
let arrowFunction = () => {
      console.log(this);                              //this will return the window object
}

//Parent Object of myObject is the window object
window.myObject.myMethod();                           //THIS in myMethod will point to the window object because its the parent object
let myObject = {
      name: "john",
      age: "24",
      myMethod: () => {
          console.log(this);                          //even though this arrow function is 'owned' by myObject
      }                                               //THIS will refer to the parent object of myObject, which 
}

//innerFunction is still owned by the window object
window.innerFunction();
function outerFunction() {
      let innerFunction = () => {console.log(this)}    //this arrow function doesnt belong to myFunction()
}





