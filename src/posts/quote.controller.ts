import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import CreateQuotePost from '#core/posts/application/create-quotepost';
import { QuotePostDto } from './dto/quote-post.dto';

@Controller('posts')
export class QuoteController {
  @Inject(CreateQuotePost.UseCase)
  private readonly createQuotePostUseCase;

  @Post('quote/:postId')
  create(
    @Param('postId', new ParseUUIDPipe()) postId: string,
    @Body() payload: QuotePostDto,
  ) {
    return this.createQuotePostUseCase.execute({ ...payload, post_id: postId });
  }
}
