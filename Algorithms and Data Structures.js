----------------------------------------------------- LEET CODE PROBLEMS SOLVED ---------------------------------------------
/*

  1)  Two Sum: 
      use two pointer technique, one pointer starts at the beginning, 
      the other pointer will be right next to the first pointer.
      Use if statements to check the current sum of the elements in the array
      return the indices of the pointers if the current sum is equal to the target

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

  20) Valid Parenthesis:
    use a stack, first in and first out
    use Array.push() and Array.pop();

  22) Generate Parentheses
      use two stacks FIFO, one stack to contain a combination of parentheses for one 'branch' 
      and another stack to contain ALL the combinations of parenthesis

      For the backtracking technique, you first need to understand that a combination must have exactly n opening parenthesis and n closing parenthesis
      Also, the number of opening parenthesis must always be greater than the number of closing parenthesis
      the base case must have a condition that checks if opening and closing parenthesis are BOTH equal to n
      the second case must check if opening parenthesis is less than n (you increment opening by 1)
      the third case must check if opening is greater than closed, (you incremenet closing by 1)
  
  36) Valid Sudoku:
      use a hash map to store the values of the multi dimensional array. You will need two for loops
      One to traverse the rows, and the second to traverse the columns. The index that you use for the for loops
      will be used as properties of the hash map and the numbers in the sudoku will be used as values for the hash map
      Make sure to use an array as the value for each key in the hash map

      map.set(row, board[row][column]);      
      map.set(column, board[row][column]);


  42) Trapping Rain Water
        You will need to find the max value on the left of each index and the max value on the right as well.
        Then you will need to use this formula to calculate the amount of water the index can store

        min(maxLeftHeight, maxRightHeight) - height[i]        // make sure to exclude the result if its negative

        you can use the following for loops
        
          for(let i = 0; i < height.length; i++)
              for(let l = i - 1; l >= 0; l--)                // the innter for loop will check all the values on the left side of the index

          for(let i = height.length - 1; i >= 0; i--){
             for(let r = i + 1; r < height.length; r++)       // the inner for loop will check  all the values on the right side of the index
    
  49) Group Anagrams:
      Use a loop to traverse through the array of words, then sort each word in alphabetical order and
      add the sorted word as a property of a hash map, then use the unsorted word and add it as a value of the hash map

  74) Search 2D matrix
      Use binary search two times. Once for the rows, and again for the columns in the matrix
      You will need to check the first column and the last column of each row and see if the target falls within that range. 
      If it does, then use binary search on that row only.
      If the first column of the row is less than the target, then you move to the previous row
      If the last column of the row is more than the target, then you move to the next row
  

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

  150) Evaluate Reverse Polish Notation
      use a stack FIFO to store the operands. Traverse through the array and push the numbers onto the stack, 
      when you encounter a operator (+, -, *, /), you will need to pop() the last two elements of the stack
      and perform the operation, and then put the result back onto the top of the stack

  153) Find Minimum In Rotated Sorted Array
      we use a variation of binary search,
      First we calculate the middle index of the array, then we check if the left pointer is less than the right pointer
      if its true, the we save the value of the left pointer because we know that section of the array is already sorted
      Every iteration we must check if the current value of middle is less than the saved value in min
      Then we check if the middle value is greater than or equal to the left pointer, 
      if its true, then we check the right side of array
      if its false, then we check the left side of the array
      
      
      

  155) Min Stack
      very straightforward, the MinStack function should have a 'private variable' called this.stack = [];
      the other functions should be easy to implement


  167) Two Sum II - Input Array Is Sorted
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

  704) Binary Search
    use the binary search algorithm. Declare a local variable middle and use the formula (i + j)/2 
    to calculate the middle index. Then use the middle index to compare that value with the target
    If the middle index is less than the target, you subtract middle by 1 and assign the result to i
    If the middle index is more than the target, you add middle by 1 and assign the result to j

  739) Daily Temperatures
        use a stack FIFO to store the temperatures and their index.
        You want to use an inner while loop that will continue popping the elements 
        on top of the stack.
        You calculate the daysWaited by subtracting the index from the element on top of the stack 
        from the current index

  853) Car fleet
    Combine the positions array and the speed array into one array and then sort it in descending order
    You will have to use a stack to contain the time it takes for one car to arrive to the target
    (target - position)/speed = time

    When you calculate the time for a car, you push it into the stack. 
    If the top of the stack is less than or equal to the element beneath it, then we pop the element on top
    The idea here is that those two elements that we compared have become a car fleet

 875) Koko eating Bananas
     Find the max value in the piles array, that value will be the max value for k. [1,2,3,....., k]
     Then use a 'for' loop to iterate to k
     Use an inner 'for' loop to traverse through the piles array and divide each value with the current k, 
        the result of that will be accumulated into a variable currentHours
        CurrentHours is the hours it will take for the monkey to consume all piles at speed k
    if currentHours is greater than h, then we traverse on the right side of the k array
    if currenthours is less than or equal to h, then we traverse on the left side of k array
    this is where we use binary search


    2325) Decode the message
      use a hash map to contain all the first occuring letters in the string 'key' and assign a corresponding letter in the alphabet
      key = hello world ...
            h e l o w   r d ...     we get the first occurence of EVERY letter in the key above
            a b c d e   f g  ...    and assign a letter in the alphabet 
             
      then traverse through the string 'message' and check every letter to see if it exists in the hash map
      If it does, then we get the value of the current key and we accumulate it to some local variable
    
  
*/
    


  


