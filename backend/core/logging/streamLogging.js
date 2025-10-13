"use strict";

const fs = require("fs");
const path = require("path");
const winston = require("winston");

const filePath = path("../../storage/serverLogger/stream.log");
const stream = fs.createWriteStream(filePath);

const logger = winston.createLogger({
  transports: [new winston.transports.Stream({ stream })],
});

async function run(message) {
  setTimeout(() => {
    logger.log({ level: "info", message: message });
  }, 1000);
}

async function stop() {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    winston.warn(error);
  }
}
