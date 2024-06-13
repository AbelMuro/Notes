//=========================================================== REG EXP ============================================================================
//REGEXP are used to create a pattern that can be used to select certain parts of a string

//syntax for regular expressions...  /pattern/modifiers

//modifiers             /i   perform an case-insensitive matching
//                      /g   perform a global match (doesnt stop at the first match)  
//                      /m   perform a multi-line match

//assertions            ^
//   

//BE CAREFUL WITH THE SPACES IN BETWEEN THE EXPRESSION BELOW
// you will need to use ^ and $ if you want to start a pattern with strings

/ [a-zA-Z] /         //Find a letter character
/ [^a-zA-Z] /        //Find a character that is NOT a letter
/ ^[0-9] /           //Looks for digits at the START of the string
/ [0-9]$ /           //Looks for digits at the END of the string
/ n? /               //you can use ? to check if a pattern exists or not
/ (.\d \s)? /        // you can group together a pattern like this as well
/ /[0-9]{2,3} /      // finds 2 to 3 digits in the string
/ \w /	             //Find an alphanumeric character (letter and number)  [^a-zA-Z0-9_]
/ \W /	             //Find an non-alphanumeric character (letter and number) [^a-zA-Z0-9_]
/ \d /	             //Find a digit
/ \D /	             //Find a non-digit character
/ \s /	             //Find a whitespace character
/ \S /               //Find a non-whitespace character
/ \b /	             //Find a match at the beginning/end of a word,    beginning like this: \bHI,      end like this: HI\b
/ \B /	             //Find a match, but not at the beginning/end of a word
/ \0 /	             //Find a NULL character
/ \n /	             //Find a new line character
/ \f /	             //Find a form feed character
/ \t /	             //Find a tab character
/ \v /	             //Find a vertical tab character
/ \n+ /              //Find a string that contains at least one n or more
/ \^n /              //Find a string that contains n at the beginning of it
/ [^n]/              //find any character that is NOT n
/ \n$ /              //Find a string with n at the end of it
/ \a* /              //find zero or more of `a`
/ ^\d+ (.\d{1,2})?$ /
/ . /                //will find all single characters from the string (its basically like splitting the string into an array)


//its a good idea to use String.match() to use a reg exp to check if the pattern exists in the string
//match will return an array with the characters that match the pattern, 
//if the string doesnt contain characters that match the pattern, then match will return null
let myString = "this is just an example for reg exp 1 2 3 4 5";
myString.match( / [1-4] /g);                       //will search for all numbers between 1 and 4 in the string			
myString.match( / [0-9]{1} /g)		                 //will search for one occurence of a number between 0 and 9 
myString.match( / [0-9]{1,3} /g )	                 //will search for one, two or three occurences of a number between 0 and 9
myString.match( / [0-9\s]{19} /g)	                 //will search for 19 occurences of single digits OR spaces (in any combination)
myString.match( / \never\d+\.\d+ /g)               //you can chain together reg exp, this will select 'never' then any digit, then a period, then another digit
myString.match( / this /g );                       //will search for 'this' in the string
myString.match( / (this)|(is) /g );                //will search for 'this' and 'is' in the string, this separates two patterns () | ()
myString.match( / \d /g);                          //will search for a digit in the string
myString.match( / greetings\d /g);                 //will search for 'greetings' and the first digit next to it
myString.match( / greetings\d+ /g);                //will search for 'greetings' and all the digits next to it 
myString.match( / \bLO /g);                        //will seach for a word that has 'LO' at the beginning of the word (will not select HELLO, but will select LOOK) 
myString.match( / \.js$ /g);                       //the '$' is used to select the pattern at the END of a string



//using variables to define patterns with regexp
const str = "how are you today";
const p = "a";
const pattern  = RegExp(p, "g");
str.match(pattern);

