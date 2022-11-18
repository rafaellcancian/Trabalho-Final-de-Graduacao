export class ThrowMessageRequest extends Error {
  constructor(
    public message: string = '',
    public object?: any,
    public statusCode?: number,
    public canSendMessage?: boolean
  ) {
    super(message);
  }

  tooManyRequests(message?: string) {
    this.message = message || 'Bloqueado temporariamente pelo Anti-Flood.';
    this.statusCode = 429;
    this.canSendMessage = true;
    return this;
  }

  internalServerErrorObject(message?: string, object?: any) {
    this.message = message || 'Erro interno do servidor.';
    this.object = object;
    this.statusCode = 500;
    this.canSendMessage = true;
    return this;
  }
}
