/* 
                    SERVER ACTIONS

        Server actions are async functions that run on the server. These functions can make direct queries to the database, 
        removing the need for the browser to make a fetch request to an API route.

        In Next.js, you can use the useActionState hook() and useOptimistic hook() to implement server actions

*/



//================================================ useActionState() ================================================ 
/* 
    This hook will call a function in the server when the user submits the form
*/

    "use client";

    import { useActionState } from "react";
    import {submitUser} from './actions.js';

    function Form() {
          const [state, formAction, isPending] = useActionState(submitUser, {error: null, success: false});
    
          return (
              <form action={formAction}>
                <input name="name" />
          
                <button disabled={isPending}>
                  {isPending ? "Saving..." : "Save"}
                </button>
          
                {state.error && <p>{state.error}</p>}
              </form>
      );

//------ actions.js

    "user server";
                 
    export async function submitUser(previousState, formData) {
        const name = formData.get("name");
      
        if (!name)
          return {error: "Name is required"};
    
      
        await saveUserToDatabase(name);
      
        return {error: null, success: true};
    }









                 


//================================================ useOptimistic() ================================================ 
/* 
      This hook will update the UI before calling a function in the server to make a query to the database
*/

                 
"use client";

import { useOptimistic } from "react";
import { addComment } from "./actions";

export default function Comments() {
    const [optimisticComments, addOptimisticComment] = useOptimistic([], (state, newComment) => [...state, newComment]);
  
    const handleSubmit = async (formData) => {
      const comment = formData.get("comment");
  
      // Update UI immediately and updates the optimisticComments array
      addOptimisticComment(comment);                
  
      // Run server action and performs a query to the database
      await addComment(comment);
    }
  
    return (
      <>
          {optimisticComments.map((comment, index) => (

          ))}
  
        <form action={handleSubmit}>
          <input name="comment" />
          <button type="submit">
            Add Comment
          </button>
        </form>
      </>
    );
}




//------ actions.js


"use server";

export async function addComment(comment){
    await addCommentToDatabase(comment);
}



             
