----------------------------------------------------------- ALGORITHMS --------------------------------------------------------------------





//BINARY SEARCH ALGORITHM: is a searching algorithm used in a SORTED array by repeatedly dividing the search interval in half. 
//This algorithm is designed to find a target in an array
//The time complexity is O(Log n). 
               
1)            //Binary search that excludes the left and right pointers;
               
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

2)         //Binary search with duplicate values

            var targetIndices = function(nums, target) {
                let answers = [];
                let l = 0;
                nums.sort((a, b) => a - b);
            
                for(let r = nums.length - 1; l <= r;){                      //we want to find the leftmost occurence of the target in the array
                    let middle = Math.floor((l + r)/2);
            
                    if(nums[middle] >= target)
                        r = middle - 1;
                    else
                        l = middle + 1;
                }
            
                while(nums[left] === target){
                    answers.push(left++);
                }     
                
                return answers;
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
    

2)            // Two pointer that is used for two sorted arrays 
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




3)           //Two pointers that will change the order of the values based on a condition
              //EX: move all the zeroes to the left side and non-zeroes to the right side of array

            let l = 0;
            let r = nums.length - 1;

            while (l < r){
                while(l < r && nums[l] === 0)
                  l++;
                while(l < r && nums[r] !== 0)
                  r--;
                [nums[l], nums[r]] = [nums[r], nums[l]];
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















//PREFIX SUM: This is a technique that creates an array where each value is the sum of all the values before it

            let arr = [10, 20, 10, 5, 15];
            let prefixSumArr = [10, 30, 40, 45, 60];              //0 + 10 = 10        20 + 10 = 30         10 + 20 + 10 = 40

1)          // Left prefix sum that doesnt include a 0 in the beginning

              function fillPrefixSum() { 
                    let arr = [10, 4, 16, 20]; 
                    let prefixSum = [arr[0]];
               
                    for (let i = 1; i < n; i++) 
                        prefixSum[i] = prefixSum[i - 1] + arr[i]; 
        
                    //prefixSum = [10, 14, 30, 50]
              } 



2)          // Left prefix sum that includes a 0 in the beginning

              function fillPrefixSum() {
                    let arr = [10, 20, 10, 5, 15];
                    let prefixSumArr = [0];              
    
                    for(let i = 0; i < arr.length; i++){
                          prefix[i + 1] = prefix[i] + arr[i];
                    }                
              }




3)             // Right prefix sum that includes a 0 in the end (first value will contain the sum of the last value and everything after that)

                function fillPrefixSum(){
                      let arr = [10, 20, 30, 40, 40];
                      let rightSum = [0];
                  
                      for(let r = nums.length - 2; r >= 0; r--){
                          rightSum.unshift(rightSum[0] + nums[r + 1]);
                      }                  
                }












//RECURSION: its the ability of a function to call it self many times. The whole point of recursion is to break a problem into smaller parts, thereby reducing the
//complexity of the problem at hand. Typically, all recursive functions have a base case that will terminate the recursive calls once the case is true

                function recursion(n){
                      if(n == 0)                //base case
                        return;
                      
                      recursion(n - 1);        //recursive call
                }

                recursion(5);










1)    // Reverse a stack using recursion
      // (this method lets you use an instance of a function to store data)

        function recurse(i, j){
            if(j < 0)
                return 0;
                
            let prev = St[i];                      //every instance will have its own prev
            let current = recurse(i + 1, j - 1)   
            St[current] = prev;
            return current + 1;

        }

        recurse(0, St.length - 1);




  VISUAL:

        stack = [1,2,3,4,5]
    
        reverse(0, 4)     prev = 1            //every instance will have its own prev that can be used by another instance
            |
            |
        reverse(1, 3)     prev = 2
            |
            |
        reverse(2, 2)     prev = 3
            |
            |
        reverse(3, 1)     prev = 4
            |
            |
        reverse(4, 0)     prev = 5
            




2)     // Generate a sequence that looks like this 
       // 16, 11, 6, 1, -4, 1, 6, 11, 16

        let sequence = [];
        function printSequence(n) {
            sequence.push(n);
            if (n <= 0)
                return;
            
            printSequence(n - 5);
            sequence.push(n);      //remember that n will be different for every instance
          }

         printSequence(n);
        


  VISUAL: 
          printSequence(16)    n = 16
                |
                |
          printSequence(11)    n = 11
                |
                |
          printSequence(6)     n = 6
                |
                |
          printSequence(1)     n = 1
                |
                |
          printSequence(-4)   // back tracking starts here






3)   //Find the middle node of a linked list
     //(this function is using floyds algorithm recursively)
    let head = linkedList;

    function traverse(fast, slow) {
        if(fast && fast.next){
             return traverse(fast.next.next, slow.next);            
        }
        else {
            return slow;            
        }           
    }
    traverse(head, head);






