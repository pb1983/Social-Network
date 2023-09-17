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
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)


reactionSchema.methods.timeStampFormat = function () {
    this.createdAt = dayjs().format('MM/DD/YYYY:hh/mm/ss');

}

module.exports = reactionSchema;