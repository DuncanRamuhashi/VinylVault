class HttpError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Ensuring the correct prototype chain (important for extending built-in classes)
      Object.setPrototypeOf(this, HttpError.prototype);
    }
  }
  
  export default HttpError;
  