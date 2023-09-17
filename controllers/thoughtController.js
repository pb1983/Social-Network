const { Thought, User, Reaction } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
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
async createThought(req, res) {
    try {
      const video = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: Thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Video created, but found no user with that ID',
        });
      }

      res.json('New thought added!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}
