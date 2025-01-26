import { EntitySchema, BaseEntity } from "typeorm";
import { User } from "./User.js";

export class UserInteraction extends BaseEntity {
    id;
    user;
    interactionType;
    request;
    response;
    createdAt;
}

export const UserInteractionSchema = new EntitySchema({
    name: "UserInteraction",
    target: UserInteraction,
    tableName: "user_interactions",
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true
        },
        interactionType: {
            type: "varchar",
            length: 50,
            name: "interaction_type"
        },
        request: {
            type: "text",
            nullable: true
        },
        response: {
            type: "text",
            nullable: true
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
            name: "created_at"
        }
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "user_id"
            },
            onDelete: "CASCADE"
        }
    }
}); 