----------------------------------------------------------- ALGORITHMS --------------------------------------------------------------------





//BINARY SEARCH ALGORITHM: is a searching algorithm used in a SORTED array by repeatedly dividing the search interval in half. 
//This algorithm is designed to find a target in an array
//The time complexity is O(Log n). 
                           
                var search = function(nums, target) {
                  let middle;

                  for(let i = 0, j = nums.length - 1; i < j;){
                        middle = Math.floor((i + j) / 2);               //we get the middle index of the array
                        if(nums[middle] > target)                                 
                            j = middle - 1;
                        else if(nums[middle] < target)
                            i = middle + 1;
                        else
                            return middle; 
                  }
                  return -1;
                };















/* 
      TWO POINTER MANIPULATION ALGORITHM: 
      
      Two pointers is an easy and effective technique that is typically used for searching pairs in a SORTED array.
      Different variations of this algorithm can be used when a certain condition can move the pointers in a specified direction

*/


1)          //Two pointer that is used for a single sorted array
            EX:
              
              let A = [1,2,3,4,5,6,7,8,9,10];
              let X = 10;
              
              for(let i = 0, j = A.length - 1; i < j;){
                  if(A[i] + A[j] > X)
                      i++
                  
                  else if(A[i] + A[j] < X)
                      j--;
                    
                  else if(A[i] + A[j] == X)
                      return true;
              }
    






/* 
      SLIDING WINDOW ALGORITHM: 
      
      This algorithm is designed save some re-calculation, the time complexity for this algorithm is O(n)
*/

                     __    __ 
        VISUAL:     |  |  |  | 
                [1, 2, 3, 4, 5]           
                 |  |  |  |  
                 ----  ----         //you can think of this as a 'window' that contains elements
                            
                          
              const SlidingWindow = (arr, k = 5) => {
                let sum = getSumOfFirstKElements(arr, k);                //you have to manually implement this function
                let largestSum = sum;
              
                for (let i = 0; i <= arr.length - k; i++) {              
                    sum -= arr[i];                                        // subtract first element from the 'window'
                    sum += arr[i + k];                                     // add next element to the 'window' 
                    largestSum = Math.max(largestSum, sum);
                }
              
                return largestSum;
              };












/* 
    PREFIX SUM: 
    
    This is a technique that creates an array where each value is the sum of all the values before it
*/

            let arr = [10, 20, 10, 5, 15];
            let prefixSumArr = [10, 30, 40, 45, 60];              //0 + 10 = 10        20 + 10 = 30         10 + 20 + 10 = 40



              function fillPrefixSum() { 
                    let arr = [10, 4, 16, 20]; 
                    let prefixSum = [arr[0]];
               
                    for (let i = 1; i < n; i++) 
                        prefixSum[i] = prefixSum[i - 1] + arr[i]; 
        
                    //prefixSum = [10, 14, 30, 50]
              } 













/* 
    RECURSION: 
    
    its the ability of a function to call it self many times. The whole point of recursion is to break a problem into smaller parts, thereby reducing the
    complexity of the problem at hand. Typically, all recursive functions have a base case that will terminate the recursive calls once the case is true

    Keep in mind that every recursive call will create a separate execution context in the callstack.

*/

                function recursion(n){
                      if(n == 0)                //base case
                        return;
                      
                      recursion(n - 1);        //recursive call
                }

                recursion(5);

















        




//DYNAMIC PROGRAMMING: The main idea of dynamic programming is to consider a significant problem and break it into smaller, 
//                     individualized components. When it comes to implementation, optimal techniques rely 
//                     on data storage and reuse to increase algorithm efficiency.
//                     Complexity for this algorithm is O(n);

            //EX: Find a pair of numbers in an array whose sum is equal to the given target
      
            [8, 10, 2, 9, 7, 5]
  
            function DynamicProgramming(target){
                
              	let map = new Map();
                  
              	for (num in sequence) {
                  	let diff = target - num;   // (target = 10) - (num = 8) = (diff = 2)    the pair that we are checking here is [8, 2]
                 	 
                  	if (map.has(diff))           //O(1) - constant time lookup
                   		   return [num, diff];              	            	
                  	else                       
                      	map.set(num, num);      //store previously seen value    		
                  }
                  
              	return -1;
             }


       
      
      
      
   
      
      
      
      
      
      
      
      
      
      
