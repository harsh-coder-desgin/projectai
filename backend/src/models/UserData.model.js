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
          required: true,
        },

        title: {
          type: String, // first user message or chat title
          required: true,
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Optional: Limit total chats to 15
userDataSchema.path("chats").validate(function (value) {
  return value.length <= 15;
}, "Maximum 15 chats allowed");

const UserData = mongoose.model("UserData", userDataSchema);

export default UserData;