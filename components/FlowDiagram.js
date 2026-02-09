// FlowDiagram Component
// Displays a visual flow diagram with expandable steps
// Used to show the lifecycle of web requests, CSR, and SSR processes
// This is a Client Component because steps can be clicked to expand/collapse

'use client';

import { useState } from 'react';

// Individual step within a flow diagram that can be expanded for more details
// Each step shows a number, title, and optional expandable details
function FlowStep({ step, isExpanded, onToggle }) {
  return (
    <>
      <div
        className={`diagram-step diagram-step-expandable ${isExpanded ? 'expanded' : ''}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        aria-expanded={isExpanded}
      >
        <div className="diagram-step-number">{step.number}</div>
        <div className="diagram-step-title">{step.title}</div>
        <div className="diagram-step-expand-icon">
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
        </div>
      </div>
      <div className={`diagram-step-details ${isExpanded ? 'open' : ''}`}>
        <div className="diagram-step-details-content">
          <p>{step.details}</p>
          {step.technical && (
            <div className="diagram-step-technical">
              <strong>Technical:</strong> {step.technical}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Main FlowDiagram component that renders a series of sequential steps
// Steps are connected with arrows and can be clicked to reveal more information
export default function FlowDiagram({ title, steps, variant }) {
  // Track which steps are currently expanded (using Set for efficient lookups)
  const [expandedSteps, setExpandedSteps] = useState(new Set());

  // Toggle a step's expanded state (add or remove from the Set)
  const toggleStep = (index) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={`demo-box ${variant || ''}`}>
      <h3 className="demo-box-title">{title}</h3>
      <div className="diagram" style={{ flexDirection: 'column', gap: '0.5rem' }}>
        {steps.map((step, index) => (
          <div key={index} className="flow-step-wrapper">
            <FlowStep
              step={step}
              isExpanded={expandedSteps.has(index)}
              onToggle={() => toggleStep(index)}
            />
            {index < steps.length - 1 && (
              <div className="diagram-arrow">↓</div>
            )}
          </div>
        ))}
      </div>
      <p className="flow-hint">Click on any step for more details</p>
    </div>
  );
}

// ============================================================================
// Flow Diagram Data Definitions
// ============================================================================

// Request Lifecycle - The fundamental flow of any web request
// This is universal across all web applications, regardless of rendering approach
// Shows the journey from URL to rendered page
export const requestLifecycleSteps = [
  {
    number: 1,
    title: 'Browser resolves & connects',
    details: 'User types URL or clicks a link. Browser performs DNS lookup to find the server IP, then establishes a TCP connection (plus TLS handshake for HTTPS).',
    technical: 'DNS adds 20-120ms. TCP three-way handshake, then TLS negotiation. HTTP/2 and HTTP/3 can reuse connections. This overhead happens before any content transfers.'
  },
  {
    number: 2,
    title: 'Request sent to server',
    details: 'Browser sends an HTTP request with method (GET/POST), headers (cookies, auth), and path. The server now knows what the client wants.',
    technical: 'Headers include User-Agent, Accept, Cookie, Authorization. The server uses these plus the URL to determine the response.'
  },
  {
    number: 3,
    title: 'Server processes & responds',
    details: 'Server runs application logic, queries databases if needed, and sends back an HTTP response. This is where CSR vs SSR differs most.',
    technical: 'Response includes status code (200, 404, 500), headers (caching, content-type), and body (HTML, JS, JSON). TTFB measures time until first byte arrives.'
  },
  {
    number: 4,
    title: 'Browser parses & fetches resources',
    details: 'Browser parses HTML to build the DOM, discovers linked resources (CSS, JS, images), and fetches them. CSS blocks rendering; JS can block parsing.',
    technical: 'HTML parsing is incremental. Resource hints (preload, prefetch) optimize loading. The critical rendering path determines what blocks first paint.'
  },
  {
    number: 5,
    title: 'Render & become interactive',
    details: 'Browser paints pixels to screen and executes JavaScript. The page becomes visible and interactive. What\'s "on the wire" determines when this happens.',
    technical: 'Key metrics: FCP (First Contentful Paint), LCP (Largest Contentful Paint), TTI (Time to Interactive). CSR and SSR have very different profiles here.'
  }
];

// CSR Flow - Client-Side Rendering specific lifecycle
// Shows how CSR apps send minimal HTML and build the UI in the browser
// Key characteristic: JavaScript must execute before any content appears
export const csrSteps = [
  {
    number: 1,
    title: 'Request reaches server',
    details: 'After DNS and connection setup, your request arrives at the server. With CSR, the server has a simple job.',
    technical: 'Server doesn\'t need to know about your specific page content - it serves the same shell for all routes.'
  },
  {
    number: 2,
    title: 'Server sends minimal HTML shell',
    details: 'The server responds quickly with a tiny HTML file - just a container div and links to JavaScript bundles. No actual content yet.',
    technical: 'Response is fast (low TTFB) because there\'s no processing. HTML is typically <1KB. The "app" lives entirely in the JS bundle.'
  },
  {
    number: 3,
    title: 'Browser downloads JS bundle',
    details: 'The browser sees the script tags and starts downloading your application code. This bundle contains all the logic to build the page.',
    technical: 'Bundle size matters here. A 500KB bundle on 3G can take seconds. Code splitting helps by loading only what\'s needed for the current page.'
  },
  {
    number: 4,
    title: 'JavaScript builds the page',
    details: 'Your framework executes, creates the UI in memory, then inserts it into the empty container. Data fetching typically starts here too.',
    technical: 'React creates virtual DOM, reconciles, and commits to real DOM. Initial API calls fire. User sees loading states until data arrives.'
  },
  {
    number: 5,
    title: 'Content appears, page is interactive',
    details: 'Once JS executes and data loads, users finally see content. The page is immediately interactive since JS is already running.',
    technical: 'FCP and LCP are delayed until JS completes. But TTI equals FCP - no hydration gap. Good for highly interactive apps.'
  }
];

// SSR Flow - Server-Side Rendering specific lifecycle
// Shows how SSR apps generate complete HTML on the server
// Key characteristic: Content is visible immediately, but needs hydration for interactivity
export const ssrSteps = [
  {
    number: 1,
    title: 'Request reaches server',
    details: 'After DNS and connection setup, your request arrives. With SSR, the server has more work to do before responding.',
    technical: 'Server needs to run your application code to determine what HTML to send for this specific URL and user.'
  },
  {
    number: 2,
    title: 'Server executes your app',
    details: 'The server runs your application code, fetches any required data from databases or APIs, and generates complete HTML with real content.',
    technical: 'This adds latency (higher TTFB) but the response contains actual content. Data fetching happens server-side, often faster due to proximity to databases.'
  },
  {
    number: 3,
    title: 'Complete HTML sent to browser',
    details: 'The server responds with fully-formed HTML. The page content is embedded directly - headings, text, images references, everything.',
    technical: 'Larger response than CSR shell, but browser can render immediately. Great for SEO - crawlers see complete content.'
  },
  {
    number: 4,
    title: 'Content visible immediately',
    details: 'The browser parses HTML and shows content right away. Users see the page almost instantly, even before JavaScript loads.',
    technical: 'Fast FCP and LCP. Users perceive the site as fast. But the page isn\'t interactive yet - buttons don\'t work, forms don\'t submit.'
  },
  {
    number: 5,
    title: 'JavaScript hydrates the page',
    details: 'JS downloads and "hydrates" the static HTML - attaching event listeners and enabling interactivity without re-rendering.',
    technical: 'Hydration reconciles server HTML with client components. There\'s a gap between content visible and interactive (TTI > FCP). This is the hydration delay.'
  }
];
