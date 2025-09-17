import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './api/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidModule } from 'nestjs-uuid';
import { CryptoModule } from '../../core/modules/crypto/crypto.module';
import { UsersCommandHandlers } from './application/useCases';
import { UserEntity } from './domain/user.entity';
import { EmailConfirmationEntity } from './domain/email-confirmation.entity';
import { UsersRepositoryTO } from './infrastructure/users.repository.to';
import { UsersQueryRepositoryTO } from './infrastructure/users.query-repositories.to';
import { TokensModule } from '../tokens/tokens.module';
import { UserScoreEntity } from '../quiz/domain/user-score.entity';
import { BanInfoEntity } from './domain/ban-info.entity';
import { LikeEntity } from '../likes/domain/likes.entity';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EmailConfirmationEntity, UserScoreEntity, BanInfoEntity, LikeEntity]),
    CryptoModule,
    UuidModule,
    TokensModule,
    LikesModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepositoryTO,
    UsersQueryRepositoryTO,
    ...UsersCommandHandlers,
  ],
  exports: [
    CryptoModule,
    UuidModule,
    UsersService,
    UsersRepositoryTO,
    UsersQueryRepositoryTO,
    ...UsersCommandHandlers,
  ],
})
export class UsersModule {
}
