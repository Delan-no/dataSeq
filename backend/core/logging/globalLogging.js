// globalLogging

const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { v4: uuidv4 } = require("uuid");
const DailyRotateFile = require("winston-daily-rotate-file");

// Generate UUID string format function
const generateUuidString = format((info) => {
  info.uuid = uuidv4(); // Adds a UUID to each log entry
  return info;
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    generateUuidString(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  // defaultMeta: { service: "your-service-name" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `access.log`.
    // - Write all logs error (and below) to `error.log`.
    //

    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "storage/serverLogger/access-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "info",
      handleExceptions: true,
      maxSize: "20m",
      maxFiles: "14d", // conserver les logs pendant 14 jours
      zippedArchive: true, // compresser les logs archivés
    }),
    new DailyRotateFile({
      filename: "storage/serverLogger/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      handleExceptions: true,
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  ],
});

/**
 * Imprimer les logs directement dans la console
 */
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      handleExceptions: true,
    })
  );
}

module.exports = logger;
