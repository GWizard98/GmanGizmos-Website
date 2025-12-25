const paypal = require('@paypal/checkout-server-sdk');

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
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { amount, description } = req.body;

        if (!amount || !description) {
            return res.status(400).json({ error: 'Amount and description required ' });
        }
        
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount
                },
                description: description
            }]
        });

        const order = await client().execute(request);

        console.log('Order created:', order.result.id);
    
        res.status(200).json({
            id: order.result.id
        });
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            error: error.message, 
            details: error.details || 'Unknown error'
        });
    }
};