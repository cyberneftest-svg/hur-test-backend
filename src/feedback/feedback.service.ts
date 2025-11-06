import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from '../entities/feedback.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(@InjectRepository(Feedback) private repo: Repository<Feedback>) {}

  async create(dto: { title: string; description: string }, user: User) {
    const fb = this.repo.create({ ...dto, user });
    return this.repo.save(fb);
  }

  async findAll() {
    return this.repo.find({ relations: ['user'], order: { upvotes: 'DESC' } });
  }

  async incrementUpvote(id: string) {
    const fb = await this.repo.findOne({ where: { id } });
    if (!fb) throw new NotFoundException('Feedback not found');
    fb.upvotes += 1;
    return this.repo.save(fb);
  }

  async remove(id: string, userId: string) {
    const fb = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!fb) throw new NotFoundException('Feedback not found');
    if (fb.user.id !== userId) throw new ForbiddenException('Not allowed');
    await this.repo.remove(fb);
    return { deleted: true };
  }
}