export enum LogLevel {
  info,
  log,
  warning,
  error,
}


var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var error_log_file = fs.createWriteStream(__dirname + '/error.log', {flags : 'a'});
var log_stdout = process.stdout;

// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };


export class Logger {
  private minLogLevel: LogLevel = LogLevel.info;

  public log(level: LogLevel, message: string): void {
      if (this.minLogLevel > level) return;

      let str = '[' + this.buildTime() + ']';
      str = str + ' ' + message;

      switch (level) {
          case LogLevel.info:
              log_file.write(util.format(str) + '\n');
              //console.info(str);
              break;
          case LogLevel.log:
                log_file.write(util.format(str) + '\n');
                //log_stdout.write(util.format(str) + '\n');
              //console.log(str);
              break;
          case LogLevel.warning:
              log_file.write(util.format(str) + '\n');
              console.warn(str);
              break;
          case LogLevel.error:
                error_log_file.write(util.format(str) + '\n');
                //log_stdout.write(util.format(str) + '\n');
              console.error(str);
              break;
          default:
              console.error('invalid logLevel for message: ' + message);
      }
  }

  private buildTime() {
      const time = new Date();
      const dateStr =
          '' +
          time.getFullYear() +
          '-' +
          this.padTime(time.getMonth() + 1) +
          '-' +
          this.padTime(time.getDate()) +
          ' ' +
          this.padTime(time.getHours()) +
          ':' +
          this.padTime(time.getMinutes()) +
          ':' +
          this.padTime(time.getSeconds());
      return dateStr;
  }

  private padTime(value: number) {
      const paddedValue = value < 10 ? '0' + value : value;
      return paddedValue;
  }
}
