/* 
      

      You can implement a multi-page application with Vue by using Vue-Router.

      INITIALIZING VUE ROUTER

            npm install vue-router@4

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
      
*/











//============================================== NAVIGATION ==============================================


      
//-------------------- useRouter()
/* 
    You can use the userRouter() hook to navigate to different components.
    This hook should only be used with the Composition API

          const router = useRouter();

          router.push()                        // push() will navigate to a different route
          router.params.nameOfDynamicRoute     // params has access to the dynamic parameters of the URL
*/
  
<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const handleOption = () => {
        router.push('/home');
        router.push({      
              name: 'home',                  //only works if the route in createRouter has the same name
              params: {                      // the following properties will update the original URL
                    id: ''
              },
              query: '',
              hash: ''
        })
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





//-------------------- <RouterLink/>
/* 
      You can use the RouterLink component to navigate to different routers.
      This component can be used for both the Options API and the Composition API
*/

<template>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/aboutus">About Us</RouterLink>
</template>



//-------------------- <RouterView/>
/* 
    You can use the <RouterView/> component to display the current route
    This is a built-in component
*/

<template>
    <RouterView/>            
</template>




//============================================== ROUTING ==============================================
/* 
      In your index.js file, you can create different routes that map to specific components with
      the createRouter() function
*/

import Home from './Page/Home';
import AboutUs from './Pages/AboutUs';


const router = createRouter({
    routes: [
        {path: '/', component: Home},      
        {path: '/aboutus', component: AboutUs}
    ],
})



//-------------------- Dynamic Routing
/* 
      You can create dynamic routes by using a colon :
      You can access the current dynamic route by using useRouter()

            const router = useRouter();
            router.params.id;
*/


const router = createRouter({
    routes: [
       { path: '/users/:id', component: User },
    ],
})





//-------------------- Page Not Found 404
/* 
      You can create a 404 page not found with a dynamic route that 
      has the following syntax

      the dynamic route's name can be accessed with useRouter()

            const router = useRouter();
            router.params.pathMatch
*/

const router = createRouter({
    routes: [
       { path: '/:pathMatch(.*)*', component: PageNotFound },
    ],
})











