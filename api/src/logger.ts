export enum LogLevel {
  info,
  log,
  warning,
  error,
}

export class Logger {
  private minLogLevel: LogLevel = LogLevel.info;

  public log(level: LogLevel, message: string): void {
      if (this.minLogLevel > level) return;

      let str = '[' + this.buildTime() + ']';
      str = str + ' ' + message;

      switch (level) {
          case LogLevel.info:
              console.info(str);
              break;
          case LogLevel.log:
              console.log(str);
              break;
          case LogLevel.warning:
              console.warn(str);
              break;
          case LogLevel.error:
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
