import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { JwtPayload } from '#core/auth/auth.type';
import { CardService } from '#core/board/card.service';

import type { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: EntityRepository<CommentEntity>,
    private readonly cardService: CardService,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateCommentDTO, author: JwtPayload) {
    const card = await this.cardService.getCard(dto.card_id, dto.board_id);
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    const date = new Date();

    const comment = this.commentRepository.create({
      comment: dto.comment,
      createdAt: date,
      updatedAt: date,
      author: author.id,
      card: card.id,
    });

    card.comments++;

    this.entityManager.persist(card);
    await this.entityManager.persistAndFlush(comment);

    /// remove populated card from response
    Object.assign(comment, { card: card.id });

    return comment;
  }

  async getComments(card_id: number, board_id: string) {
    const card = await this.cardService.getCard(card_id, board_id);
    return this.commentRepository.find(
      { card: card.id },
      { populate: ['author'], orderBy: { updatedAt: -1 } },
    );
  }
}