4)   // Find the sum of all the digits using recursion 
     // (this method breaks down the problem into smaller sub problems)

      function sumOfDigits(number) {
          if (number < 10) 
              return number;
              
          // Extract the last digit
          const lastDigit = number % 10;
          
          // Recursively call the function with the remaining digits
          const remainingNumber = Math.floor(number / 10);
          return lastDigit + sumOfDigits(remainingNumber);
       }
          
      sumOfDigits(1234);

  
      VISUAL: 
                sumOfDigits(1234) = 6 + 4 = 10       last = 4
                      |             ^_______
                      |                     |
                      v                     | 
                sumOfDigits(123) = 3 + 3  = 6        last = 3
                      |            ^_______
                      |                   |
                      V                   |
                sumOfDigits(12) = 1 + 2 = 3         last = 2
                      |          ^
                      |          |
                      V          |
                sumOfDigits(1) = 1                   //we start the backtracking process here










5)   // Prints all possible strings of length k that can be formed from a array of n characters
    //( this method creates multiple instances of a problem and checks every instance)

    const arr = ['a', 'b'];
    const k = 3;
    let answer = []

    function findAllKLength(prefix, n, k) {
        if (k === 0) {
            answer.push(prefix);
            return;
         }

        for (let i = 0; i < n; i++) {
            const newPrefix = prefix + arr[i];
            findAllKLength(newPrefix, n, k - 1);
        }
    }

    findAllKLength('', arr.length, k);



    VISUAL:

                                                                                            findAllKLength('')                 k = 3
                                                                                                   |
                                                                                                   |
                                        findAllKLength('a')                                                                                  findAllKLength('b')       k = 2
                                                |                                                                                                    |
                                                |                                                                                                    |
                findAllKLength('aa')                          findAllKLength('ab')                                 findAllKLength('ba')                               findAllKLength('bb')    k = 1
                        |                                              |                                                   |                                                   |
                        |                                              |                                                   |                                                   |
  findAllKLength('aaa')  findAllKLength('aab')       findAllKLength('aba') findAllKLength('abb')        findAllKLength('baa') findAllKLength('bab')          findAllKLength('bba') findAllKLength('bbb')   k = 0;











        




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

1)   //find the next greater element to the right for every index i, if there is no greater element, return -1;

  function nextGreaterElement(nums) {
     let map = [];
     let stack = [];

     for(let i = 0; i < nums.length; i++){
         while(stack.length && stack[stack.length - 1] < nums[i])
             map[stack.pop()] = nums[i];                         //we map a value in nums array with the next greatest element
         stack.push(nums[i]);
     }

    return nums.map((num) => map[num] || -1 );
  }
  


/*
    QUEUE data structure  
    
    Queue is a linear data structure in which elements can be inserted only 
    from one side of the list called rear, and the elements can be deleted 
    only from the other side called the front. The queue data structure 
    follows the FIFO (First In First Out) principle, 
    i.e. the element inserted first in the list, 
    is the first element to be removed from the list.


                //FIFO: first in first out... 
                
                                             
                            
                                  
                                   |          |              |          |  
                                   |  link3   |              |          |               
                                   |  link2   |              |  link3   |
                                   |  link1   |              |  link2   |
                link 1              ----------                ----------
                  |      push()         |                         |           pop()          
                   ----------------------                         ----------------------- > link 1
  */
                   




