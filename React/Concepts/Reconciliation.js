/* 
                                RENDERING PROCESS (RECONCILIATION)
                        
           Reconciliation is an algorithm that React uses to efficiently update the DOM. It starts by first mounting a component (and its element). 
           React will then create an Virtual DOM in memory. When a state change occurs, React will generate another Virtual DOM. At this point, 
           we have 2 Virtual DOMs in memory. React will use a process called 'diffing' to compare every node of both Virtual DOMs in memory,
           and will decide which nodes to update in the Real DOM. Once React has decided which nodes to change in the Real DOM, it will decide
           to either update, remove, or create nodes in the Real DOM. If a node needs to be updated, React will update the node. If a node needs 
           to be removed or created, React will simply delete the node or create a new node in the Real DOM.
           
*/
