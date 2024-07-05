function validateCreditCard(number) {
    // Remove all non-digit characters
    const cleanedNumber = number.replace(/\D+/g, "");

    // Check card length based on starting digits
    const lengths = {
        '4': [13, 16],
        '5': [16],
        '3': [14, 15],
        '6': [16],
    };
    const firstDigit = cleanedNumber.charAt(0);
    if (!lengths[firstDigit] || !lengths[firstDigit].includes(cleanedNumber.length)) {
        return false;
    }

    // Luhn algorithm check
    let sum = 0;
    let doubled = false;
    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanedNumber.charAt(i));
        if (doubled) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        doubled = !doubled;
    }

    return (sum % 10) === 0;
}

function validateForm() {
    const numberInput = document.getElementById("cardNumber");
    const number = numberInput.value;

    if (!validateCreditCard(number)) {
        alert("Invalid credit card number!");
        numberInput.focus();
        return false;
    }

    return true;
}