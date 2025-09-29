import Message from "../models/message.user.js";
import User from "../models/User.model.js";
import cloudinary from "../lib/cloudinary.js";
import {io, userSockerMap} from "../server.js"

//get all users except current user
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //count number of unread messages from each user
    const unseenMessages = {};
    const promises = filterUsers.map(async (user) => {
      const messages = await Message.find({
        sender: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);
    res.status(200).json({ success: true, users: filterUsers, unseenMessages });
  } catch (error) {
    console.log("Error in getUsersForSidebar controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all messgages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiverId: selectedUserId },
        { sender: selectedUserId, receiverId: myId },
      ],
    });

    await Message.updateMany(
      { sender: selectedUserId, receiverId: myId },
      { seen: true }
    );

    res
      .status(200)
      .json({
        success: true,
        messages,
        message: "Messages fetched successfully",
      });
  } catch (error) {
    console.log("Error in getMessages controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to mark messages as seen using message id
export const markMessagesAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.status(200).json({ success: true, message: "Message marked as seen" });
  } catch (error) {
    console.log("Error in markMessagesAsSeen controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// send message to selected user

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;  // Get receiverId from URL params
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url; // ✅ Fixed assignment operator
    }

    const newMessage = await Message.create({
      sender: senderId,        // ✅ Use 'sender' if that's your field name
      receiverId: receiverId,  // ✅ Use receiverId from params
      text,
      image: imageUrl,
    });

    // Emit the message to receiver if online
    const receiverSocketId = userSockerMap[receiverId];
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res
      .status(201)
      .json({
        success: true,
        newMessage,
        message: "Message sent successfully",
      });
  } catch (error) {
    console.log("Error in sendMessage controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