----------------------------------------------------------- ALGORITHMS --------------------------------------------------------------------


//LINEAR SEARCH ALGORITHM: is a searching algorithm that goes through each element in the array, one by one. The time complexity 
              //for this algorithm is O(n)














//BINARY SEARCH ALGORITHM: is a searching algorithm used in a SORTED array by repeatedly dividing the search interval in half. 
//This algorithm is designed to find a target in an array
//The time complexity is O(Log n). 
               
1)            //Binary search that excludes the left and right pointers;
               
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

2)         //Binary search with duplicate values

            var search = function(nums, target) {
                  let middle;

                  for(let i = 0, j = nums.length - 1; i <= j;){
                        middle = Math.floor((i + j) / 2);               //we get the middle index of the array
                        if(nums[middle] > target)                                 
                            j = middle - 1;
                        else if(nums[middle] < target)
                            i = middle + 1;
                        else{
                          let left = middle - 1;
                          let right = middle + 1;
                
                          while(nums[left] === target)
                              left--;
                          while(nums[right] === target)
                              right++;
                          
                          break;
                        }
                          
                  }
                  return -1;
                };

3)         //Binary search that counts the left and right pointers

            const binarySearch = (target, arr) => {
                  let left = 0;
                  let right = arr.length;
              
                  while (left < right) {
                      let mid = Math.floor((left + right) / 2);
                      if (arr[mid] > target) {
                          right = mid;
                      } else if (arr[mid] < target) {
                          left = mid + 1;
                      } else {
                          return mid;
                      }
                  }
                  return -1
            }



4)      //Binary Search: Aggressive Cows, used for searching the maximum value of the minimum distance between any two elements within a subarray of k length in an array
        //EX: given an array of numbers, find the largest minimum distance between any two numbers in the array

         [1,    2 ,    4,     8,     9]

        // what we do here is create a range between 0 and 9, we use binary search on this range
        // each of these numbers IN THE RANGE represents a possible distance that can be used to place k cows
       
        // k = 3
        // Each line below represents a cow
                                                   //keep in mind that mid is the distance that you MUST maintain when you place the cows
        1)        [1,    2 ,    4,     8,     9]            mid = 4   // we could not place 3 cows, so this distance cannot be used as an answer
                   |                   |                              // (we continue looking on the left side of the current range)
        
        2)        [1,    2 ,    4,     8,     9]            mid = 2   // we were able to place 3 cows, so this distance is a possible answer
                   |            |      |                               // (we continue looking on the left side of the current range)
        
        2)        [1,    2 ,    4,     8,     9]            mid = 3   // we were able to place 3 cows, so this distance is a possible answer 
                   |            |      |                              // (but since we are finding the MAX distance, we continue looking on the right side of current range)

          The answer is mid = 3;

          var AggressiveCoews = function(price, k) {
                price.sort((a, b) => a - b);                        //sorting is required
                
                let result = 0;
                let left = 0;
                let right = price[price.length - 1];
                
                while (low <= high) {                               //we traverse through a range of distances
                  const mid = Math.floor((left + right) / 2);
                  if (hasAtLeastKCows(mid, price, k)) {
                      result = mid;        
                      left = mid + 1;                               
                  } 
                  else 
                      right = mid - 1;                              //if we cannot place k = 3 cows with distance 'mid', then everything on the right side will be invalid
                  }
                
                  return result;
          };

          function hasAtLeastKCows(distance, price, k) {            //we determine if the distance given here is possible 
                  let lastVal = price[0];
                  let cows = 1;
                
                  for (let i = 1; i < price.length; i++) {
                    const diff = price[i] - lastVal;
                    if (diff >= distance) {
                      cows++;
                      lastVal = price[i];
                    }
                  }
                
                  return cows >= k;
          };
          




