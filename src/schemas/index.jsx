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

export const searchSchema = Yup.object({
    search : Yup.string().required(),
});

export const bookFormSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Book name required"),
    description: Yup.string().min(2).max(25).required("Book description required"),
    price: Yup.string().min(2).max(25).required("Book price required"),
});

export const updateUserSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter first name"),
    lastName: Yup.string().min(2).max(25).required("Please enter last name"),
    email : Yup.string().email().required("Please enter email"),
    password: Yup.string().min(6).required("Please enter password"),
});

export const categoryFormSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter valid name"),
});
