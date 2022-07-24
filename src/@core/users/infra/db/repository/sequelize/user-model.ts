import {
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

type UserModelProperties = {
  id: string;
  username: string;
  created_at: Date;
};

@Table({ tableName: 'users', timestamps: false })
export class UserModel extends Model<UserModelProperties> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ type: DataType.STRING(14) })
  @Index({ name: 'idx_user_username', type: 'UNIQUE' })
  username: string;

  @Column
  created_at: Date;
}
