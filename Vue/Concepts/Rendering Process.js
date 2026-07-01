/* 
                                                   RENDERING PROCESS
        Vue uses a variation of the Reconciliation algorithm that React uses, but Vue implements its Reactivity system in the algorithm
          
        1) Before a component is first mounted, the templates are compiled into render functions, which will then generate a branch
           in the virtual dom tree. 

        2) Once the component is mounted, the render function is called, creating the nodes in the virtual dom.

        3) When a state change occurs, the render function is called again, and a new virtual dom is created.
           At this point, there will be two virtual doms in memory, and each node from both trees are going to be compared.
           Once the comparison is complete, the real dom will be updated accordingly

*/
