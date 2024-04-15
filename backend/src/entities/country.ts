import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  @Length(8)
  emoji: string;

  @Field()
  @Column()
  @Length(2)
  code: string;

  @Field()
  @Column()
  @Length(2)
  continentCode: string;

//  @OneToMany(() => Ad, ad => ad.category)
//  ads: Ad[];
}