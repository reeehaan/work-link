import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, IconButton, Avatar, CircularProgress } from '@mui/material';
import { Send, AttachFile, EmojiEmotions } from '@mui/icons-material';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]); // Messages state
  const [newMessage, setNewMessage] = useState(''); // New message input
  const [isTyping, setIsTyping] = useState(false); // Typing indicator state
  const [loading, setLoading] = useState(false); // Loading state for sending message
  const [activeChat, setActiveChat] = useState(null); // Active chat ID
  const [chats, setChats] = useState([]); // List of chats (active projects)

  // Simulate chat creation when a proposal is accepted
  const handleCreateChat = (freelancer, client, projectId) => {
    const newChat = {
      chatId: projectId,
      participants: { freelancer, client },
      messages: [
        { senderId: client, text: 'Hi, I have accepted your proposal!', timestamp: new Date().toLocaleTimeString() }
      ],
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChat(projectId);
  };

  useEffect(() => {
    // Simulate a new proposal acceptance event (freelancer sends proposal)
    const timer = setTimeout(() => {
      handleCreateChat('freelancer1', 'client1', 'project123');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      setLoading(true);
      const updatedChats = chats.map((chat) =>
        chat.chatId === activeChat
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { senderId: 'freelancer1', text: newMessage, timestamp: new Date().toLocaleTimeString() },
              ],
            }
          : chat
      );
      setChats(updatedChats);
      setNewMessage('');
      setLoading(false);
    }
  };

  const handleChangeMessage = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar - Active Chats */}
      <Box
        sx={{
          width: '250px',
          borderRight: '1px solid #ddd',
          padding: 2,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Active Chats
        </Typography>
        <List>
          {chats.map((chat) => (
            <ListItem
              button
              key={chat.chatId}
              onClick={() => handleSelectChat(chat.chatId)}
              sx={{
                backgroundColor: chat.chatId === activeChat ? '#e0f7fa' : 'transparent',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 30, height: 30, mr: 1 }}>
                  {chat.participants.client[0]}
                </Avatar>
                <Typography>{`Project: ${chat.chatId}`}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Window */}
      <Box
        sx={{
          flex: 1,
          padding: 4,
          borderLeft: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        {activeChat ? (
          <>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Chat {activeChat}
            </Typography>
            <Box
              sx={{
                height: '400px',
                overflowY: 'auto',
                mb: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: 2,
              }}
            >
              <List>
                {chats
                  .find((chat) => chat.chatId === activeChat)
                  .messages.map((msg, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: msg.senderId === 'freelancer1' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {msg.senderId !== 'freelancer1' && (
                          <Avatar sx={{ width: 30, height: 30, mr: 1 }}>C</Avatar>
                        )}
                        <Box
                          sx={{
                            maxWidth: '70%',
                            backgroundColor: msg.senderId === 'freelancer1' ? '#e0f7fa' : '#f1f8e9',
                            color: 'black',
                            borderRadius: '10px',
                            padding: '8px 12px',
                            textAlign: 'left',
                          }}
                        >
                          <Typography>{msg.text}</Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ textAlign: 'right' }}>
                            {msg.timestamp}
                          </Typography>
                        </Box>
                        {msg.senderId === 'freelancer1' && (
                          <Avatar sx={{ width: 30, height: 30, ml: 1 }}>F</Avatar>
                        )}
                      </Box>
                    </ListItem>
                  ))}
              </List>
            </Box>
            {isTyping && <Typography variant="body2" color="textSecondary">Typing...</Typography>}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton>
                <EmojiEmotions />
              </IconButton>
              <TextField
                fullWidth
                value={newMessage}
                onChange={handleChangeMessage}
                placeholder="Type a message..."
                size="small"
              />
              <IconButton>
                <AttachFile />
              </IconButton>
              <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{ textTransform: 'none' }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : <Send />}
              </Button>
            </Box>
          </>
        ) : (
          <Typography>No chat selected</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatComponent;