//------------------------------------------------------- DATA STRUCTURES ----------------------------------------------------------


/*   

  STACK data structure:
  
  A stack is a linear data structure in which elements 
  can be inserted and deleted only from one side of the list, 
  called the top. A stack follows the LIFO (Last In First Out) principle, 
  i.e., the element inserted at the last is the first element to come out.


                //LIFO: last in first out
                      
                        push()                                             pop()
                    ____________________                      _________________________
                   |                    |                     |                        |
                  link 4                v                     ^                        v
3                                  |   link4    |         |            |             link 4 
2                                  |   link3    |         |   link3    |                       
1                                  |   link2    |         |   link2    |
0                                  |   link1    |         |   link1    |
                                   -------------          ------------                                               

    
      
*/


/* 
    Mono Decreasing Stack


    A stack that keeps its values in a strictly decreasing order (duplicate values may be allowed, depending on the context)


                                  |   4     |      
                                  |   8     |                             
                                  |   12    |        
                                  |   17    |        
                                  ---------- 
      If we push the value 10, we must pop the two values 4 and 8 before we can add 10 to the stack
          
*/




/*
    QUEUE data structure  
    
    Queue is a linear data structure in which elements can be inserted only 
    from one side of the list called rear, and the elements can be deleted 
    only from the other side called the front. The queue data structure 
    follows the FIFO (First In First Out) principle, 
    i.e. the element inserted first in the list, 
    is the first element to be removed from the list.


                //FIFO: first in first out... 
                
                
                  ----------------------    push()                        
                 |                     |
                link 4                 v
  4                                |  link4   |              |          |  
  2                                |  link3   |              |  link4   |               
  1                                |  link2   |              |  link3   |
  0                                |  link1   |              |  link2   |
                                    ----------                ----------
                                                                |           pop()          
                                                                  ----------------------- > link 1
  */
                   




/* 
    PRIORITY QUEUE (heap): 
    
    a data structure that organizes elements based on a hierachy, 
    typically the first elements has the highest priority 
    while the last element has the lowest priority



    |   a  |      //highest priority
    |   b  |
    |   c  |      //lowest priority
    |______|
*/

  const queue = []
  const newNode = { element = 'wash dishes', priority = 2 };
  let added = false;

  // Insert based on priority
  for (let i = 0; i < queue.length; i++) {
    if (newNode.priority < queue[i].priority) {      //a bit counter-intuitive, but a 'lower' priority will be placed before a node will 'higher' priority
        queue.splice(i, 0, newNode);
        added = true;
        break;
    }
  }

  // If not added, push to the end
  if (!added) {
    this.queue.push(newNode);
  }








/* Linked Lists: is a linear data structure, in which elements are not stored at a contiguous location, 
                rather they are linked using pointers. Linked List forms a series of connected nodes, 
                where each node stores the data and the address of the next node. 
*/



    //single-linked lists: 
    
              Head   --->   [data, next] --->   [data, next] --->   [data, next] ---> NULL
    
    //Double-linked lists
      
              Head   <--->   [prev, data, next]  <--->   [prev, data, next]  <--->   [prev, data, next]  <--->  NULL
    
    
    //Circular-linked lists, the last node points to the very first node
    
              Head   --->   [data, next]  --->   [data, next]  --->   [data, next]  ---
                     |_________________________________________________________________|
                                                                              

  // Floyds Algorithm; this algorithm utilizes two pointers to traverse through the linked list, these pointers
  // will differ in the speed that they traverse. One pointer will traverse slowly, while the other pointer
  // will traverse quickly. The purpose of this algorithm is to eventually have both pointers reference the
  // same node in the linked list based on a certain condition.
                

    //ITERAVELY

    var findMiddleNode = function(head){
        let slow;
        let fast;
      
        while (fast && fast.next){          //slow will eventually point to the middle node of the list
            slow = slow.next;
            fast = fast.next.next
        }
       return slow;
    }

    //RECURSIVELY

    function traverse(fast, slow) {
        if(fast && fast.next){
             return traverse(fast.next.next, slow.next);            
        }
        else {
            return slow;            
        }           
    }
    traverse(head, head);
















            
