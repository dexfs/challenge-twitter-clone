import ClassValidatorFields from '#core/@shared/validators/class-validator-fields';
import { PostProps } from '#core/posts';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class PostRules {
  @MaxLength(777)
  @IsString()
  @IsOptional()
  content: string;

  @IsUUID(4)
  user_id: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsUUID(4)
  @IsOptional()
  @IsOptional()
  original_post_id: string;

  @MaxLength(777)
  @IsString()
  @IsOptional()
  original_post_content: string;

  @MaxLength(14)
  @IsString()
  @IsOptional()
  original_post_screen_name: string;

  constructor(data: PostProps) {
    Object.assign(this, data);
  }
}

export class PostValidator extends ClassValidatorFields<PostRules> {
  validate(data: PostProps): boolean {
    return super.validate(new PostRules(data));
  }
}

export default class PostValidatorFactory {
  static create() {
    return new PostValidator();
  }
}