5)      //Binary Search: when k represents the data about the number that we are looking for (smallest number, largest number)
        //In this case, you should always create a range of possible values within the array

         matrix = [1,5,9,10,11,12,13,13,15];

        let left = matrix[0];
        let answer = matrix[0];
        let right = matrix[matrix.length - 1];

        while(left < right){
          let middle = Math.floor((left + right)/2);
          
          for(let i = 0; i < matrix.length; i++){
              //search through the original array and compare 'middle' with the values here somehow
          }

          if(/*mid does not meet some condition*/){
             left = mid + 1;      
             answer = mid + 1;
          }
          else  //if mid meets some condition, we keep mid within the range but cut the range by half
            right = mid;
        }







//TWO POINTER MANIPULATION ALGORITHM: Two pointers is an easy and effective technique that is typically used for searching pairs in a SORTED array.

//Given a sorted array A (sorted in ascending order), having N integers, find if there exists any pair of elements (A[i], A[j]) such that their sum is equal to X.
//The time complexity for this algorithm is O(n)

1)          //Two pointer that is used for a single array
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
    

2)            // Two pointer that is used for two arrays 
              // EX: look for a MINIMUM common value in both arrays
                  let i = 0;
                  let j = 0;

                  while (i < nums1.length && j < nums2.length) {
                      if (nums1[i] === nums2[j]) 
                          return nums1[i]
                        
                      else if (nums1[i] < nums2[j])              //the logic here is the smaller number must keep incrementing
                          i++;    
                        
                      else if(nums1[i] > nums2[j])
                          j++;                     
                  }              
















    
    
//SLIDING WINDOW ALGORITHM: This algorithm is designed save some re-calculation, the time complexity for this algorithm is O(n)


1)      //Sliding Window when k represents the length of the window
        //EX:  Given an array of integers, Our aim is to calculate the maximum sum of 5 consecutive elements in the array.
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




2)        // Sliding window when k represents the maximum number of operations allowed
          // This method only works if we can perform operations on BOTH T and F

          // EX: Return the maximum number of consecutive 'T's or 'F's in the string s
          // after performing the operation(changing 'T' to 'F' or vice versa) at most k times.
            VISUAL:  
                     'TTFFTTFTFFTT'    'TTFFTTFTFFTT'      'TTFFTTFTFFTT'        'TTFFTTFTFFTT'
                      |  |              |       |           |          |               |     |
                      ----               -------             ----------                 -----
                          ->                      ->                       ->

              
            var maxConsecutiveAnswers = function(answerKey, k) {
                let maxSubstring = 0;
                let left = 0;
                let count = {T: 0, F: 0};
            
                for(let right = 0; right < answerKey.length; right++){
                    count[answerKey[right]]++                            // we count the occurences of 'T' and 'F'
            
                    if(Math.min(count.T, count.F) > k)                   // if we had 'T T T F F', then we can only make changes to 'F F' because k = 2
                        count[answerKey[left++]]--;                      // so we need to make sure that the minimum occurence of 'T' or 'F 'is less than or equal to k
      
                    let windowLength = right - left + 1;
                    maxSubstring = Math.max(maxSubstring, windowLength);
                }  
            
                return maxSubstring; 
            };




3)          //Sliding Window when k represents the maximum number of operations allowed
            //This method only works if when can perform on ONE type of data (changing 0's but not 1's)

            //EX: Given a binary array nums and an integer k, return the maximum number of 
            // consecutive 1's in the array if you can flip at most k 0's.

            var longestOnes = function(nums, k) {
                  let zeroCount = 0;                            //we only keep track of the number of zeroes in the window
                  let left = 0;
                  let maxSubstring = 0;        
                  let windowLength;
              
                  for(let right = 0; right < nums.length; right++){
                      if(nums[right] === 0)
                          zeroCount++;
              
                      if(zeroCount <= k){                        //as long as the zero-count is less than k (maximum allowable operations)
                          windowLength = right - left + 1;                
                          maxSubstring = Math.max(maxSubstring, windowLength);
                      }
                      else if(zeroCount > k){                    //if zeroes exceed k, then we shrink the window
                          if(nums[left++] === 0)
                              zeroCount--;
                      }       
                  }
                  
                  return maxSubstring;
              };












