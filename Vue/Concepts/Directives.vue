


<!-- =========================================== DIRECTIVES =================================================== --!>
<!-- 
        Directives are used with attributes in elements inside templates, they apply additional logic to the attribute.
        All directives start with a prefix v-

        Syntax for directives:
                v-on:click.prevent="JS expression"
                directive:attribute.modifier="JS expression"    

        Modifiers: They are denoted as directive postfixes with a dot. They apply even more logic to the attribute. 
        Keep in mind that modifiers can be chained together
                .prevent modifier will call the e.preventDefault()
                .passive modifier will call the event handler immediately instead of waiting for the event to finish

        Directly below are the most common directives in Vue
-->
















<!-- ============================================ DYNAMIC ATTRIBUTES (V-BIND) ========================================= -->
<!-- 
    You can use the v-bind attribute to dynamically set an attribute or value to an element
    shorthand :
-->

<script setup>
    import {ref, computed} from 'vue';

    const stateOne = ref('class-one');
    const stateTwo = ref('class-two');
    const dynamic = 'expression that resolves to a string'

    const computedClasses = computed({                                    //rememeber to use state objects here to create dependencies
        classOne: 'expression that resolves to a boolean value',
        classTwo: 'expression that resolves to a boolean value'
    })
    
</script>




<template>
    <div v-bind:class="{active: true, menu: false}">                    <!-- Dynamically assigning classes to this element-->    
    <div v-bind:[dynamic]="url"></div>                                  <!-- Dynamically assigning a single attribute to this element -->
    <div v-bind={{attributes}}></div>                                   <!-- Dynamically assigning multiple attributes to this element -->
    <div v-bind:class="computedClasses"></div>                          <!-- Dynamically assigning classes with a computed value-->
    <div v-bind="[stateOne, stateTwo]"></div>                           <!-- Dynamically assigning multiple classes to this element with state objects (must be strings) -->
</template>

















<!--  ============================================ CONDITIONAL RENDERING (V-IF, V-ELSE-IF, V-ELSE, V-SHOW) =========================================-->
<!--
    You can conditionally render your elements by using the v-if, v-else-if, and v-else directive

    v-if, v-else-if, v-else:     these directives will conditionally render your elements based on an expression that resolves to a boolean value
    v-show:                      this directive will conditionally toggle the display css property of the element, the element will remain in the DOM


    Facts to keep in mind:
        -v-if has higher toggle costs, while v-show has higher initial render costs
        -Choose v-show if you need to toggle something very often, and choose v-if if the condition is unlikely to change at runtime.
        -All of these directories accept an expression that resolves to a boolean value
-->

<script setup>
    import {ref} from 'vue';
    const display = ref('A');
</script>



<template v-if="true">                            <!-- You can conditionally render a whole template with the v-if directive-->
    
    <div v-if="display === 'A'"></div>
    <div v-else-if="display === 'B'"></div>
    <div v-else></div>

    <div v-show="true"></div>                     <!-- v-show will conditionally toggle the display css property of the element-->
    
</template>

<template v-else-if="false"></template>          <!-- You can conditionally render different templates like this as well-->
<template v-else="false"></template>

















<!--  ============================================ LIST RENDERING (V-FOR) ========================================= -->
<!-- 
    You can use the v-for directive to render a list of items in an array.
    Every item in a list will have its own 'key' attribute that is used to identify the 
    item in the list. Vue uses an in-place patching strategy to update the items in the list.
    When an item in the list was removed, Vue will efficiently remove 
    the item from the DOM, while leaving all the other items alone. If the order of the
    items was changed, Vue will update(patch) the items in the list to reflect the 
    new list order. This strategy is efficient for most cases, except if an item is a 
    child-component or an element that relies on some state

    Facts to keep in mind    (you will get the same result with 'for' and 'in')
        - if list is an array        v-for="(value, index) in list"           
        - if list is an object       v-for="(value, key, index) in list"
        - you can use v-for directive on templates as well
        - Do not use v-if and v-for on the same element
        - if you want to create a list of components, then use v-for in the component

    Reminder about For() loops
        - for (let value of fruits) will iterate over the values of an object or array
        - for (let key in fruits) will iterate over the property names or the indices 
-->

<script setup>
    import {ref} from 'vue';
    const list = ref(['A', 'B', 'C']);
    const people = ref([{name: 'carlos'}, {name: 'david'}, {name: 'stephanie'}])
</script>

<template>
    
    <div v-for="(item, index) in list" :key="item">          <!-- This will create 3 div elements (list.length === 3)-->
        {{item}} - {{index}}                                 <!-- the key prop is used by vue to identify the item in the list (list must be a state)-->
    </div>

    <div v-for="n in 15">                                    <!-- You can create a range of values to iterate through to create a list-->
        {{n}}
    </div>
    
    <MyComponent 
        v-for="(item, index) in list" 
        :key="item" 
        :prop="item"/>                                         <!-- You can create a list of components (all props to these components must be dynamic)-->

    <div v-for="item in list" :key="item.id">
      <span v-for="childItem in item.children" :key="childItem">   <!-- You can also nest v-for directives-->
        {{ childItem }}
      </span>
    </div>
    
</template>












        









<!--  =========================================== EVENT HANDLERS (V-ON)=============================================== -->
<!-- 
    You can use the v-on directive to bind event handlers to your elements
    Shorthand is @

    Modifiers to remember:

        v-on:click.once          this will trigger the event handler only once
        v-on:click.self          this will trigger the event handler if the event was created by THIS element
        v-on:click.capture       this will create an event listener when the element triggers the event for the first time
        v-on:scroll.passive      this will call the event handler immediately, instead of waiting for the scroll event to complete (best used for mobile devices)
        v-on:submit.prevent      e.preventDefault()
        v-on:click.stop          this will stop the bubbling phase of event propagation

