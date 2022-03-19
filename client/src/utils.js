export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

// the error it self will give you the front end message, but when using the error.response we get the backend error object
