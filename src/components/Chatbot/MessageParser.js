import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    message = message.toLowerCase()
    if (message.includes('faq')||message.includes('faqs')) {
      actions.handleFAQ();
    }
    if (message.includes('complaint')||message.includes('ticket')){
      actions.handleComplaint();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;