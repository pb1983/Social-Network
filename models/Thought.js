const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction')
const dayjs = require('dayjs');

const thoughtSchema = new Schema ({

    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction],
    
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


thoughtSchema.methods.timeStampFormat = function () {
    this.createdAt = dayjs().format('MM/DD/YYYY:hh/mm/ss'); 

}

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;