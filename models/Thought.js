const { kMaxLength } = require('buffer');
const {Schema, model} = require('mongoose');
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
    reactions: [reactionSchema],
    
},
{
    toJSON: {
      virtuals: true,
    },
  }
);


thoughtSchema.methods.timestampFormat = function () {
    this.createdAt = dayjs().format('MM/DD/YYYY:hh/mm/ss'); 

}

userSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;