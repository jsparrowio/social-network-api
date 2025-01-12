import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../models/index.js';

export const userCount = async () => {
    const usersAmount = await User.aggregate()
        .count('userCount');
    return usersAmount;
}

export const getAllUsers = async (_req: Request, res: Response) => {
    console.log('Getting all users...')
    try {
        const users = await User.find();

        const usersObj = {
            users,
            userCount: await userCount()
        }
        console.log('List of users retrieved!');
        res.json(usersObj);

    } catch (err: any) {
        console.error('There was an error retreiving all users:', err);
        res.status(500).json({
            message: err.message
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userPId } = req.params;
    console.log(`Attempting to find user:`, userPId);
    const userId = new ObjectId(userPId)
    try {
        const user = await User.findById(userId);
        if (user) {
            console.log(`User found!`);
            res.json({
                user
            });
        } else {
            console.warn('User not found');
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err: any) {
        console.error(`There was an error retreiving the user:`, err);
        res.status(500).json({
            message: err.message
        });
    }
};

export const createUser = async (req: Request, res: Response) => {
    console.log('Attempting to create user...')
    try {
        const user = await User.create(req.body);
        console.log(`User created successfully!`);
        res.status(201).json(user);
    } catch (err: any) {
        console.error(`There was an error creating the user:`, err);
        res.status(500).json({
            message: err.message
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { userPId } = req.params;
    console.log(`Attempting to update user:`, userPId);
    const userId = new ObjectId(userPId)
    try {
        const user = await User.findOneAndUpdate(
            userId,
            req.body,
            { new: true }
        );
        if (user) {
            console.log(`User updated!`);
            res.json({
                user
            });
        } else {
            console.warn('User not found');
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err: any) {
        console.error(`There was an error updating the user:`, err);
        res.status(500).json({
            message: err.message
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userPId } = req.params;
    console.log(`Attempting to delete user:`, userPId);
    const userId = new ObjectId(userPId)
    try {
        const response = await User.findOneAndDelete(userId);
        if (response) {
            console.log(`User deleted!`);
            res.json({
                message: "User deleted successfully!"
            });
        } else {
            console.warn('User not found');
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err: any) {
        console.error(`There was an error deleting the user:`, err);
        res.status(500).json({
            message: err.message
        });
    }
};

export const addFriend = async (req: Request, res: Response) => {
    const { userPId } = req.params;
    const { friendPId } = req.params;
    console.log(`Attempting to add friend ${friendPId} to user ${userPId}`);
    const userId = new ObjectId(userPId);
    const friendId = new ObjectId(friendPId);
    try {
        const friend = await User.findById(friendId);
        if(friend) {
        const response = await User.findOneAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { runValidators: true, new: true }
        );
        if (response) {
            console.log(`Friend ${friendPId} added to user ${userPId}`);
            res.json({
                response
            });
        } else {
            console.warn('User not found');
            res.status(404).json({
                message: 'User not found'
            });
        } } else {
            console.warn('Friend user ID not found');
            res.status(404).json({
                message: 'The user that is being added as a friend was not found'
            });
        }
    } catch (err: any) {
        console.error(`There was an error adding the friend:`, err);
        res.status(500).json({
            message: err.message
        });
    }
};

export const deleteFriend = async (req: Request, res: Response) => {
    const { userPId } = req.params;
    const { friendPId } = req.params;
    console.log(`Attempting to remove friend ${friendPId} from user ${userPId}`);
    const userId = new ObjectId(userPId);
    const friendId = new ObjectId(friendPId);
    try {
        const response = await User.findOneAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { runValidators: true, new: true }
        );
        if (response) {
            console.log(`Friend ${friendPId} removed from user ${userPId}`);
            res.json({
                response
            });
        } else {
            console.warn('User not found');
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err: any) {
        console.error(`There was an error deleting the friend:`, err);
        res.status(500).json({
            message: err.message
        });
    }
};