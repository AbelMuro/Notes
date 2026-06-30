/*
                                                REACTIVITY SYSTEM:
        -Deep Reactivity: all nested objects and arrays will be tracked within the state object
        -Shallow Reactivity: Only the first level of properties will be tracked within the state object (typically the value property)

        Every component in Vue.js will keep track of ALL of its state objects (ref, reactivity)
        When the state is updated, the component will be re-rendered. Vue uses objects as state, 
        because Vue can intercept the 'get' and 'set' operations of an object with the setter and getter methods. 
        When a state object has been accessed, the getter method will be called and will make the component track
        the state. When a state object has been updated, the setter method will be called and will cause a re-render
        on all components that are tracking the state. Keep in mind that if any prototype method was used (push(), map(), filter()),
        this will also trigger the setter method.

                const state = {
                      _value: 0,                   // the state value
        
                      get value() {
                        track();                    // when a value has been accessed by a component, we start the tracking process
                        return this._value;
                      },
        
                      set value(newValue) {
                        this._value = newValue;     // When the state changes...
                        trigger_re_render();        // we will cause a re-render on all components tracking this state object
                      }
                }


                                                       PATCHING
        Patching is the process in Vue that updates nodes in the Real DOM when the state changes.
        This process is seen more commonly in Vue lists, where each item in a list is identified by 
        the 'key' prop. Vue will track the list with the 'key' prop to see if the state/list has changed.

                        const state = ref(['apple', 'orange', 'pineapple']);
                        state.value = ['lettuce', 'orange', 'pineapple'];   

                        <div>
                           {{state[0]}}
                        </div>
                        <div>
                           {{state[1]}}
                        </div>
                        <div>
                           {{state[2]}}
                        </div>

        When the state change above occurs, Vue will update the Real DOM by updating the first <div> only, 
         {{state[0] = 'apple'}}      to     {{state[0] = 'lettuce'}} 
        Vue will leave everything else alone.   


*/
