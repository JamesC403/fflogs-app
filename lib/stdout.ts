import Debug from "debug";

export enum LogSeverity {
  Debug = "debug",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export const createLogStream = (name: string, severity: LogSeverity) =>
  Debug(`${name}:${severity}`);

export interface IDebugLog extends Debug.Debugger {
  (formatter: any, ...args: any[]): void;
  error: Debug.Debugger;
  info: Debug.Debugger;
  warn: Debug.Debugger;
  debug: Debug.Debugger;
}

export const createDebugLog = (name: string): IDebugLog => {
  const logger = Debug(name) as IDebugLog;

  const error = createLogStream(name, LogSeverity.Error);
  error.log = console.error.bind(console);
  logger.error = error;

  const info = createLogStream(name, LogSeverity.Info);
  info.log = console.info.bind(console);
  logger.info = info;

  const warn = createLogStream(name, LogSeverity.Warning);
  warn.log = console.warn.bind(console);
  logger.warn = warn;

  const debug = createLogStream(name, LogSeverity.Debug);
  debug.log = console.debug.bind(console);
  logger.debug = debug;

  return logger;
};
