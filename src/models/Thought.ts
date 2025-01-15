// import mongoose classes and types
import { Schema, Types, model, type Document } from 'mongoose';

// interface for reactions, which sets up the structure for the reaction schema, which will be a sub schema for thoughts
interface IReaction extends Document {
    reactionId: Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
    updatedAt: Date
}

// interface for thoughts, which sets up the structure for the thought schema
interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    updatedAt: Date,
    username: string,
    reactions: IReaction[]
}

// schema for reaction subdocuments, which is dependent on the thought schema
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
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

// schema for thought documents
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
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
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
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

// model, which is the basis for all thought documents created
const Thought = model('Thought', thoughtSchema);

// virtual to return a count of reactions on query
thoughtSchema
    .virtual('reactionCount')
    .get(function (this: any) {
        return this.reactions.length;
    });

export default Thought;