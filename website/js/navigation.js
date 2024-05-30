let trip_search  = document.getElementById('trip-search');
let cabin_details  = document.getElementById('cabin-details');
let flight_details  = document.getElementById('flight-details')
let traveller_details  = document.getElementById('traveller-details')
let transaction  = document.getElementById('transaction')
let extra  = document.getElementById('extra')
let footer = document.getElementById('footer')
let complete = document.getElementById('complete')

function nav_trip_search() {

}


function nav_cabin_details() {
    trip_search.style.display = 'none';
    cabin_details.style.display = 'block'; 
}

function set_cabin_details() {
    var cabin_class = document.getElementById('cabin').value
    var adults = document.getElementById('adults').value
    var children = document.getElementById('children').value
    var infants = document.getElementById('infants').value


    document.getElementById('cabin-data').value = cabin_class + ', ' + adults + ' Adult, ' + (parseInt(children) + parseInt(infants)) + ' Children'

    cabin_details.style.display = 'none'; 
    trip_search.style.display = 'block';
}

function nav_flight_details() {
    if (document.getElementById('search-form').checkValidity()){
        var radioButtons = document.getElementsByName('trip');

        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                session_data['way'] = radioButtons[i].value
                break;
            }
        }

        session_data['from'] = document.getElementById('from').value
        session_data['to'] = document.getElementById('to').value
        session_data['cabin'] = document.getElementById('cabin-data').value

        trip_search.style.display = 'none';
        document.getElementById('display-from').innerHTML = session_data['from']
        document.getElementById('display-to').innerHTML = session_data['to']

        var flight_price;

        if (session_data['way'] == 'round-trip') {
            flight_price = parseInt(session_data['price']) * 2
        } else {
            flight_price = session_data['price']
        }

        document.getElementById('money-price').innerHTML = '$' + flight_price;
        flight_details.style.display = 'block';
    } else {
        document.getElementById('search-submit').click()
    }
}

function nav_traveller_details() {
    if (document.getElementById('contact-form').checkValidity()){
        session_data['contact_email'] = document.getElementById('contact-email').value
        flight_details.style.display = 'none';
        traveller_details.style.display = 'block';
        extra.style.display = 'none'
        footer.style.display = 'none'

    } else {
        document.getElementById('contact-submit').click()
    }
}

function nav_transaction() {
    if (document.getElementById('traveller-form').checkValidity()){
        traveller_details.style.display = 'none';
        transaction.style.display = 'block';
    } else {
        document.getElementById('traveller-submit').click()
    }
}


function make_payment() {
    
    if (document.getElementById('transaction-form').checkValidity()){
        var errors = validate_payment('card-number', 'expiry-date', 'credit-cvv')
        
        // session_data['transaction_email'] = document.getElementById('transaction-email').value;
        session_data['phone'] = document.getElementById('phone').value;
        session_data['address'] = document.getElementById('address-data').value;
        session_data['street'] = document.getElementById('street').value;
        session_data['town'] = document.getElementById('town').value;
        // session_data['state'] = document.getElementById('state').value;
        session_data['country'] = document.getElementById('country').value;
        session_data['zip_code'] = document.getElementById('zip-code').value;


        var card_holder = document.getElementById('card-holder')
        var card_number = document.getElementById('card-number')
        var expiry_date = document.getElementById('expiry-date')
        var card_cvv = document.getElementById('credit-cvv')

        
        if (errors.length > 0) {
            document.getElementById('error-messages').style.display = "block";
        } else {
            session_data['card_number'] = card_number.value 
            session_data['card_holder'] = card_holder.value
            session_data['expiry_date'] = expiry_date.value
            session_data['cvv'] = card_cvv.value
        // Submit payment if no errors
            if (commit()){
                atransaction.style.display = 'none';
                complete.style.display = 'block';
            }
        // You can add code here to submit the payment to your server
        }

    } else {
        document.getElementById('transaction-submit').click()
    }

}


document.getElementById('expiry-date').addEventListener('input', function(event) {
    let input = event.target;
    let trimmedValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    
    if (trimmedValue.length > 4) {
        trimmedValue = trimmedValue.substr(0, 4); // Limit to 4 characters
    }

    if (trimmedValue.length > 2) {
        trimmedValue = trimmedValue.substr(0, 2) + '/' + trimmedValue.substr(2); // Insert slash after first two characters
    }

    input.value = trimmedValue;
});


document.getElementById('card-number').addEventListener('input', function(event) {
    let input = event.target;
    let trimmedValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    let formattedValue = '';
    
    for (let i = 0; i < trimmedValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
        formattedValue += ' '; // Add a space after every fourth character
        }
        formattedValue += trimmedValue[i];
    }

    input.value = formattedValue;
});

document.getElementById('credit-cvv').addEventListener('input', function(event) {
let input = event.target;
input.value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
});

// document.getElementById('search-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Your JavaScript function
//     nav_flight_details();
//   });