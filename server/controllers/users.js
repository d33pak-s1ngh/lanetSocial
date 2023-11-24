const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((fid) => User.findById(fid))
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, email, location, picturePath, occupation }) => {
            return {
                _id, firstName, lastName, email, location, picturePath, occupation
            }
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((fid) => fid !== friendId);
            friend.friends = friend.friends.filter((fid) => fid !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((fid) => User.findById(fid))
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, email, location, picturePath }) => {
            return {
                _id, firstName, lastName, email, location, picturePath
            }
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getUser, getUserFriends, addRemoveFriend };