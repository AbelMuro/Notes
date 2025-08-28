/* 
      npm install vue-router@4

      You can implement a multi-page application with Vue by using Vue-Router.
*/










//============================================== INITIALIZING VUE ROUTER ==============================================
/* 
    In your index.js file, add the following code..
*/

import {createWebHistory, createRouter} from 'vue-router';
import Home from './Pages/Home';
import AboutUs from './Pages/'

const router = createRouter({
    history: createWebHistory(),                        //this will save the URL endpoint of every route, and display it in the URL
    routes: [
        {path: '/', component: Home},
        {path: '/aboutus', component: AboutUs}
    ],
})

app.use(router);
app.mount('#root');  


/* 
    In your App.vue file, you must use the <RouterView/> build-in component
*/

<template>
    <RouterView/>              //this will display the current route component
</template>















//============================================== NAVIGATION ==============================================


//-------------------- useRouter()
/* 
    You can use the userRouter() hook to navigate to different components.
    This hook should only be used with the Composition API
*/
  
<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const handleOption = () => {
        router.push('/checkerboard')
    }

</script>

<template>
      <button @click="handleOption">
          Play Game
      </button> 
</template>







//-------------------- this.$router
/* 
      You can use this.$router object to nagivate to different routes.
      This object should only be used with the Options API

            
*/

<script>
            export default {
               methods: {
                  handleNav() {
                      this.$router.push('/about')
                  },
               },
            }
</script>


