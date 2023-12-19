// Set your Stripe public key
var stripe = Stripe('your_stripe_publishable_key');

var elements = stripe.elements();

var style = {
    base: {
        color: '#333333',
        fontFamily: '"Arial", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#666666'
        }
    },
    invalid: {
        color: '#dc3545',
        iconColor: '#dc3545'
    }
};

var card = elements.create('card', {style: style});

card.mount('#card-element');

card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

var form = document.getElementById('payment-form');
var submitButton = document.getElementById('submit-button');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Disable the submit button to prevent multiple clicks
    submitButton.disabled = true;

    stripe.createToken(card).then(function(result) {
        if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
            // Enable the submit button if there's an error
            submitButton.disabled = false;
        } else {
            stripeTokenHandler(result.token);
        }
    });
});

function stripeTokenHandler(token) {
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    form.submit();
}
