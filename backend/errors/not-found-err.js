const { HTTP_404 } = require('../utils/utils');

class NotFoundError extends Error {
  constructor(message = 'Страница не найдена') {
    super(message);
    this.statusCode = HTTP_404;
  }
}

module.exports = NotFoundError;