-->

<script setup>
    import {ref} from 'vue';

    const count = ref(0);

    const handleClick = (e) => {                                // e is the Native DOM event
        e.target.tagName;                
        count++;
    }
</script>


<template>
    <button v-on:click="handleClick"></button>                     <!-- handleClick is a method handler -->
    <button v-on:click="handleClick($event)"></button>             <!-- handleClick() is an inline handler, using $event is another way of getting the event object-->
</template>




<!-- 
                                Component Event Handlers

        Parent Components can assign a custom event handler to a child component
        The child component will emit the event handler with the $emit() function.
-->

<!-- Parent Component -->
<script setup>
    import {ChildComponent} from './ChildComponent.vue';
    const handleSomething = () => {}
</script>

<template>
     <ChildComponent @customEvent="handleSomething"/>        <!-- you can use any name for your event handler-->
</template>



<!-- Child Component -->
<script setup>
    import {ref} from 'vue';
    const state = ref(1);
    const emit = defineEmits(['customEvent'])                        //build in function in vue 
    emit('customEvent')                                              //you can use emit() to programatically emit an event
</script>

<template>
    <button @click="$emit('customEvent')"> Click here </button>
</template>














        



<!--  ============================================ FORMS (V-MODEL) ========================================= -->
<!-- 
        You can use the v-model directive to synchronize the state in Vue with the input inside a form
        By using v-model, you dont need an on-change event handler to update the state, Vue will
        automatically update the state for you.

        Modifiers to remember..

                v-model.lazy       state will ONLY be updated when the user stops typing and loses focus of the input (text will still be displayed on screen)
                v-model.number     state will be typecast into a number, if the state can't be typecasted, then a string will be the result (this modifier is applied automatically if type='number' is used)
                v-model.trim       state will be updated to remove all whitespaces
-->



<!-- TEXT FIELDS -->

<script setup>
      import {ref} from 'vue';
      const text = ref('');
      const otherText = ref('');
</script>

<template>
    <form>
        <input type="text" v-model="text"/>                <!-- state will automatically be updated when the user types in the input-->         
    </form>
</template>





<!-- TEXT AREA (Do NOT use interpolation {{text}} inside the textarea tag -->

<script setup>
      import {ref} from 'vue';
      const message = ref('')
</script>

<template>
    <form>
         <textarea v-model="message">
        </textarea>
    </form>
</template>
                 




<!-- CHECKBOXES (value attribute can be dynamic as well (v-bind))-->

<script setup>
    import {ref} from 'vue';
    const checkedBoxes = ref([]);
</script>

<template>
     <form>
        <input type="checkbox" value="one" v-model="checkedBoxes"/>                  <!-- clicking this checkbox will automatically get the value attribute and put it in the state array-->
        <input type="checkbox" value="two" v-model="checkedBoxes"/>
        <input type="checkbox" value="three" v-model="checkedBoxes"/>
        <input type="checkbox" v-model="toggle" true-value="yes" false-value="no"/>  <!-- If toggle state is equal to "yes", then the checkbox will be checked,-->
     </form>                                                                         <!-- If toggle state is equal to "no", then the checkbox will NOT be checked -->
</template>                                                                          <!-- true-value and false-value enable you to set default values for the checked state and unchecked state-->
                                                                                     <!-- The state of the checkbox doesnt have to be a boolean value if you use these attributes -->




<!-- RADIO BUTTONS (value attribute can be dynamic as well (v-bind))-->

<script setup>
     import {ref} from "vue";
     const color = ref("red");
</script>

<template>
     <form>
        <input type="radio" value="red" v-model="color">
        <input type="radio" value="blue" v-model="color">
        <input type="radio" value="green" v-model="color">
     </form>
</template>



<!-- SELECT -->

<script setup>
     import {ref} from "vue";
     const selected = ref("");
</script>

<template>
     <form>
        <select v-model="selected">
             <option disabled value=""> Select a letter </option>                <!-- This can be used as a placeholder in a select tag-->
             <option value="A">A</option>
             <option value="B">B</option>
             <option value="C">C</option>
             <option :value="{message: 'hello world'}">D</option>                <!-- the value attribute can be assigned an object-->
        </select>
     </form>
</template>





<!-- COMPONENTS -->
<!--
        You can use v-model to implement a two-way data binding 
        relationship between the parent component and the child
        component. Just rememmber to use defineModel() in the 
        child component

        v-model in a component can also accept arguments, this
        can be usefull when you need to pass multiple states 
        to the child component. Each argument can have a modifier 
        as well
-->

        
<!-- Parent Component-->        
<script setup>
    import {ref} from 'vue';
    import {ChildComponent} from './ChildComponent.vue';

    const state = ref(1);
    const otherState = ref(3);
    const lastState = ref('hello world');
        
</script>

<template>
    <ChildComponent 
            v-model:first="state" 
            v-model:second="otherState"
            v-model:third.capitalize="lastState"/>         <!-- the modifiers will not do anything unless you implement their behavior on the second argument of defineModel()-->
</template>


<!-- Child Component -->
<script setup>
    const state = defineModel('first');
    const otherState = defineModel('second');
    const [lastState, lastStateModifier] = defineModel('third', {        //the second argument can be used to pass a setter method that
            set(value){                                                  //mutates the state before the child component receives it
                if(lastStateModifier.capitalize)
                    return value[0].toUpperCase() + value.slice(1);  
                else 
                    return value;
            }
    })

    const handleState = () => {                        // The child component can directly update the parent components' state
         state.value++;                                // This can also be used to pass data from the child to the parent
    }    
</script>

<template>
     <button @click="handleState">
             click here
     </button>
</template>









