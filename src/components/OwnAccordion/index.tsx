import React, { useState } from 'react';
import "./styles.css";

interface AccordionProps {
  title: string;
  content: string;
}

const OwnAccordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <span className="icon">{isOpen ? '-' : '+'}</span>
      </div>
      <div className="accordion-content">{content}</div>
    </div>
  );
};

export default OwnAccordion;
