import { Log } from "../../entities/Log";
import { knexPg } from "../../util/knex";
import { ILogsRepository } from "../ILogsRepository";

export class LogRepository implements ILogsRepository {
  async addLog(log: Log): Promise<void> {
    await knexPg('logs')
    .insert({
      uuid: log.uuid,
      ip_address: log.ipAddress,
      action: log.action,
      provider: log.provider,
      status: log.status,
      errors: log.errors
    }).catch((error) => {
      console.log('Erro do Knex: ' + error);
    });
  }
}
