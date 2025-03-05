function successResponse(data, message = 'Success', statusCode = 200) {
  return {
    status: 'success',
    statusCode,
    message,
    data
  };
}

function errorResponse(message = 'An error occurred', statusCode = 500) {
  return {
    status: 'error',
    statusCode,
    message
  };
}

module.exports = { successResponse, errorResponse };
