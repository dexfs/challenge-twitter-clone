import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

type PostModelProperties = {
  id: string;
  content: string;
  user_id: number;
  created_at: Date;
  is_quote: boolean;
  is_repost: boolean;
  original_post_id: string | null;
  original_post_content: string | null;
  original_post_user_id: number | null;
  original_post_screen_name: string | null;
};

@Table({ tableName: 'posts', timestamps: false })
export class PostModel extends Model<PostModelProperties> {
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @Column({ type: DataType.TEXT })
  content: string;

  @Column({ allowNull: false })
  user_id: number;

  @Column
  created_at: Date;

  @Column({ allowNull: false })
  is_quote: boolean;

  @Column({ allowNull: false })
  is_repost: boolean;

  @Column
  original_post_id: string | null;

  @Column
  original_post_content: string | null;

  @Column
  original_post_user_id: number | null;

  @Column
  original_post_screen_name: string | null;
}
