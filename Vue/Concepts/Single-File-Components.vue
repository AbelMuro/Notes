<!-- ============================================ SINGLE FILE COMPONENTS ======================================================= -->
<!-- 
    Single file components are files that contain one component (basically one template)
    The template tag will automatically be exported from the file
-->

<!-- script tag -->
<script setup>

</script>


<!-- template tag-->
<template>
         
</template>


<!-- style tag-->
<style scoped>            

</style>








<!-- 
                                Importing and Exporting components
        You can use the import and export keywords to modularize your components. 
        All single file components will automatically export its template.
-->

<!-- Parent Component -->
<script setup>
    import ChildComponents from './ChildComponent.vue';
</script>

<template>
        <ChildComponent />
</template>



<!-- Child Component-->
<script setup>
    import {ref} from 'vue';;

    const state = ref(1);
</script>

<template>
       <div> Hello World </div>
</template>
















<!-- 
                                Dynamic Components        
        Dynamic components implement the process of conditional rendering of a component
        You just have to use the <component/> element in your template and use the attribute 'is'
        that accepts a component as a value.

        the 'is' attribute can accept a string value containing the name of the component,
        or the actual component object

        <KeepAlive/> is a built in Vue component that can be used on dynamic components to
        persist components on the Virtual DOM. Even if a component has been unmounted because of a 
        dynamic component, it will remain in the DOM with <KeepAlive/> with its local state in tact.
        The component will be hidden though
        
        
-->

<!-- Parent Component-->
<script setup>
   import {ref} from 'vue';
   import {FirstComponent} from './FirstComponent.vue';
   import {SecondComponent} from './SecondComponent.vue';

   const state = ref('FirstComponent')

</script>

<template>
        <KeepAlive>                                <!-- When you use the keepAlive component, all states within the components will be persisted-->
            <component :is="state">                <!-- but the component will not be removed from the DOM, only hidden-->
        </KeepAlive>
</template>
















<!--==================================================== TEMPLATES ======================================================== -->
<!--
    You can use the template tag to use html syntax to declare your elements within your single-file component
    Templates typically use directives to dynamically alter the elements in some way
-->

<script setup>
    const dynamic = "expression that resolves to a string";
</script>

<template>
    <HelloWorld msg="You did it!" />                                      <!-- You can pass props to a component like this --> 
    <p class="myClass"> {{random === '' ? 'n' : 'v'}} </p>                <!-- {{}} allows you to use any JS expression in Vue-->

</template>



<!-- 
                        In-DOM Templates
        You can use Vue templates inside an HTML file. These templates should always have
        closing tags and use kebab-case

        In the html file, you can also use the 'is' attribute to mount a component unto a 
        native html tag. The 'is' attribute can also be used to mount components in certain
        html tags that have restrictions (ul tags only allow li child tags)
-->

<body>
        <my-component post-title="hello!" @update-post="onUpdatePost"></my-component>
        <ul>
           <li is="my-component"></li>
        </ul>
<body>






    
    

<!--==================================================== SCRIPT ======================================================== --!>
<!-- 
        The script tag can be used to use javascript in your component. Keep in mind that the script tag is only executed
        once, so every function is only created once
-->

<script>
    import SomeComponent from './MyFile.vue';
    import {ref} from 'vue';

    const state = ref(1);

    const updateState = () => {                //keep in mind that functions are not recreated in the script
        state.value++;
    }
</script>


<!-- 
                        COMPUTED()
    Functions within the <script/> tag are only created once, every re-render will not re-create the function.
    Once the function forms a closure with a state or other value, it will NOT keep track of any updates to the state

    To solve this problem, Vue uses computed() to re-create a function when a state is updated
-->

<script setup>
    import {ref, computed} from 'vue';

    const count = ref(0);
    const firstName = ref('John')
    const lastName = ref('Doe');
    
    // 1) computed() will only be called when the count state is updated
    const computedRef = computed(() => {       
          return count.value > 34 ? 'yes' : 'no';           //count is now a dependency of computedRef
    })

    // 2) you can use computed() to get and set a state object
    const fullName = computed({                  
          get(previous) {                            //you can also get the previous state in the getter method
            return firstName.value + ' ' + lastName.value
          }
          set(newValue) {
            firstName.value = newValue.split(' ')[0];
            secondName.value = newValue.split(' ')[1];
          }
    })
    fullName = 'Carlos barrang';        //will trigger the setter method
    console.log(fullName);              //will trigger the getter method


    // 3) you can get the previous state with callbacks
    const previousState = computed((previous) => {   
          if(count.value < 3)
             return count.value;
          return previous
    })

    //4) you can use a computed value and assign it to a directive
    const dynamicClasses = computed({
        classOne: firstName.value === 'my name',
        classTwo: lastName.value === 'my other name'
    })

</script>




<!--==================================================== STYLE ======================================================== -->   
<!-- 
    the style tag is used to include css in your component

    the scoped attribute will modularize the selectors in the DOM branch where the current component currently is located
-->


<style scoped>
    .someClass{
        color: red;
        background-color: blue;
        width: 300px;
    }

    @media(max-width: 550px){
        .myClass{
            color: blue;
        }
    }
    
</style>
    
