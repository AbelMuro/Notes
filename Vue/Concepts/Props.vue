
<!-- ============================================== PROPS ==================================================== -->
<!-- 
    You can pass data to a component using props. Keep in mind that props are immutable, meaning that you can't 
    change the value of props once a component received it

    defineProps() is used to define what kind of data (primitive or non-primitive) can be passed to a component

    const { foo } = defineProps(['foo']);                                //you can define props using an array 

    const {title, likes} = defineProps({                                 //you can also define props using an object
              title: String,
              likes: Number,
              name: {                                                    //prop validation, you can make a certain prop a requirement for a component
                type: String,
                required: true
              },
              group: {
                validator(value, props) {
                  return ['success', 'warning', 'danger'].includes(value)     // The value must match one of these strings
                }
          }, 
-->


<!-- Parent Component -->
<script setup>
    import ChildComponent from './ChildComponent.vue';  
</script>

<template>
    <ChildComponent :message="'expression/variable goes here'"/>       <!-- props can also be dynamic by using the v-bind directive -->
</template>



<!-- Child Component -->
<script setup>
    import {PropType} from 'vue';
        
    const {message} = defineProps({
                message: String,
                messageTwo: {
                        type: String,
                        required: true
                },
                someFunction : Function as PropType<(payload: PointerEvent) => void>
        });              
</script>

<template>
    <div>
        Props passed to this component is {{message}}
    </div>
</template>



<!-- 
                                CHILD PROPS

                You can pass elements and other components to a child component 
                using the <Slot/> component in Vue 
-->


<!-- Parent Component -->
<script setup>
    import ChildComponent from './ChildComponent.vue';  
</script>

<template>
    <ChildComponent>
            <div> hello world </div>        //this is the content that will be passed in the child component as child props
    </ChildComponent>
</template>



<!-- Child Component -->
<script setup>
</script>

<template>
    <div>
        Goodbye world
    </div>
    <slot>
        Hello world                   // this is fallback content, will be replaced by <div> hello world </div>
     </slot>
</template>



