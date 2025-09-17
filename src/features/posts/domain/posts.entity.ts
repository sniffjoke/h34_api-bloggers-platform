import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from '../../blogs/domain/blogs.entity';
import { CommentEntity } from '../../comments/domain/comment.entity';
import { LikeEntity } from '../../likes/domain/likes.entity';
import { ExtendedLikesInfoEntity } from './extended-likes-info.entity';
import {UserEntity} from "../../users/domain/user.entity";
import { ImageEntity } from '../../blogs/domain/images.entity';
import { PhotoSizeEntity } from '../../blogs/domain/photoSize.entity';


@Entity('posts')
export class PostEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    shortDescription: string;

    @Column()
    content: string;

    @Column()
    blogId: string;

    @Column()
    blogName: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: string;

    @Column({nullable: true})
    imagesId: string;

    @Column({nullable: true})
    userId: string;

    @ManyToOne(() => BlogEntity, (blog) => blog.posts, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'blogId' })
    blog: BlogEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.post, {cascade: true})
    comments: CommentEntity[];

    @OneToMany(() => LikeEntity, (like) => like.post, {cascade: true})
    likes: LikeEntity[];

    @OneToOne(() => ExtendedLikesInfoEntity, (likeInfo) => likeInfo.post, {cascade: true})
    extendedLikesInfo: ExtendedLikesInfoEntity;

    @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => ImageEntity, (image) => image.post, { cascade: true, eager: true })
    @JoinColumn({ name: 'imagesId' })
    images: ImageEntity;

    @OneToMany(() => PhotoSizeEntity, (photo) => photo.post, { cascade: true, eager: true })
    photoSize: PhotoSizeEntity[];
}
