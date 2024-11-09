/* 

    Steps to install stripe into your app

      0) In the stripe dashboard, you may need to create a 'store' that will keep track of the apps that use the stripe api 
          (go to the top left corner of the dashboard and select 'create new account')

      1) Go to Developers -> API keys -> Secret key
          copy the secret key and save it 

     2) npm install @stripe/stripe-js @stripe/react-stripe-js
*/


// PAYMENTS USING LINK

The code below will display a dialog that the user can use to enter credit-card information, 
    once the user confirms their details, they will be charged when they click on the 'submit' button

//--------Front end code
import { loadStripe } from '@stripe/stripe-js'; 
import { Elements } from '@stripe/react-stripe-js'
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('secret api key');

function App() {
    return(
        <Elements stripe={stripePromise}>
            <Form/>
        </Elements>
    )
}


function Form() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async () => {
        try{
            const cardElement = elements.getElement(CardElement);
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement
            })
            if(error) 
                throw new Error(error);
            
            const response = await fetch('http://localhost:4000/create_payment_intent', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({paymentMethodId: paymentMethod.id})
            })
            if(response.status === 200){   
                const result = await response.text();
                console.log(result);
            }
            else{
                const message = await response.text();
                console.log(message);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <CardElement/>                                    //this will open up a dialog that the user can use to insert their credit card details
             <button> 
                'Submit'
             </button>
        </form>
    )
}






//------------------back end code
//npm install stripe
const router = express.Router();
const Stripe = require('stripe'); 
const stripe = Stripe('secret api key');

router.post('/create_payment_intent', async (req, res) => {
    const { paymentMethodId } = req.body; 
    
    try { 
        await stripe.paymentIntents.create({                 //this will actually charge the user
            amount: 100,                                    //amount in cents
            currency: 'usd', 
            payment_method: paymentMethodId, 
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        }); 
        res.status(200).send('Payment Confirmed'); 
    } 
    
    catch (error) { 
        res.status(500).send(`${error.message}`) 
    };
})









