const messages = {
  bookSaved: {
    title: 'Success',
    message: 'Book has been updated',
    type: 'modal-success',
  },
  bookDeleted: {
    title: 'Success',
    message: 'Book has been deleted',
    type: 'modal-success',
  },
  accountUpdated: {
    title: 'Account has been updated',
    message: 'New user info was successfully saved. You will be redirected to main page',
    type: 'modal-success',
  },
  completeRegistration: {
    title: 'Registration complete!',
    message: 'Congratulations! New user has been create. You will be redirected to Home page',
    type: 'modal-success',
  },
  passwordReset: {
    title: 'Password reset',
    message: 'Email to recover your password was sent',
    type: 'modal-success',
  },
  getErrorMessage({ code, message }) {
    return {
      title: code,
      message,
      type: 'modal-danger',
    };
  },
};

export default messages;
