import {createLogger, format, transports} from "winston";
const {combine, errors, label, timestamp, colorize, printf} = format
const logger = createLogger({
  format: combine(
    errors({ stack: true }),
    label({ label: "[LOGGER]" }),
    timestamp( { format: "YY-MM-DD HH:MM:SS" } ),
    colorize(),
    printf(
      (log) =>
        ` ${log.label}  ${log.timestamp}  ${log.level} : ${log.message} ${
          log.stack ? log.stack : ""
        }`
    )
  ),
  transports: [
    new transports.File({
      level: "info",
      filename: "./logs/all-logs.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5, // if log file size is greater than 5MB, logfile2 is generated
      colorize: true,
    }),
    new transports.Console({
      format: combine(colorize({ all: true })),
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "./logs/exceptions.log",
      timestamp: true,
      maxsize: 5242880,
      json: true,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

export default logger;