//BINARY TREE: a data structure that has a root node, each node has three parts; data, left pointer and right pointer.
//BINARY SEARCH TREE: a binary tree that has its values sorted, in other words the left node's value is always less than the root, and the right node's val is always more than the root
   
                                              root node
                                                 __
                                                |__|
                                        left   /    \     right
                                              /      \
                                             /        \
                                            __          __
                                           |__|        |__|
                                                      /    \
                                                     /      \
                                                    __       __
                                                   |__|     |__|
      
   
  /* BREADTH-FIRST SEARCH: this method will traverse through an entire line of nodes before moving on to the next node. The only problem with this approach
   is that you will need to find the height of the largest branch in the binary tree, so you will need to implement a DFS function that traverses through each 
   branch. Once you find the height of the biggest branch, you will use the height to traverse each level in the binary tree . */


              // RECURSIVELY
                              var maxDepth = function(root, depth = 1) {
                                    if(!root)
                                        return depth - 1;
                                
                                    let depthOne = maxDepth(root.left, depth + 1);      
                                    let depthTwo = maxDepth(root.right, depth + 1);     
                                    return Math.max(depthOne, depthTwo);
                                };
                              let depth = maxDepth(root);


                             function currentLevel(next, level) {         
                                      if(!next)
                                          return;
                                      if(level === 1)
                                          console.log(next.val)
                                      else if(level > 1){
                                          currentLevel(next.left, level - 1);
                                          currentLevel(next.right, level - 1);            
                                      }
                                 }  
                                 
                              for(let i = 1; i <= depth; i++)                //we use the height to calculate how many levels to iterate in binary tree
                                   currentLevel(root, i);



                  // ITERAVELY
                            let nodes = [root];
      
                            while(nodes.length) {  
                              let stack = [];                               //this stack will contain ALL of the left and right nodes of the root node
                      
                              while(nodes.length){
                                  let current = nodes.shift();
                                  if(current.left) stack.push(current.left);
                                  if(current.right) stack.push(current.right);
                                  console.log(current.val)
                              }
                              nodes = stack;
                          }




  /* DEPTH-FIRST-SEARCH: (PRE-ORDER TRAVERSAL) this is a way of traversing through a binary tree or any other data structure, this method will traverse through an entire branch 
   before back-tracking to the next branch, it starts at the root node and works its way down to the end of a branch */
            
                          function DFS (next) {
                                if(!next)
                                    return;                    //we stop the traversing in this specific instance of the recursive function

                                console.log(next.val);         //accessing the value in the node
                                DFS(next.left)                 //creating an instance where the function obtains the next node's value
                                DFS(next.right)                //creating another instance where the function obtains the next node's value
                            };




  /* IN-ORDER TRAVERSAL: this method will traverse through a binary search tree and will access the values in ascending order.
    this method works best with binary search trees which are guaranteed to have its values sorted */

                    //traversing BST in ascending order
                          function inOrderTraversal(next){
                                if(next.left)
                                    inOrderTraversal(next.left);
                                console.log(next.val);
                                if(next.right)
                                    inOrderTraversal(next.right)
                            }
                        
                            inOrderTraversal(root);

                    //traversing BST in descending order
                            function traverse(next){
                                if(!next)
                                    return next;
                                
                                traverse(next.right);   
                                console.log(next.val);             
                                traverse(next.left);
                            }
                        
                            traverse(root);



/* POST-ORDER TRAVERSAL: this method will search through a binary tree, starting from the ends of the branches and works it way to the root*/

                          function traverse(next) {
                              if(!next)
                                  return;
                      
                              traverse(next.left);
                              traverse(next.right);
                              console.log(next.val);
                          }
                      
                          traverse(root);







