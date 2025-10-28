import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    login: Yup.string()
    .required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number, you cannot proceed with your registration"
    ),
  password: Yup.string().trim().required("Password is required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[#?!@$%^&*-])/, // must contain at least one special character
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters"),
  confirmNewPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Password does not match"),
});


export const signupSchema = Yup.object().shape({
    full_name: Yup.string()
    .required("Name is required")
    .trim(),
  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email, you cannot proceed with your registration"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number, you cannot proceed with your registration"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[#?!@$%^&*-])/, // must contain at least one special character
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters"),

});