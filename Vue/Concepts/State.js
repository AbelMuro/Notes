/* 
                                 STATE UPDATE PROCESS
                                 
        A component will be re-rendered (updated) when there is a change in the state object.
        All updates to the state are synchronous, but all updates to the DOM behave asynchronous.
        Vue will wait until the callstack is empty before triggering a re-render, but if the callstack contains
        an async function, it will be taken out of the callstack and Vue will immediately trigger a re-render

                    const handleClick = () => {
                            setLoading(true);               // we schedule a change in the loading state
                    }                                       // once we exit from the function, React will update the state and cause a re-render

                    const handleClick = async () => {
                          setLoading(true);                // scheduling a state update 
                          await fetch();                   // React will immediately trigger the state update and re-render for setLoading(true), before this async function is taken out of the callstack
                          setLoading(false)                // scheduling another state update
                    }                                      // once we exit from the function, React will trigger the state update and re-render for setLoading(false) 
*/






/*
<!-- ===================================================== STATE ============================================================ -->
<!-- 
    You can create a state object within your single-file component with the ref() and reactive() function

    Using the ref() and reactive() functions will have deep reactivity by default

        const countRef = ref(0);                                    // you must use .value within the script tag, but not inside the template tag
        const countReactive = reactive({count: 1, people: 23});     // you don't have to use .value within the script tag or the template tag


    Using the shallowRef() and shallowReactive() will have shallow reactivity by default 
        (follows the same rules for .value as ref() and reactive())

        const countRef = shallowRef();                                     // will keep track of the 'value' property only (but NOT its nested objects)
        const countReactive = shallowReactive({count: [{n: '2'}, 2, 3]})  // will keep track of ALL the properties (but NOT its nested objects)



    Facts to keep in mind
        -When you create a state object in Vue, the state object will automatically be unwrapped
         meaning that you don't have to use the value property of the state object.
         Unwrapping only occurs if the ref() or reactive() functions are at the top level of your script
         REMEMBER, uwrapping only occurs in the template, NOT in the script

                const state = ref(10);
                console.log(state);            //you dont need the 'value' property here

                const otherState = reactive({name: 'carlos', age: 23});
                otherState.name;               //you dont need the 'value' property here

        -When you have a state object that contains an array of other state objects,
         those state objects will not be unwrapped automatically

                const stateOne = ref(2)
                const stateArray = ref(['1', 34, stateOne]);
                stateArray[2].value;            //you need to use the 'value' property

                
        -Do not pass down state as props directly
        -You can mutate the property values of a state directly
        -You can assign a state object as a property to another state object, 
         any changes made to the state object will affect the parent state object

                const stateOne = ref(1);
                const stateTwo = reactive({            //changes made to stateTwo will also reflect on stateOne
                    stateOne
                });

                stateTwo.stateOne = 10;
                console.log(stateOne.value);           //will log 10
            
        -Do not destructure your state object, doing so will disconnect the destructured variable from the state

                const state = ref(0);
                const { count } = state;
                count++;                           //this will not trigger a re-render
            
        -When you pass the state object to a function, make sure to pass the whole object to retain reactivity
         if you pass an individual property to a function, you are only passing a copy of that value

                const count = ref(0);
                someFunction(count);               //changes made to count will cause a re-render
                otherFunction(count.value);        //changes made to count.value will NOT cause a re-render
                

        -All updates to the state are synchronous, but updates to the DOM are asynchronous
         When you update multiple state objects, Vue will wait until all states have been updated,
         then Vue will update the DOM by causing a re-render
         If you want to change the state, update the dom, then change the state again synchronously, use the nextTick() function

                async function incremenentThenDecrement() {
                    count.value++;                     
                    await nextTick();     //you can force a re-render here to update the DOM, instead of waiting for all states to be updated first
                    count.value--;
                }
        

*/

// All state objects and functions will be exported from the script when you use the setup attribute 
<script setup>                             
    import {ref, reactive, nextTick} from 'vue';
    
    const count = ref(0);                  //Declaring state object with initial value of 0 
    const state = reactive({ count: 0 })   //Declaring state object with initial value of {count: 0}
    
    function increment() {               
        count.value++;                     //Every state object will have a value property, this is where the actual state is
    }

    function decrement() {
        count.value--;                           
    }

    function displayCount() {              // Vue's reactivity will ensure that the function will always return the latest value of the state
        return count.value;
    }
    
    console.log(count);             //{value: 0}
    count.value++;                  //All updates to the state are synchronous
    console.log(count);             //{value: 1}
</script>


<template>
    <div> {{count}} </div>    <!-- You dont have to use the .value property of the state-->
    <button v-on:click="increment()"> increase </button>
</template>







