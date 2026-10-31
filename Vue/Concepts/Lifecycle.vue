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
