import Entity from '#core/@shared/domain/entities/entity';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';

type UserProps = {
  username: string;
  created_at?: Date;
};

export class User extends Entity<UserProps> {
  constructor(readonly props: UserProps, id?: UniqueEntityId) {
    super(props, id);
    this.props.username = props.username;
    this.props.created_at = props.created_at || new Date();
  }

  get username(): string {
    return this.props.username;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
