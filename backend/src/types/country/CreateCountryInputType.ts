import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCountryInputType {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    emoji: string;

    @Field()
    code: string;

    @Field()
    continentCode: string;
}