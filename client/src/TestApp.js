import React from 'react';

export default function Login(props) {
    const { email: propsEmail, password: propsPassword, dispatch } = props;
    const [isLoginDisabled, setIsLoginDisabled] = React.useState(true);
    const [email, setEmail] = React.useState(propsEmail || '');
    const [password, setPassword] = React.useState(propsPassword || '');

    React.useEffect(() => {
        validateForm();
    }, [email, password]);

    const validateEmail = text => /@/.test(text);

    const validateForm = () => {
        setIsLoginDisabled(password.length < 8 || !validateEmail(email));
    };

    const handleEmailBlur = evt => {
        const emailValue = evt.target.value.trim();
        setEmail(emailValue);
    };

    const handlePasswordChange = evt => {
        const passwordValue = evt.target.value.trim();
        setPassword(passwordValue);
    };

    const handleSubmit = () => {
        dispatch('submit(email, password)');
        setIsLoginDisabled(true);
    };

    return (
        <form>
            <input
                type="email"
                placeholder="email"
                className="mx-auto my-2"
                onBlur={handleEmailBlur}
            />
            <input
                type="password"
                className="my-2"
                onChange={handlePasswordChange}
                value={password}
            />
            <input
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isLoginDisabled}
                value="Submit"
            />
        </form>
    );
}