
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { price } = req.body;

            // Create a PaymentIntent with the specified amount
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(amount * 100), // amount in cents
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
