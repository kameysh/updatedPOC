import pandora from "@faizaanceg/pandora";

export default function validate(values) {
    let errors = {};
    function findExistsEmail() {
        let Lists = pandora.get('users');
        if(Lists) {
            let foundEmail = Lists.find(emails => emails.email == values.email)
            if(foundEmail)
            return 1
        }
    }

    if (!values.username) {
        errors.username = 'Name required'
    }else if(values.username.length < 3) {
       errors.username = 'Please provide username with more than 3 letter'
    } else if (!/^[a-zA-Z]+$/.test(values.username)) {
        errors.username = 'Only Alphabets allowed'
    }

    if (!values.email) {
        errors.email = 'Email required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid Email'
    } else if (findExistsEmail()) {
        errors.email = 'Email already exists. Please login!'
    }


    if (!values.password1) {
        errors.password1 = 'Password required'
    } else if (values.password1.length < 8) {
        errors.password1 = 'Password needs to be more than 8 characters'
    }

    if (!values.password2) {
        errors.password2 = 'Password required'
    } else if (values.password1 !== values.password2) {
        errors.password2 = 'Password does not match. Please try again'
    }
    return errors;
}
