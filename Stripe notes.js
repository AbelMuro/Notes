/* 

    Steps to install stripe into your app

      0) In the stripe dashboard, you may need to create a 'store' that will keep track of the apps that use the stripe api 
          (go to the top left corner of the dashboard and select 'create new account')

      1) Go to Developers -> API keys -> Secret key
          copy the secret key and save it 

     2) npm install @stripe/stripe-js @stripe/react-stripe-js
*/


// ======================================== HOW TO CHARGE THE USER USING THEIR CREDIT CARD ===================================================

The code below will display a dialog that the user can use to enter credit-card information, 
    once the user confirms their details, they will be charged when they click on the 'submit' button

//--------Front end code
/*
    Error State messages for the handleChange()

    CardNumberElement:
        'Your card number is incomplete.'
        'Your card number is invalid.'

    CardExpiryElement:
        "Your card's expiration date is incomplete."
        "Your card's expiration year is in the past."

    CardCvcExpiry
        "Your card's security code is incomplete."
*/


import { loadStripe } from '@stripe/stripe-js'; 
import { Elements } from '@stripe/react-stripe-js'
import { CardElement, CardCvcElement, CardExpiryElement, CardNumberElement, useStripe, useElements} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('secret api key');

const options = {                        //font files can only be loaded through https
    fonts: [{family: 'SpaceGrotesk', src: 'url(https://db.onlinewebfonts.com/t/7f510d38d1c785c851d73882c0ca58c0.ttf)', style: 'normal', weight: "500", size: '18px'}]
}

function App() {
    return(
        <Elements stripe={stripePromise} options={options}>
            <Form/>
        </Elements>
    )
}


function Form() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        if(e.error){
            const message = e.error.message;
            setError(message);        
        }
        else if(e.empty){
            setError('input is empty')
        }
    }   

    const handleSubmit = async () => {
        try{
            const cardNumberElement = elements.getElement(CardNumberElement);                    //you dont have to use .getElement() on all the stripe elements, just one will be enough
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
                billing_details: { 
                    name: 'John Doe',                 
                }, 
            })
            if(error) 
                throw new Error(error);
            
            const response = await fetch('http://localhost:4000/confirm_payment', {
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
            const message = error.message;
            console.log(message);
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <CardElement/>            // This will open up a dialog that the user can use to insert their credit card details
            <CardExpiryElement/>      // The following elements will use a pre-built input that you can use to securely extract the credit card details
            <CardCvcElement/>        
            <CardNumberElement        // The options prop can be used to apply certain css properties (not all)
                    options={{        
                        style: {
                            base: { 
                                fontSize: '18px', 
                                color: '#21092F', 
                                fontFamily: 'SpaceGrotesk, Arial, sans-serif', 
                                fontWeight: "500",
                                '::placeholder': { 
                                    color: '#21092f40', 
                                    fontFamily: 'SpaceGrotesk, Arial, sans-serif',
                                },
                            }
                    },
                    placeholder: '1234 5678 9123 0000'
                    onChange={handleChange}      // You can also use the handleChange to get the error state of the stripe element, there is no blur event or invalid event
                }} 
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

router.post('/confirm_payment', async (req, res) => {
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
        const message = error.message;

        if(message === 'Your card number is incorrect.')
            res.status(400).send(message);
        else if(message === "Your card's security code is incorrect.")        //this will also return true if the user has the incorrect exp date
            res.status(400).send(message);
        else 
            res.status(500).send(message);
    };
})




//============================================ HOW TO CHARGE USERS USING THEIR BANK ACCOUNT INFO ==============================================






//------------Front end code
function Form() {
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'us_bank_account',
                us_bank_account: {
                    account_holder_type: 'individual',
                    account_number: '123456789',
                    routing_number: '123456789',
                },
                billing_details: {
                    name: 'customers name',
                },
            });

            if(error)
                throw new Error(error.message);

            const response = await fetch('http://localhost:4000/confirm_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({paymentMethodId: paymentMethod.id, amount: 150})
            })
    
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
            }
            else if(response.status === 400){
                const message = await response.text();
                console.log(message);
            }
            else{
                const message = await response.text();
                console.log(`Error from server: ${message}`);
            }            
        }
        catch(error){
            console.log(`Unknown error: ${error.message}`)
        }
    }


    return (
        <form className={styles.container} onSubmit={handleSubmit} id='card'>
            //inputs that ask for the users account number and routing number
        </form>  
     )       
}






//----------------- Back end code


const Stripe = require('stripe');
const stripe = Stripe('api key')

router.post('/confirm_payment', async (req, res) => {
    const { paymentMethodId, amount} = req.body; 
    const userAgent = req.headers['user-agent'];
    const customerIpAddress = req.headers['x-forwarded-for'] || req.ip;


    try { 
        await stripe.paymentIntents.create({                    //this will actually charge the user
            amount: amount,                                     //amount in cents
            currency: 'usd', 
            payment_method: paymentMethodId, 
            payment_method_types: ['us_bank_account'],        //this is necessary for bank account charges
            confirm: true,            
            mandate_data: {                                    //this is a requirement
                customer_acceptance: { 
                    type: 'online', 
                    online: { 
                        ip_address: customerIpAddress,         //you must specify the ip_address
                        user_agent: userAgent 
                    }
                }
            },

        }); 
        res.status(200).send('Payment Confirmed'); 
    } 
    catch (error) { 
        const message = error.message;

        if(message === 'The payment details you provided are invalid.')
            res.status(400).send(message);
        else
            res.status(500).send(message) 
    };
})








































