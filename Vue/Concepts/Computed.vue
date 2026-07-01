             
<!-- =========================================== COMPUTED() =============================================== -->
<!-- 
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


<template>
    <div> 
        {{computedRef}}
    </div>
    <button :class="dynamicClasses">        <!-- you can also use the computed value in a directive-->
        Click here
    </button>
</template>

