type UserProps = {
  id?: number;
  username: string;
};

export class User {
  private _id: number;
  private _username: string;

  constructor(props: UserProps) {
    this._id = props?.id || null;
    this._username = props.username;
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }
}
