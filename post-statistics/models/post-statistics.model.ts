import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostStatisticsModel {
  @Field({ nullable: false })
  public _id: string;

  @Field({ nullable: false })
  public postId: string;

  @Field({ nullable: false })
  public postName: string;

  @Field({ nullable: false })
  public scenes: string;

  @Field({ nullable: false })
  public createdAt: Date;

  @Field({ nullable: false })
  public updatedAt: Date;
}

/**
 *  data from mongoose aggregate $group
 */
@ObjectType()
export class PostStatisticsGroupItemModel {
  @Field({ nullable: false })
  public postId: string;

  @Field({ nullable: false })
  public postName: string;

  @Field({ nullable: false })
  public scenes: string;

  @Field({ nullable: false })
  public operatedAt: Date;
}

@ObjectType()
export class PostStatisticsGroupModel {
  @Field({ nullable: false })
  public _id: string;

  @Field({ nullable: false })
  public count: number;

  @Field(() => [PostStatisticsGroupItemModel], { nullable: false })
  public items: PostStatisticsGroupItemModel[];
}
