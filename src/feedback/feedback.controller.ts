import { Controller, Get, Post, Body, UseGuards, Request, Patch, Param, Delete } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
@UseGuards(JwtStrategy)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto, @Request() req: any) {
    const userId = req.user?.userId;
    return this.feedbackService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Patch(':id/upvote')
  upvote(@Param('id') id: string) {
    return this.feedbackService.incrementUpvote(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.userId;
    return this.feedbackService.remove(id, userId);
  }
}