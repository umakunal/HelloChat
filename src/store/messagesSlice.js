import {createSlice} from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'chats',
  initialState: {
    messagesData: {},
    starredMessage: {},
  },
  reducers: {
    setChatsMessages: (state, action) => {
      const existingMessages = state.messagesData;
      const {chatId, messagesData} = action.payload;
      existingMessages[chatId] = messagesData;
      state.messagesData = existingMessages;
    },
    addStarredMessage: (state, action) => {
      const {starredMessageData} = action.payload;
      state.starredMessage[starredMessageData.messageId] = starredMessageData;
    },
    removeStarredMessage: (state, action) => {
      const {messageId} = action.payload;
      delete state.starredMessage[messageId];
    },
    setStarredMessages: (state, action) => {
      const starredMessages = action.payload;
      console.log('starredMessages from slice=============',  starredMessages)
      state.starredMessage = {...starredMessages};
    },
  },
});

export const {
  setChatsMessages,
  addStarredMessage,
  removeStarredMessage,
  setStarredMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
