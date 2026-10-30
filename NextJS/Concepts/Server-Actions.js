/* 
                    SERVER ACTIONS

        Server actions are async functions that run on the server. Similar to server components, but they are designed 
        to be used with forms

*/

    import { useActionState } from "react";
    
    async function submitUser(previousState, formData) {
        const name = formData.get("name");
      
        if (!name)
          return {error: "Name is required"};
    
      
        await saveUserToDatabase(name);
      
        return {error: null, success: true};
    }

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
