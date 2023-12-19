from flask import Flask, render_template, request, jsonify
import stripe

app = Flask(__name__)

# Set your Stripe API key
stripe.api_key = 'sk_test_51OP4jPSBWyLEwj7481hy85p3bOID3dmZ40sfWMx1aFdVz3DyEupxNBiZhIPLhYktzMUZQH7g1e9yqK90xmtvTeZS00r1Q6NT2Y'

@app.route('/')
def index():
    return render_template('checkout.html', publishable_key='your_stripe_publishable_key')

@app.route('/charge', methods=['POST'])
def charge():
    try:
        # Get the token from the request
        token = request.form['stripeToken']

        # Create a charge using the token
        charge = stripe.Charge.create(
            amount=1000,  # Replace with the actual amount in cents
            currency='usd',
            description='Example charge',
            source=token,
        )

        return jsonify({'status': 'success'})
    except stripe.error.CardError as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
