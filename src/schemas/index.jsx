import * as Yup from "yup";

export const registrationSchema = Yup.object({
    fname: Yup.string().min(2).max(25).required("Please enter first name"),
    lname: Yup.string().min(2).max(25).required("Please enter last name"),
    email : Yup.string().email().required("Please enter email"),
    role : Yup.string().required("Please enter role"),
    password: Yup.string().min(6).required("Please enter password"),
    confirmPassword: Yup.string().required("Please confirm password").oneOf([Yup.ref('password'), null], "password must match"),
});


export const loginSchema = Yup.object({
    email : Yup.string().email().required("Please enter email"),
    password: Yup.string().min(6).required("Please enter password"),
});