const Message = require('../Model/MessageSchema');

const getRoomChat = async (req, res) => {
    try {
        const { roomId } = req.params;
        // Fetch all messages for the given roomId
        const messages = await Message.find({ roomId }).sort({ timestamp: 1 });

        // Return the messages with proper response structure
        res.status(200).json({
            success: true,
            data: {
                messages,
                count: messages.length,
                roomId
            },
            message: 'Chat messages retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching room chat:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch room chat',
        });
    }
};

module.exports = {
    getRoomChat,
};