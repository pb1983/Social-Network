const {User, Thought} = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate(['friends', 'thoughts'])
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if(!dbUserData) {
        return res.status(404)({message: 'No user with this ID.'})
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

async deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({_id: req.params.userId});

    if(!user) {
      return res.status(404).json({message: 'No user with this ID!'})
    } 
    res.json({message: 'User successfully removed!'})
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!friend) {
        return res.status(404).json({
          message: 'Friend created, but found no user with that ID',
        });
      }

      res.json('New friend added!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { friends: req.params.friendId} },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({
          message: 'No user with that ID',
        });
      }

      res.json('Friend removed.');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

};



