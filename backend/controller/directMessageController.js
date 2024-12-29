
const directMessageModel = require('../Model/DirectMessageSchema')
const getDirectMessages = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.params;

        // Fetch messages between these two users (in both directions)
        const messages = await directMessageModel.find({
            $or: [
                { sender_id, receiver_id },
                { sender_id:receiver_id, receiver_id:sender_id }
            ]
        })
        .sort({ timestamp: 1 })
        .populate('sender_id', 'username') // Only get username from User model
        .populate('receiver_id', 'username');

        res.status(200).json({
            success: true,
            data: {
                messages,
                count: messages.length
            },
            message: 'Direct messages retrieved successfully'
        });

    } catch (error) {
        console.error('Error fetching direct messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch direct messages'
        });
    }
};

const saveDirectMessage = async (req, res) => {
    try {
        const { sender_id, receiver_id, content } = req.body;

        const newMessage = await DirectMessage.create({
            sender_id,
            receiver_id,
            content
        });

        res.status(201).json({
            success: true,
            data: newMessage,
            message: 'Direct message saved successfully'
        });

    } catch (error) {
        console.error('Error saving direct message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save direct message'
        });
    }
};

module.exports = {
    getDirectMessages,
    saveDirectMessage
}; 