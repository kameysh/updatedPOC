import pandora from "@faizaanceg/pandora";

export default function validate(values) {
    let errors = {};
    function findExistsEmail() {
        let Lists = pandora.get('users');
        if(Lists) {
            let foundEmail = Lists.find(emails => emails.email == values.Logemail)
            if(foundEmail)
            return 1
        }
    }

    function findExistPassword() {
        let Lists = pandora.get('users');
        if(Lists) {
            let foundPassword = Lists.find(list => (list.email === values.Logemail && list.password === values.password1))
            if(foundPassword)
            return 1
        }
    }

    if (!values.Logemail) {
        errors.Logemail = 'Email required'
    } else if (!/\S+@\S+\.\S+/.test(values.Logemail)) {
        errors.Logemail = 'Invalid Email'
    } else if (!findExistsEmail()) {
        errors.Logemail = 'Email does not exists. Please signup'
    }


    if (!values.password1) {
        errors.password1 = 'Password required'
    } else if (values.password1.length < 8) {
        errors.password1 = 'Password needs to be more than 8 characters'
    } else if (!findExistPassword()) {
        errors.password1 = 'Invalid email or password'
    }

    
    return errors;
}
