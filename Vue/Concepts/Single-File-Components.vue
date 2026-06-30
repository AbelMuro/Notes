<!-- ============================================ SINGLE FILE COMPONENTS ======================================================= -->
<!-- 
    Single file components are files that contain one component (basically one template)
    The template tag will automatically be exported from the file
-->

<!-- script tag allows you to write JS code (Keep in mind, the script tag is only called once, a re-render will NOT execute the script tag again) -->
<script setup>
    const x = 2 + "3";
    const str = "random";
    const myFunc = () => {
        return "Hello-World"
    }
</script>



<!-- template tag allows you to use HTML syntax to declare and define your DOM elements (template tag will automatically be exported from this file)-->
<template>
    <p class="myClass"> Hello World </p>                                     
    <button v-on:click="otherFunc"> Click Here </button>                    <!-- Any variable or function exported using setup() will be available in the template-->
</template>



<!-- style tag allows you to use css (remember to use scoped attribute to make sure the styles are scoped locally to a file)-->
<style scoped>            
  .myClass {
    color: red;
  }

    @media(max-width: 550px){
        .myClass{
            color: blue;
        }
    }
</style>




<!-- 
                                Importing and Exporting components

        You can use the import and export keywords to modularize your components. 
        All single file components will automatically export its template.
        
-->

<!-- Parent Component -->
<script setup>
    import {ChildComponents} from './ChildComponent.vue';
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
