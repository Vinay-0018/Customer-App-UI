import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleFAQ = () => {
    const message = createChatBotMessage('Sure! Here are some common FAQs:', {
      widget: 'faqWidget',
    });
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
  const handleComplaint = () => {
    const message = createChatBotMessage('Follow these Steps to raise a Ticket', {
      widget: 'complaintWidget',
    });
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  // More action handlers for other functionalities
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleFAQ,
            handleComplaint
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;