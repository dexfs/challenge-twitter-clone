import Entity from '#core/@shared/domain/entities/entity';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';

type UserProps = {
  username: string;
};

export class User extends Entity<UserProps> {
  constructor(readonly props: UserProps, id?: UniqueEntityId) {
    super(props, id);
    this.props.username = props.username;
  }

  get username(): string {
    return this.props.username;
  }
}
