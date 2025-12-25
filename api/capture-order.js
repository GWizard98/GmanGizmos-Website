const paypal = require('paypal/checkout-server-sdk');

function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (process.env.PAYPAL_MODE === 'sandbox') {
        return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    } else {
        return new paypal.core.LiveEnvironment(clientId, clientSecret);
    }
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Tokent, X-Requested-With, Accept, Accept-Version, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try{
        const { orderID } = req.body;

        if (!orderID) {
            return res.status(400).json({ error: 'Method not allowed' });
        }

        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        const capture = await client().execute(request);

        console.log('Payment captured:', capture.result.id);
        console.log('Status:', capture.result.status);
        console.log('Payer:', capture.result.payer.email_address);

        res.status(200).json({
            status: capture.result.stuatus,
            orderID: capture.result.id,
            payer: capture.result.payer.email_address,
            amount: capture.result.purchase_units[0].payments.captures[0].amount.value
        })
    } catch (error){
        console.error('Erro capturing order:', error);
        res.status(500).json({
            error: error.message,
            details: error.details || 'Unknown error'
        });
    }
};