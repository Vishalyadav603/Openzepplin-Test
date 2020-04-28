/* Set winston logger: it will print logs to a rotating file each day
  if enviornment is development then it will print log on standard output
   */

module.exports = function (app, config) {

  const winston = require('winston');
  const dailyRotateFile = require('winston-daily-rotate-file');
  const console = new winston.transports.Console({
    colorize: true,
    json: true
  });

  let env = app.get('env');
  /* Request Logging : Set winston request logger: it will print log when any request comes to server*/
  if ('development' === env || 'test' === env) {

    // your centralized logger object
    let logger = winston.createLogger({
      transports: [
        new(winston.transports.Console)({
          format: winston.format.simple()
        })
        // new (winston.transports.File)(options.errorFile),
        // new (winston.transports.File)(options.file)
      ],
      exitOnError: false, // do not exit on handled exceptions
    });

    app.use(require('winston-request-logger').create(logger));
  }

  let generalLogTasks = [new (winston.transports.DailyRotateFile)({
    filename: config.root + '/logs/basic-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-MM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  })];

  let exceptionLogTasks = [new (winston.transports.DailyRotateFile)({
    filename: config.root + '/logs/exception-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-MM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  })];


  if (config.logOnScreen) {
    generalLogTasks.push(console);
    exceptionLogTasks.push(console);
  }

  const logger = winston.createLogger({
    transports: generalLogTasks,
    exceptionHandlers: exceptionLogTasks
  });

  return logger;
}