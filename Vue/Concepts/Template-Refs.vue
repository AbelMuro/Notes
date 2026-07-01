
<!-- =========================================== TEMPLATE REFS =============================================== -->
<!-- 
        Vue uses ref objects to maintain a reference to an element in the real DOM. Ref objects
        will bypass the Virtual DOM and access the real DOM directly. Keep in mind that to access
        ref objects, they must first be binded to an element that exists in the real DOM. In other words,
        please wait until the component has been mounted before using the ref object.

        Template refs can be used inside watchers as well, but you will need a conditional statement
        to check if the ref object has a truthy or falsy value.

        You can use template refs to reference components as well, this is one way for a parent component
        to access the variables and methods of a child component
-->


<!-- Parent Component -->
<script setup>
    import {useTemplateRef, onMount} from 'vue';
    import ChildComponent from './ChildComponent';

    const myRef = useTemplateRef('any-name goes here');//You can use any name to define a ref object
    const inputRef = useTemplateRef('text-input');     //You can use ref objects to reference an element
    const childRef = useTemplateRef('child');          //You can use ref objects to reference components
    const listRef = useTemplateRef('list')             //You can use ref objects to reference lists created with v-for

    onMount(() => {
        inputRef.value.focus();                 
        childRef.value.method;                   // the parent component will have access to the variables and methods from the child component
        listRef.value[2];                        
    })
</script> 

<template>
    <input ref="text-input">
    <ChildComponent ref="child"/>                <!-- you can use ref objects with components, this ref will reference the instance of the component-->
    <ul v-for="n in 10" ref="list"></ul>
    <div :ref="(ref) => {/* assign the reference to some property*/}">
</template>




<!-- Child Component -->
<script setup>
     const x = 4;
     const method = () => {}

     defineExpose({                                // <script setup> by default makes all variables and methods private
         x, method                                 // but using defineExpose() will make certain variables public and usable 
     })                                            // defineExpose() is a built in function that must be called synchronously
</script>

