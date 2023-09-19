const { Thought, User, Reaction } = require('../models');

module.exports = {

  //gets all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //gets a single thought by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
},


//creates a new thought
async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }

      res.json('New thought added!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //deletes a thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
  
      if(!thought) {
        return res.status(404).json({message: 'No thought with this ID!'})
      } 
      res.json({message: 'Thought successfully removed!'})
      } catch (err) {
        res.status(500).json(err);
      }
    },

    //modifies an existing thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          { $set: req.body },
          { runValidators: true, new: true }
          );
    
        if(!thought) {
          return res.status(404).json({message: 'No thought with this ID!'})
        } 
        res.json({message: 'Thought successfully updated!'})
        } catch (err) {
          res.status(500).json(err);
        }
      },

      //creates a reaction to an existing thought
      async createReaction(req, res) {
        try {
          const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
          )
          if(!reaction) {
            return res.status(404).json({message: 'No reaction with this ID!'})
          } 
          res.json({message: 'Reaction successfully added!'})
          } catch (err) {
            res.status(500).json(err);
          }
        },

        //deletes reactions to existing thoughts
        async deleteReaction(req, res) {
          try {
            const reaction = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId},
              { $pull: { reactions: req.body} },
              { runValidators: true, new: true }
            );
      
            if (!reaction) {
              return res.status(404).json({
                message: 'No reaction with that ID',
              });
            }
      
            res.json('Reaction deleted.');
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
        },
  
  };
      
    
  
  

