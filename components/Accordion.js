'use client';

import { useState } from 'react';

export default function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className="accordion-content">
        <div className="accordion-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// AccordionGroup can be used to have only one open at a time
export function AccordionGroup({ children, allowMultiple = true }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (allowMultiple) {
    return <div className="accordion-group">{children}</div>;
  }

  // For single-open mode, we'd need to clone children and pass state
  // For now, just render children as-is
  return <div className="accordion-group">{children}</div>;
}
