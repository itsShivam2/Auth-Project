class ApiResponse {
    constructor(statusCode, data, message = "Success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400; //Less than 400 is just to follow standard, otherwise it can be anything
    }
  }
  
  export { ApiResponse };
  