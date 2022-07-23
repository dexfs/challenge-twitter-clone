import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import CreateQuotePost from '#core/posts/application/create-quotepost';

@Controller('posts')
export class QuoteController {
  @Inject(CreateQuotePost.UseCase)
  private readonly createQuotePostUseCase;

  @Post('quote/:postId')
  create(@Param('postId') postId: string, @Body() repostBody: CreatePostDto) {
    return this.createQuotePostUseCase.execute(repostBody);
  }
}
