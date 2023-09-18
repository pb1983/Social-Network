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
        get: (date) => dayjs(date).format('MM/DD/YYYY hh:mm:ss')
        
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
      getters: true,
    },
    id: false,
  }
);






thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;