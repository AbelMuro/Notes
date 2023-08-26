----------------------------------------------------- LEET CODE PROBLEMS SOLVED ---------------------------------------------
/*

  1)  Two Sum: 
      use two pointer technique, one pointer starts at the beginning, 
      the other pointer will be right next to the first pointer.
      Use if statements to check the current sum of the elements in the array

  11) Container with most water
    use two pointer technique, first pointer starts at the beginning, second pointer starts in the end.
    if first pointer's element is less than the second pointer's element, we increment the first pointer
    if first pointer's element is more than the second pointer's element, we decrement the second pointer,
    we calculate the area in every iteration by multiplying the element and result of subtracting the two pointers
    we use a variable maxArea to keep track of the max area calculated in every iteration.

  15) 3Sum
    use three pointer technique, first pointer starts in the beginning, second one starts with the second element, third starts at the very end of the array
    If the sum of the current three elements is less than 0, you increment the second pointer
    If the sum of the current three elements is greater than 0, you decrement the third pointer
    If the sum is equal to 0, then you incremenet the second pointer OR you decrement the third pointer


  36) Valid Sudoku:
      use a hash map to store the values of the multi dimensional array. You will need two for loops
      One to traverse the rows, and the second to traverse the columns. The index that you use for the for loops
      will be used as properties of the hash map and the numbers in the sudoku will be used as values for the hash map
      Make sure to use an array as the value for each key in the hash map

  49) Group Anagrams:
      Use a loop to traverse through the array of words, then sort each word in alphabetical order and
      add the sorted word as a property of a hash map, then use the unsorted word and add it as a value of the hash map

  125) Valid Palindrome: 
      traverse through the string and add the current character into another string palindrome IF its an alpha numeric character.
      reverse all characters in palindrome and assign it to another variable reversePalindrome
      convert all characters in palindrome into lower case and reassign it to palindrome variable
      compare reversePalindrome and palindrome


  128) Longest Consecutive sequence
      Sort the array in ascending order and use a local variable to keeps track of the longest sequence.
      
        next element          current element      
      sortedNums[i + 1] === sortedNums[i] + 1

      the code above will help you determine if the next element is part of the current sequence. 
      Typically, you want to use a for loop to traverse through the array

  167) Two Sume II - Input Array Is Sorted
      use two pointer technique, one pointer starts in the beginning, the other pointer starts at the end
      when two elements add up to a number that is greater than the target, you decrement the pointer at the end
      when two elements add up to a number that is less than the target, you increment the pointer in the beginning
      If its equal, then you return the indices


  217) Contains Duplicates:
       use a hash map to check for duplicates, the properties will be used to represent the letters, the values
       will be used to contain the occurences

  238) Product of Array Except Self
        use two arrays, one called prefix, and the other called postfix. Postfix will contain the product of 
        all the values before the current index, and prefix will contain the product of all the values after the current index
        
                                                        orig index   prefix index
        original array: [1, 2, 3, 4]                             [0] [1]          [1] [2]       [2] [3]
                            -->
        prefix:         [1, 2, 6, 24]      we start with 1  ->    1 * 2 = 2       2 * 3 = 6      6 * 4 = 24

                            <--
        postfix:        [24, 24, 12, 4]

        we then multiply the elements of both prefix and postfix as shown below

        results:       [1 * 24,    1 * 12 = 12,     2 * 4 = 8,     6 * 1 = 6]



  242) Valid Anagram
      use a hash map to count the occurences for each letter in the original word string,
      then traverse through the hash map and subtract the letter occurences in the anagram

      [1,3,2,3] -> letter occurences of original word
      [1,3,2,2] -> letter occurences of anagram
      [0,0,0,1] -> since we have a non-zero number in the hash map, the anagram is NOT an anagram of original word

      OR you can just sort the original word and the anagram in alphabetical order and compare them!!!!

  347) Top K Frequent Elements
        use a hash map to keep track of the occurences of each number in the array,
        then convert the map into an array and sort it in descending order
        then traverse through the first k elements in the array and push those elements into another array
  
*/
    


  


----------------------------------------------------------- ALGORITHMS --------------------------------------------------------------------


//LINEAR SEARCH ALGORITHM: is a searching algorithm that goes through each element in the array, one by one. The time complexity 
              //for this algorithm is O(n)














