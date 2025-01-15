import { Schema, model, type ObjectId, type Document } from 'mongoose';

// nterface for users, which sets up the structure for the user schema
interface IUser extends Document {
    username: string,
    email: string,
    thoughts: ObjectId[],
    friends: ObjectId[],
    createdAt: Date,
    updatedAt: Date
}

// schema for user documents
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+@.+\..+/, 'Please input a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (value: any) {
                return value.toLocaleString();
            }
        },
        updatedAt: {
            type: Date,
            get: function (value: any) {
                return value.toLocaleString();
            }
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        timestamps: true,
        id: false,
    }
);

// model, which is the basis for all user documents created
const User = model<IUser>('User', userSchema);

// virtual to return a count of friends on query
userSchema
    .virtual('friendCount')
    .get(function (this: any) {
        return this.friends.length;
    });

export default User;