// in config.js
import { createChatBotMessage,createCustomMessage,createClientMessage } from 'react-chatbot-kit';
import FAQWidget from './widgets/FAQWidget';
import ComplaintWidget from './widgets/ComplaintWidget';
const botName = 'AHA';

const config = {
  initialMessages: [createClientMessage('Hello AHA!'),createChatBotMessage(`Hi! I'm ${botName}`),
  createChatBotMessage(
    "Here's a quick overview over what I need to function. ask me about the FAQ's and Tickets.",
    {
      withAvatar: false,
      delay: 500,
    }
  )],
  widgets:[
    {
      widgetName:'faqWidget',
      widgetFunc:(props) => <FAQWidget {...props}/>
    },
    {
      widgetName:'complaintWidget',
      widgetFunc:(props) => <ComplaintWidget {...props}/>
    }
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#97144d',
    },
    chatButton: {
      backgroundColor: '#97144d',
    }
  }
};

export default config;