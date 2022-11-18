import { Log } from "../entities/Log";

export interface ILogsRepository {
  addLog(log: Log): Promise<void>;
}
