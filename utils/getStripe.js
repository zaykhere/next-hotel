import {loadStripe} from "@stripe/stripe-js"

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe("pk_test_51HLMIgAe7e74HIRPcTj50N1suvT6EXHEamBVcLkFLQcHPmqbqMA1m9fSYAn5hngqm9kBzBaVUueUXxeEiby67HOm00JyjtNPyu");
    }

    return stripePromise;
}

export default getStripe;
