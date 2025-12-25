module.exports = async (req, res) => {

    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const webhookEvent = req.body;

        console.log('=== PayPal Webhook Event ===');
        console.log('Event Type:', webhookEvent.event_type);
        console.log('Event ID:', webhookEvent.id);
        console.log('Resource:', JSON.stringify(webhookEvent.resource, null, 2));

        switch (webhookEvent.event_type) {
            case 'PAYMENT.CAPTURE.COMPLETED':
                console.log('✅ Payment completed!');
                console.log('Order ID:', webhookEvent.resource.id);
                console.log('Amount:', webhookEvent.resource.amount.value);

                break;

            case 'PAYMENT.CAPTURE.DENIED':
                console.log('❌Payment denied');
                console.log('Reason:', webhookEvent.resource.status_details);
                break;

            case 'PAYMENT.CAPTURE.PENDING':
                console.log('⌛Payment pending');
                break;

            case 'PAYMENT.CAPTURE.REFUNDED':
                console.log('💸Payment refunded');
                break;

            default:
                console.log('ℹ️ Unhandled event type', webhookEvent.event_type);
        }

        res.status(200).json({ received: true});
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: error.message });  
    } 

};