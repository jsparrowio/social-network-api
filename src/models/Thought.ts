import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date, 
    username: string,
    reactions: IReaction[]
}

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
            required: true,
            default: () => new Date()
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
            required: true,
            default: () => new Date()
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

const Thought = model('Thought', thoughtSchema);

thoughtSchema
    .virtual('formattedTimestamp')
    .get(function () {
        return this.createdAt.toLocaleString();
    });

thoughtSchema
    .virtual('reactionCount')
    .get(function (this: any) {
        return this.reactions.length;
    });

reactionSchema
    .virtual('formattedTimestamp')
    .get(function () {
        return this.createdAt.toLocaleString();
    });

export default Thought;