//BINARY SEARCH ALGORITHM: is a searching algorithm used in a SORTED array by repeatedly dividing the search interval in half. 
//The time complexity is O(Log n). 
               
               EX:
               
                var search = function(nums, target) {
                  let middle;

                  for(let i = 0, j = nums.length - 1; i <= j;){
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


















//TWO POINTER MANIPULATION ALGORITHM: Two pointers is an easy and effective technique that is typically used for searching pairs in a sorted array.
//Given a sorted array A (sorted in ascending order), having N integers, find if there exists any pair of elements (A[i], A[j]) such that their sum is equal to X.
//The time complexity for this algorithm is O(n)
            EX:
              
              let A = [1,2,3,4,5,6,7,8,9,10];
              let X = 10;
              
              for(let i = 0, j = A.length - 1; i < j; i++; j--){
                  if(A[i] + A[j] > X)
                      j++
                  
                  else if(A[i] + A[j] < X)
                      i++;
                    
                  else if(A[i] + A[j] == X)
                      return 1;
              }
    


















    
    
//SLIDING WINDOW ALGORITHM: This algorithm is designed save some re-calculation, the time complexity for this algorithm is O(n)
                     __    __ 
        VISUAL:     |  |  |  | 
                [1, 2, 3, 4, 5]           
                 |  |  |  |  
                 ----  ----         //you can think of this as a 'window' that contains elements
                 
                 
         //EX:  Given an array of integers, Our aim is to calculate the maximum sum of 5 consecutive elements in the array.
                          
              const SlidingWindow = (arr) => {
                let currSum = getSumOfFirstFiveElements(arr, 5);                //you have to manually implement this function
                let largestSum = currSum;
              
                for (let i = 1; i <= arr.length - 5; i++) {
                    currSum -= arr[i - 1];                                     // subtract first element from the 'window'
                    currSum += arr[i + 4];                                     // add next element to the 'window' 
                    largestSum = Math.max(largestSum, currSum);
                }
              
                return largestSum;
              };
            



















//BUBBLE SORT ALGORITHM: designed to sort an array in ascending order with time complexity of 0(n2)
                
                let arr = [1, 4, 3, 1, 5]
              
              
              
                           i = 0;
                  
                           j j+1
                          [1, 4, 3, 1, 5]
                          
                              j j+1
                          [1, 4, 3, 1, 5]                   //we swap 4 and 3 because arr[j] > arr[j + 1];
                          
                                 j j+1                       
                          [1, 3, 4, 1, 5]                   //we swap 4 and 1
                          
                                    j j+1
                          [1, 3, 1, 4, 5]                   //we end the first iteration of the array
                          
                          
                          
                           i = 1;
                          
                           j j+1 
                          [1, 3, 1, 4, 5]
                          
                              j j+1
                          [1, 3, 1, 4, 5]                   //we swap 3 and 1
                          
                                 j j+1
                          [1, 1, 3, 4, 5]                   //we end the second iteration here, remember that  j < arr.lenght - 1 - i;  so we dont iterate to the end of the array at this point
                          
                          
                          
                           i = 2;
                          
                           j j+1
                          [1, 1, 3, 4, 5]                   //this is the last iteration
                          

                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - i - 1; j++) {
                        if (arr[j] > arr[j+1]) {
                          swap(arr[j], arr[i]);                 //pseudo code
                        }
                    }
                }



















//RECURSION: its the ability of a function to call it self many times. The whole point of recursion is to break a problem into smaller parts, thereby reducing the
//complexity of the problem at hand. Typically, all recursive functions have a base case that will terminate the recursive calls once the case is true

  
                function recursion(n){
                      if(n == 0)
                        return;
                      
                      recursion(n - 1);
                }

                recursion(5);




        EX: factorial
            
                function factorial(n){
                    if(n == 0) 
                        return 1;
                    
                    else
                        return n * factorial(n - 1);
                }

        VISUAL:
              
               factorial(5)                 //first call to the recursive function
               5 * factorial(4)
               4 * factorial(3)
               3 * factorial(2)
               2 * factorial(1)
               factorial = 1;               //base case returns true
               2 * 1                        //this is the backtracking phase
               3 * 2
               4 * 6 
               5 * 24
               factorial(5) = 120
               
               
               
               
         EX: Fibonacci series
         
         function fib(n) {
              if(n <= 1)
                return n;
              
              return fib(n - 1) + fib(n - 2)
         }
         
         
         
         VISUAL: 
                                                  fib(5)                                                      //first call to the recursive function
                            fib(4)                   +                   fib(3)
                   fib(3)      +     fib(2)          +          fib(2)     +     fib(1)
              fib(2) + fib(1)  +   fib(1) + fib(0)   +    fib(1) + fib(0)
         fib(1) + fib(0)
         
        fib(1) = 1    fib(0) = 0                         //at this point, the base case returns true, so now just replace all fib(1) with 1 and fib(0) with 0
                                                         //fib(2) becomes 1 + 0, fibt(3) becomes 1 + 1, and so on.
                                                         //this is the backtracking phase 
      
      























      
