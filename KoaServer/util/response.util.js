module.exports = {
  createResponse: (code, msg, payload) => {
    let response = {
      code,
      msg,
    };
    if (payload) {
      response['payload'] = payload;
    }

    return response;
  }
}