import { EntitySchema, BaseEntity } from "typeorm";

export class User extends BaseEntity {
    id;
    vkId;
    firstName;
    lastName;
    status;
    createdAt;
    updatedAt;
}

export const UserSchema = new EntitySchema({
    name: "User",
    target: User,
    tableName: "users",
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true
        },
        vkId: {
            type: "bigint",
            unique: true,
            name: "vk_id"
        },
        firstName: {
            type: "varchar",
            length: 255,
            nullable: true,
            name: "first_name"
        },
        lastName: {
            type: "varchar",
            length: 255,
            nullable: true,
            name: "last_name"
        },
        status: {
            type: "varchar",
            length: 50,
            default: "active"
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
            name: "created_at"
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
            name: "updated_at"
        }
    }
}); 