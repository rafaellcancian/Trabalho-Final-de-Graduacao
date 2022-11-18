import { v4 as createUuid } from 'uuid';

export class Log {
  public uuid: string;
  public date: Date;
  public ipAddress?: string;
  public action: string;
  public provider: string;
  public status: number;
  public errors?: any;

  constructor(
    props: Omit<Log, 'uuid' | 'date'>,
    uuid?: string
  ) {
    Object.assign(this, props);
    this.uuid = uuid || createUuid();
  }
}
