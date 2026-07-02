import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tech: {
      frontend: [String],
      backend: [String],
      database: [String],
      other: [String],
    },

    chats: [
      {
        chatId: {
          type: String,
        },

        title: {
          type: String,
        },

        messages: [
          {
            role: {
              type: String,
              enum: ["user", "ai"],
              required: true,
            },

            content: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],

    chatHistory: [
      {
        chatId: String,
        title: String,
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

// userDataSchema.path("chats").validate(function (value) {
//   return value.length <= 15;
// }, "Maximum 15 chats allowed");

const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;