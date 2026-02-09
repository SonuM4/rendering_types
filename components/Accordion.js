// Accordion Component
// A collapsible content container that shows/hides content on click
// This is a Client Component because it needs interactive state (useState)

'use client';

import { useState } from 'react';

// Interactive accordion that can expand/collapse to show/hide content
// Used throughout the app to organize content into expandable sections
export default function Accordion({ title, children, defaultOpen = false }) {
  // Track whether the accordion is currently expanded or collapsed
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

// AccordionGroup Component
// Wrapper for multiple accordions that can optionally enforce single-open behavior
// Currently supports multiple open accordions by default
export function AccordionGroup({ children, allowMultiple = true }) {
  // Track which accordion is currently open (for single-open mode)
  const [openIndex, setOpenIndex] = useState(null);

  // If multiple accordions can be open simultaneously, just render as a container
  if (allowMultiple) {
    return <div className="accordion-group">{children}</div>;
  }

  // For single-open mode, we'd need to clone children and pass state
  // This would ensure only one accordion is open at a time
  // Currently simplified to just render children as-is
  return <div className="accordion-group">{children}</div>;
}
