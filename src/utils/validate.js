export const checkValidateData = (isSignIn, email, password, name = undefined) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isEmailValid) return "Email Id is invalid";
    if (!isPasswordValid) return "Password is invalid";

    if (isSignIn === false && name.length < 3) return "Name should be of 3 charactors";

    return null;
}