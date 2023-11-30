export const defaultErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || '500';
    const message = err.message || 'Internal Server Error!!!';
  
    res.status(statusCode).json({
      success: false,
      statusCode,
      message
    });
};


export const customErrorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;

    return error;

}