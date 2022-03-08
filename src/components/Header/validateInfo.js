export default function validateInfo(values, validateLogin) {
  // console.log(validateLogin);
  const emailValid =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let errors = {};
  if (!values.username) {
    errors.username = "Username required";
  }

  if (!validateLogin) {
    if (!values.fullname) {
      errors.fullname = "Fullname required";
    }
  }
  if (!validateLogin) {
    if (!values.email) {
      errors.email = "Email required";
    } else if (!values.email.match(emailValid)) {
      errors.email = "Email address is invalid";
    }
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }
  if (!validateLogin) {
    if (!values.passwordConfirm) {
      errors.passwordConfirm = "Password is required";
    } else if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = "Passwords do not match";
    }
  }

  return errors;
}
