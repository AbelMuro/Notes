/* 
      

      You can implement a multi-page application with Vue by using Vue-Router.

      INITIALIZING VUE ROUTER

           1) npm install vue-router@4
            

           2) Paste the following lines of code in your index.js file
           
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

            3) In you App.vue file, make sure you use the RouterView component

                  <template>
                      <RouterView/>
                  </template>
      
*/







//============================================== ROUTING ==============================================
/* 
      In your index.js file, you can create different routes that map to specific components with
      the createRouter() function
*/

import Home from './Page/Home';
import Account from './Pages/Account';
import Settings from './Pages/Settings';

const router = createRouter({
    routes: [
        {path: '/', component: Home},      
        {
            path: '/account', 
            component: Account,                  //Account component must have <RouterView/>
            children: [
                  {
                     path: 'settings',
                     component: Settings,
                  }
            ]
        },
    ],
})



//-------------------- Dynamic Routing
/* 
      You can create dynamic routes by using a colon :
      You can access the current dynamic route by using useRouter()

            import {useRoute} from 'vue-router';

            const router = useRoute();
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










      






//============================================== NAVIGATION ==============================================



//-------------------------------- Hooks -------------------------------- 
      
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
              name: 'home',                  // only works if the route in createRouter has the same name
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



//-------------------- useRoute()
/* 
      You can use the useRoute() hook to get the info of the URL
*/

<script setup>
      import {useRoute} from 'vue-routers';

      const route = useRoute();

      route.path;            /* /account/settings                 */
      route.fullPath;        /* /dashboard/settings?tab=profile   */
      route.params;          /* dynamic params */
      route.query;            /* query string object */
</script>
          

          
//-------------------------------- Components -------------------------------- 

          
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





          
          
//-------------------------------- Miscellaneous -------------------------------- 
          
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







