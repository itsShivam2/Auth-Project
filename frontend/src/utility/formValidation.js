export const validateSignupForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.username.trim()) {
    errors.username = "Username is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  }

  return errors;
};
