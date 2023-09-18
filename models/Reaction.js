const { Schema, Types} = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema({

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () =>  new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280

    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => dayjs(date).format('MM/DD/YYYY hh:mm:ss')
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

reactionSchema.virtual('reactionCount').get(function () {
    return this.reactionId.length;
})



module.exports = reactionSchema;