//INFIX to POSTFIX: IF you want to convert a string that has an mathematical expression into valid js. You will need to convert the string from infix to postfix
//infix: Human readable format for expressions (5 + 3) * 4 - 3 but this format is terrible for computer algorithms
//postfix: It is NOT a human readable format expressions 53+ 4* 3- but this format is perfect for computer algorithms
      

    //this function determines the precedence in the order of operations
    const precedence = (c) => {
        if(c == '^')
            return 3;
        else if(c == '/' || c=='*')
            return 2;
        else if(c == '+' || c == '-')
            return 1;
        else
            return -1;
    }

    const inFixToPostFix = (s) => {
        let stack = []; 
        let result = "";
 
        for(let i = 0; i < s.length; i++) {
            let c = s[i];
 
            // If the scanned character is a operand, add it to output string.
            if(c >= '0' && c <= '9')
                result += c;
 
            // If the scanned character is an ‘(‘, push it to the stack.
            else if(c == '(')
                stack.push('(');
 
            // If the scanned character is an ‘)’, pop and to output string from the stack, until an ‘(‘ is encountered.
            else if(c == ')') {
                while(stack[stack.length - 1] != '('){              //we continue popping the top character from the stack until we find a "("
                    result += stack[stack.length - 1];
                    stack.pop();
                }
                stack.pop();
            }
 
            //If an operator is scanned
            else {
                result += " ";                                      //we add a space here to group together whole numbers that have more that a single digit
                while(stack.length > 0 && precedence(c) <= precedence(stack[stack.length - 1])) {       
                    result += stack[stack.length - 1];              //we continue popping from the stack as long as the current operator has less precedence
                    stack.pop();                                    //than the operator that's on top of the stack
                }
                stack.push(c);
            }
          
          if(i == s.length - 1)
              result += " ";                                      //we add a space here to group together the last whole number
        }
 
        // Pop all the remaining elements from the stack
        while(stack.length != 0) {
            result += stack[stack.length - 1];
            stack.pop();
        }
 
        return result;
    
    }

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
------------------------------------------------------- DATA STRUCTURE ----------------------------------------------------------



STACK DATA STRUCTURE: 


                LIFO: last in first out.... one good example of this is when you click on a link and then press the back button
                      
                        push()
                    ____________________
                   |                    | 
                  link4                 v
                                  |            |
                                  |   link3    |
                                  |   link2    |
                                  |   link1    |
                                   -------------                                                           
                                   
                                                      pop()
                                         _________________________________
                                        |                                 |
                                  |            |                          v
                                  |   link3    |                        link 4
                                  |   link2    |
                                  |   link1    |
                                   -------------



                FIFO: first in first out... 
                
                          push()
                 ________________________
                |                        |
               link 4              |     v    |
                                   |  link3   |
                                   |  link2   |
                                   |  link1   |
                                    ----------
                
                

                                   |          |                 
                                   |  link4   |               
                                   |  link3   |
                                   |  link2   |
                                    ----------
                                        |                       
                                        ----------------------- > link1
                                                  pop()
                
                
                
   
   
   BINARY TREE: a data structure that has a root node, each node has three parts; data, left pointer and right pointer.
   
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
    
   
   
   
   DEPTH-FIRST-SEARCH: this is a way of traversing through a binary tree or any other data structure, this method will traverse through an entire branch 
   before back-tracking to the next branch
   
                TRAVERSE WITH RECURSION:
                
                          var traverse = function(nextNode) {
                                if(!nextNode)
                                    return null;                          //we stop the traversing in this specific instance of the recursive function

                                console.log(nextNode.val);                //accessing the value in the node
                                traverse(nextNode.left)                 //creating an instance where the function obtains the next node's value
                                traverse(nextNode.right)                //creating another instance where the function obtains the next node's value
                            };
   
   
   
   BREADTH-FIRST SEARCH: this method will traverse through an entire line of nodes before moving on to the next node. The only problem with this approach
   is that you will need to find the height of the largest branch in the binary tree, so you will need to implement a DFS function that traverses through each 
   branch. Once you find the height of the biggest branch, you will use the height to traverse each level in the binary tree .
   
    
   
                1) find height of the biggest branch in the binary tree
                
                             function findHeight(nextNode) {
                                    if(!nextNode)
                                        return 0;                                                 //the moment that this return statement is returned, we start to backtrack
                                    else{
                                        let lheight = findHeight(nextNode.left);
                                        let rheight = findHeight(nextNode.right);

                                        return lheight > rheight ? lheight + 1 : rheight + 1;     //when we backtrack, we will continue adding 1 to the previous height everytime 
                                    }
                              }
                              let height = findHeight(root);
                

                  2) recurse through each level in the binary tree
                  
                               function currentLevel(nextNode, level) {           //recursive function that iterates each node on the current level
                                      if(!nextNode)
                                          return;
                                      if(level == 1)
                                          console.log(nextNode.val)
                                      else if(level > 1){
                                          currentLevel(nextNode.left, level - 1);
                                          currentLevel(nextNode.right, level - 1);            
                                      }
                                 }  
                                 
                                  for(let i = 1; i <= height; i++)                //we use the height to calculate how many levels to iterate in binary tree
                                      currentLevel(root, i);



