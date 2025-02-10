export default function validate(values) {
    let errors = {};
    if (!values.email) {
        errors.email = "E-post er obligatorisk";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    if (!values.first_name) {
        errors.first_name = "Fornavn er obligatorisk";
    }

    if (!values.last_name) {
        errors.last_name = "Etternavn er obligatorisk";
    }

    if (!values.password) {
        errors.password = "Passordet er obligatorisk";
    } else if (values.password.length < 5) {
        errors.password = "Passordet må bestå av minst 5 tegn";
    }
    return errors;
}
