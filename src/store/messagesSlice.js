import {createSlice} from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'chats',
  initialState: {
    messagesData: {},
  },
  reducers: {
    setChatsMessages: (state, action) => {
      const existingMessages = state.messagesData;
      const {chatId, messagesData} = action.payload;
      existingMessages[chatId] = messagesData;
      state.messagesData = existingMessages;
    },
  },
});

export const setChatsMessages = messagesSlice.actions.setChatsMessages;

export default messagesSlice.reducer;