//BUBBLE SORT ALGORITHM: designed to sort an array in ascending order with time complexity of 0(n^2)
                
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
      
       
      
      
      
   
      
      
      
      
      
      
      
      
      
      
------------------------------------------------------- DATA STRUCTURES ----------------------------------------------------------


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
                                  |            |         |            |               link 4 
                                  |   link3    |         |   link3    |                       
                                  |   link2    |         |   link2    |
                                  |   link1    |         |   link1    |
                                   -------------          ------------                                               
                                   
*/



/*
    QUEUE data structure  
    
    Queue is a linear data structure in which elements can be inserted only 
    from one side of the list called rear, and the elements can be deleted 
    only from the other side called the front. The queue data structure 
    follows the FIFO (First In First Out) principle, 
    i.e. the element inserted at first in the list, 
    is the first element to be removed from the list.


                //FIFO: first in first out... 
                
                       push()                                              
                 ________________________                         
                |                        |                        
               link 4              |     v    |              |          |  
                                   |  link3   |              |  link4   |               
                                   |  link2   |              |  link3   |
                                   |  link1   |              |  link2   |
                                    ----------                ----------
                                                                   |           pop()          
                                                                    ----------------------- > link 1
  */
                   

















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
                                                                              



     1)  /* Detecting a cycle within a linked list.
     
            Floyd’s Cycle Finding Algorithm (Hare-Tortoise algorithm): 
  
            This algorithm uses two pointers to find a cycle in a linked list 
            One pointer will traverse through the list slowly,
            While the other pointer will traverse through the list quickly
      */

                
        3  -->  2 -->  0 -->  -4 
                ^              v
                |______________|     cycle
                
      var hasCycle = function(head) {
          let slow = head;
          let fast = head;
        
          while (fast !== null && fast.next !== null) {    //if 'fast' points to a null value, then we know there is no cycle
              slow = slow.next;
              fast = fast.next.next;
              if (slow === fast)                            //at some point in the cycle, slow and fast will eventually point to the same node
                  return true;
              
          }
          return false;
      };





  2)  //Reversing a Linked list:

      1 -> 2 -> 3 -> 4 -> 5 ->  null      ----->      5 -> 4 -> 3 -> 2 -> 1 -> null

      var reverseList = function(head){
        let reversed = null;                                //this will contain the reversed list
        let next = null                                     //this will be used to temporarily save a portion of the list
        let currentNode = head;

        while(currentNode){                                 // currenttNode = 1                                            next iteration: currentNode = 2
            next = currentNode.next;                        // we are saving 2 -> 3 -> 4 -> 5 -> null                      next iteration: 3 -> 4 -> 5 -> null
            currentNode.next = reversed;                    // we disconnect 1 from the list, 1 -> null                    next iteration: 2 -> 1 -> null
            reverse = currentNode;                          // reverse = 1 -> null                                         next iteration: 2 -> 1 -> null
            currentNode = next;                             // we move to node 2                                           next iteration: we move to node 3 
        }
        return reversed;                                
      }

      

  3)    //Removing duplicates from a Linked List

      1 -> 1 -> 2 -> 3 -> 4 -> 5 -> 5 -> null;
  
      var deleteDuplicates = function(head) {
        var current = head;
        
        while(current) {
            if(current.next && current.val === current.next.val)            // we check if 2 consecutive nodes are duplicates        1 -> 1 -> 2
                current.next = current.next.next;                           // we sever one of the duplicated nodes from the list    1 -> 2 
            else                                                            // keep in mind that current is still referencing the same node, 
                current = current.next;                                     // we will continue to reference the same node until the 'if' statement is false 
        }
        
        return head;
    };



  4) //Removing all occurences of a number in a linked list

      var removeElements = function(head, val) {

          while(head){                                 //this loop guarantees that the first nodes will not contain the value to be removed
              if(head.val === val)
                  head = head.next;
              else
                  break;
          }
      
          let currentNode = head;
          while(currentNode && currentNode.next) {      
              if (currentNode.next.val === val)         
                  currentNode.next = currentNode.next.next;
              else 
                  currentNode = currentNode.next;      //we only move the pointer to the next node IF node.next !== val
          }
          return head;
      };




  5) //Finding the middle node of a linked list (using floyds algorithm)

    var findMiddleNode = function(head){
        let slow;
        let fast;
      
        while (fast && fast.next){          //slow will eventually point to the middle node of the list
            slow = slow.next;
            fast = fast.next.next
        }
       return slow;
    }
    





























            
   //BINARY TREE: a data structure that has a root node, each node has three parts; data, left pointer and right pointer.
   
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



