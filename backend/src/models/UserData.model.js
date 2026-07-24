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

            textuser: String,

            content: {
              project_title: {
                type: String,
                default: undefined,
              },

              project_description: {
                type: String,
                default: undefined,
              },

              key_features: {
                type: [String],
                default: undefined,
              },

              security_considerations: {
                type: [String],
                default: undefined,
              },

              technology_stack: {
                type: {
                  frontend: {
                    type: [String],
                    default: undefined,
                  },
                  backend: {
                    type: [String],
                    default: undefined,
                  },
                  database: {
                    type: [String],
                    default: undefined,
                  },
                  other: {
                    type: [String],
                    default: undefined,
                  },
                },
                default: undefined,
              },

              feature_group: {
                type: [String],
                default: undefined,
              },

              features: {
                type: [
                  {
                    group: {
                      type: String,
                    },
                    item: {
                      type: [String],
                    },
                  },
                ],
                default: undefined,
              },

              text: {
                type: String,
                default: undefined,
              },
            }
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

const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;