const PHONE_PATTERN = /^\+?[\d\s-]{10,}$/;

export function validateBooking({ selectedDate, selectedTime, clientDetails }) {
  const errors = {};
  const { fullName, phone, confirmed } = clientDetails;

  if (!selectedDate) errors.date = "Please select a date";
  if (!selectedTime) errors.time = "Please select a time";

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_PATTERN.test(phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  if (!confirmed) errors.confirmed = "Please confirm before submitting";

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}
