<!--
                                                          LIFECYCLE
        Every component has a lifecycle that outlines the step by step process that it takes from creation to destruction
        In Vue, the lifecycle is similar to the React lifecycle, having 4 main phases

                1) Creation Phase: the template is first compiled into a render function.
                   The render function will return a Virtual DOM tree branch that represents the component
        
                2) Mounting Phase: The render function is then called and this will mount the component onto the 
                   Virtual DOM, and then finally to the Real DOM
        
                3) Updating Phase: Vue will use the reactivity system to 'patch' or 'update' the component 
                   when the state changes.
        
                4) Destruction Phase: The component will be removed from the Virtual DOM, and then from the Real DOM
                   all event listeners, child components and state are destroyed.




-->


<!-- =========================================== LIFECYCLE HOOKS =============================================== -->
<!-- 
        Lifecycle hooks are functions that are called at certain phases of the lifecycle of a component   
        Keep in mind that all of these hooks have to be called synchronously, and these hooks do not
        allow you to specify state dependencies like watchers do. This means that as long as the component 
        was re-rendered from a state change, the hooks will always be called.

        The hooks in a child component will always be called BEFORE the hooks in the parent components

        These hooks are NOT called during server-side rendering
-->





<!-- 
                                onBeforeMount()
        Lifecycle hook that gets called before the mounting phase of a component
-->

<script setup>
    import {onBeforeMount} from 'vue';

    onBeforeMount(() => {
         console.log('component hasnt been mounted yet');
    })
</script>


        
<!--
                                onMounted()
        Lifecycle hook that gets called after the mounting phase of a component has ended.
-->

<script setup> 
     import {onMounted} from 'vue';

     onMount(() => {
         console.log('component has been mounted')
     })
        
</script> 




<!-- 
                                onBeforeUpdated()
        Lifecycle hook that gets called before every re-render, but after
        the state update occurs.
-->


<script setup>
    import {onBeforeUpdated} from 'vue';

    onBeforeUpdated(() => {
         console.log('state change occurred but re-render hasnt happened yet')   
    })

</script>
        

<!-- 
                                onUpdated()
        Lifecycle hook that gets called after every re-render
-->

<script setup>
    import {onUpdated} from 'vue';

    onUpdated(() => {
         console.log('State change occurred and re-render already happened')   
    })

</script>



        

<!-- 
                        onBeforeUnmount()
        Lifecycle hook that gets called before the component is unmounted
-->


<script setup>
    import {onBeforeUnmount} from 'vue';

    onBeforeUnmount(() => {
         console.log('component is about to be unmounted')   
    })

</script>


        

<!-- 
                        onUnmounted()
        Lifecycle hook that gets called after the component is unmounted
-->

<script setup>
    import {onUnmounted} from 'vue';

    onUnmounted(() => {
         console.log('component has been unmounted')   
    })

</script>


<!-- 
                        onErrorCaptured()
        Lifecycle hook that gets called when an error is thrown from
        one of the child components. The error can be thrown from the 
        event handlers, at the top level, hooks, and other functions.
-->


<script setup>
    import {onErrorCaptured} from 'vue';

    onErrorCaptured((error, instance, info) => {
         console.log('error was thrown from the child components ', error)   
    })

</script>



<!-- 
                        onActivated()
        This hook will be called after a component that uses <KeepAlive/> has been mounted
        REMINDER, in conditional rendering and dynamic components, you
        can persist a component on the DOM with the <KeepAlive/> built in component
-->

<script setup>
    import {onActivated} from 'vue';

    onActivated(e) => {
         console.log('This component that uses <KeepAlive> has been mounted')
    })

</script>



        

<!-- 
                        onDeactivated()
        This hook will be called after a component that uses <KeepAlive/> has been unmounted
-->

<script setup>
    import {onDeactivated} from 'vue';

    onDeactivated(e) => {
         console.log('This component that uses <KeepAlive> has been unmounted')
    })

</script>




<!--         
                        onServerPrefetch() 
        This hook will be called before the component is mounted and 
        before the component is rendered on the server.
        This hook should only be used with Server side rendering
-->

<script setup>
    import {onServerPrefetch} from 'vue';

    onServerPrefetch(e) => {
         console.log('This component has yet to be mounted')
    })

</script>
        








        

<!-- =========================================== DEBUGGING HOOKS =============================================== -->
<!--
       Vue has debugging hooks that can help in debuggin components and their state.
       These hooks should only be used in development.
-->


<!-- 
                                 onRenderTracked() 
       This hook will be called when a state has been tracked by component thas was re-rendered.
       In other words, the component was re-rendered, and the result of this re-render caused
       the component to track a new state.
-->

<script setup>
    import {onRenderTracked} from 'vue';

    onRenderTracked((e) => {
         console.log('This component has tracked a new state due to a re-render ')
         e = {
          effect: ReactiveEffect
          target: object
          type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
          key: any
        }
    })

</script>


<!-- 
                               onRenderTriggered()     
        This hook will be called after the component was re-rendered
-->

<script setup>
    import {onRenderTracked} from 'vue';

    onRenderTracked((e) => {
         console.log('This component has been re-rendered ')
         e = {
          effect: ReactiveEffect
          target: object
          type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
          key: any
          newValue?: any
          oldValue?: any
          oldTarget?: Map<any, any> | Set<any>
        }
    })

</script>
