export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly document: string,
    public readonly phone: string,
    public readonly type: string,
    public readonly status: string,
  ) {}
}
