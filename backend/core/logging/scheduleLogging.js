// scheduleLogging
"use strict";
const classImport = require("../scheduleTask/schedule");
const Scheduler = new classImport();
const path = require('path');

const TaskEndEmitter = new EventEmitter();

/**
 * @typedef {[
 * logLevel,string,number,boolean, Scheduler]}
 */

/**
 *
 * @author matheosDev
 * @since 2024-06-07 at 07:21
 */
class ScheduleLog extends Scheduler {
  /**
   * @type {Scheduler} Instance of Schedule class
   */
  event = Scheduler;

  /**
   * @type {string} Default Output
   */
  defaultOutput = "/dev/null";

// FIXME: trouver et réécrire cette fonction afin de bien capturer la sortie de l'évènement de tâche planifiée
  ensureOutputIsCaptured() {
    if (this.event.output == null) {
      this.event.output = this.defaultOutput;
    }

    output =
      this.event.output && is_file(this.event.output)
        ? file_get_contents(this.event.output)
        : "";
    return this.sendOutputTo(output);
  }

  sendOutputTo(location, append = false) {
    this.output = location;
    this.shouldAppendOutput = append;
    return this;
  }

  ensureOutputIsBeingCaptured() {
    if (!this.output || this.output === this.event.getDefaultOutput()) {
      this.sendOutputTo(path.resolve('storage/logs/schedule_log'));
    }
  }


}


module.exports = new ScheduleLog();