/* 
    PRIORITY QUEUE (heap): a structure that organizes elements based on a hierachy, typically the first element has the highest priority while the last element has the lowest priority
*/

      //1) find the k weakest rows in a matrix

      let mat = [
          [1,1,1,0,0],
          [1,0,0,0,0],
          [1,1,0,0,0],
          [1,1,1,1,1];
      ]


      var kWeakestRows = function(mat, k) {
          let heap = [];
          let answer = [];
      
          for(let i = 0; i < mat.length; i++){          
              let soldiers = 0;
              for(let j = 0; j < mat[i].length; j++){
                  if(mat[i][j] === 1)
                      soldiers++;
                  else
                      break;
              }
              heap.push([i, soldiers]);                //you map the index with the total number of soldiers
          }
      
          heap.sort((a, b) => a[1] - b[1]);            //this is where you sort the heap based on priority
      
          for(let i = 0; i < k; i++){                  //now we can easily access the first k elements because we know those k elements are the weakest rows
              answer.push(heap[i][0]);
          }
      
          return answer;
      };










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

      //RECURSIVELY





  2)  //Reversing a Linked list:

      1 -> 2 -> 3 -> 4 -> 5 ->  null      ----->      5 -> 4 -> 3 -> 2 -> 1 -> null

      var reverseList = function(head){
        let reversed = null;                                //this will contain the reversed list
        let temp = null                                     //this will be used to temporarily save a portion of the list
        let currentNode = head;

        while(currentNode){                                 // currenttNode = 1                                            next iteration: currentNode = 2
            temp = currentNode.next;                        // we are saving 2 -> 3 -> 4 -> 5 -> null                      next iteration: 3 -> 4 -> 5 -> null
            currentNode.next = reversed;                    // we disconnect 1 from the list, 1 -> null                    next iteration: 2 -> 1 -> null
            reversed = currentNode;                          // reverse = 1 -> null                                         next iteration: 2 -> 1 -> null
            currentNode = temp;                             // we move to node 2                                           next iteration: we move to node 3 
        }
        return reversed;                                
      }

      //RECURSIVELY

      function reverse(next){
        if(!next.next){
            reverseList = next;
            return next;
        }

        let prevNode = reverse(next.next);
        prevNode.next = next;
        next.next = null;
        return next; 
    }

    reverse(head);
      


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

    //RECURSIVELY

    var deleteDuplicates = function(head) {
        if (!head) 
            return null;
    
        while (head.next && head.val == head.next.val) {
            head.next = head.next.next;
        }
        head.next = deleteDuplicates(head.next)
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

      //RECURSIVELY
      let del = 5;
  
      function traverse(next) {
          while(next && next.val === del)
              next = next.next;
          
          if(!next)
              return null
        
          next.next = traverse(next.next);
          return next;  
      }

      traverse(head);


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



  6) //Traversing through a double linked list

    var traversingBack =  function(steps) {        //steps is the number of nodes that we have to traverse
      
      while (currentNode.back && steps) {
          currentNode = currentNode.back;
          steps--;
      }
      
      return currentNode;
  };

    var traversingForward =  function(steps) {        //steps is the number of nodes that we have to traverse
      
      while (currentNode.next && steps) {
          currentNode = currentNode.next;
          steps--;
      }
      
      return currentNode;
  };



7)   //Merging two sorted lists into one sorted list
     // (RECURSIVELY)

    var mergeTwoLists = function (l1, l2) {
        if (!l1) 
            return l2;
        else if (!l2) 
            return l1;
        else if (l1.val <= l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } 
        else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2
        }
    };


8)  //Check if the linked list is a palindrome

    let next2 = head;
    let flag = true;

    function traverse(next) {            //the idea here is that as we start to backtrack
        if(node.next)                    // we will use another pointer that traverses from the beginning
            traverse(next.next);
        if(next.val !== next2.val)
            flag = false;
        next2 = next2.next;
    }
    traverse(head)



9) //Traversing a linked list and saving a reference to the previous node

  var deleteNode = function(node, prev) {

    if (node.next) {
        prev = node;                  //this is where we save a reference to the previous node
        node.val = node.next.val;
        deleteNode(node.next, prev);
    } else {
        prev.next = null;
    }
};
















            
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


                             function findHeight(nextNode) {
                                    if(!nextNode)
                                        return 0;                                                 //the moment that this return statement is returned, we start to backtrack
                                    else{
                                        let lheight = findHeight(nextNode.left);
                                        let rheight = findHeight(nextNode.right);

                                        return  Math.max(lheight, rheight) + 1;                //when we backtrack, we will continue adding 1 to the previous height everytime 
                                    }
                              }
                              let height = findHeight(root);


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
                                 
                              for(let i = 1; i <= height; i++)                //we use the height to calculate how many levels to iterate in binary tree
                                   currentLevel(root, i);



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



/* ITERATION: You can use iteration to traverse through a binary tree*/

                      function traverse(head){
                            const queue = [head];                          //all the nodes will be placed in an array
                        
                            while(queue.length) {
                                const current = queue.shift();             //we initially remove the first node from the array           
                                console.log(current.val)                   //we can access the node from here
                                                        
                                if(current.left)                           //we start to traverse through both branches of a node, if they exist
                                    queue.push(current.left);
                                if(current.right) 
                                    queue.push(current.right);
                            }                        
                      }

                      traverse(head);





                1) //Traverse through a binary SEARCH tree and return a node that has a specific value
                  // (this method traverses only ONE branch, this ONLY works with binary SEARCH trees)

                        function traverse(next){
                            if(!next)
                                return null;
                            if(next.val === val)
                                return next;                
                            else if(next.val > val)
                                return traverse(next.left);
                            else
                                return traverse(next.right);        
                          }
                      
                          traverse(root);


                2) // Merge two binary tree into one tree, if there are two overlapping nodes in both trees, then add both node values. 
                  
                        var mergeTrees = function(root1, root2) {
                              if(!root1 || !root2)                                        //if one branch is null, we return the other branch that is NOT null
                                  return root1 || root2;
                          
                              let node = new TreeNode(root1.val + root2.val);              //with every recursive call, we save a reference to this node
                          
                              node.left = mergeTrees(root1.left, root2.left)
                              node.right = mergeTrees(root1.right, root2.right);
                          
                              return node;
                          };




