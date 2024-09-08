import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SendBird from 'sendbird';

const ChatPage = () => {
  const router = useRouter();
  const { channel_url } = router.query;  // URL에서 동적 매개변수 추출
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    if (channel_url) {
      const sb = new SendBird({ appId: process.env.NEXT_PUBLIC_SENDBIRD_APP_ID });
      const helperUserId = localStorage.getItem('helperUserId');
      
      // 헬퍼 유저 연결
      sb.connect(helperUserId, (user, error) => {
        if (error) {
          console.error('SendBird connection failed:', error);
          return;
        }

        // 채널 가져오기
        sb.GroupChannel.getChannel(channel_url, (groupChannel, error) => {
          if (error) {
            console.error('Failed to load the channel:', error);
            return;
          }

          setChannel(groupChannel);

          // 메시지 가져오기
          const messageListQuery = groupChannel.createPreviousMessageListQuery();
          messageListQuery.load(20, true, (messageList, error) => {
            if (error) {
              console.error('Failed to load messages:', error);
              return;
            }
            setMessages(messageList);
          });
        });
      });
    }
  }, [channel_url]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (channel && newMessage) {
      channel.sendUserMessage(newMessage, (message, error) => {
        if (error) {
          console.error('Failed to send message:', error);
          return;
        }
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage('');
      });
    }
  };

  return (
    <div className="chat-container">
      <h1>채팅방: {channel_url}</h1>
      <div className="chat-box">
        {messages.map((message) => (
          <div key={message.messageId}>
            <strong>{message.sender.nickname || message.sender.userId}: </strong>
            {message.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatPage;
