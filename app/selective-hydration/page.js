// Selective Hydration Page
// Explains React 18's selective hydration feature
// This is a Server Component that renders the educational content

import Link from "next/link";
import Accordion from "@/components/Accordion";

export default function SelectiveHydrationPage() {
  return (
    <div className="page">
      <h1 className="page-title">Selective Hydration</h1>
      <p className="page-subtitle">
        React 18's intelligent hydration that prioritizes user interactions
      </p>

      <Accordion title="What is Selective Hydration?" defaultOpen={true}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Selective Hydration</strong> is a React 18 feature that works with Suspense
          boundaries to allow parts of your application to hydrate independently. Instead of
          waiting for all JavaScript to load and all components to hydrate before any
          interactivity works, selective hydration lets the most critical parts become
          interactive first.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Even better, if a user tries to interact with a component that hasn't hydrated yet,
          React <strong>prioritizes that component's hydration</strong> over others.
        </p>
        <div className="info-box">
          <strong>Key Benefit:</strong> Users don't have to wait for the entire page to hydrate
          before they can start interacting. React intelligently prioritizes what matters most.
        </div>
      </Accordion>

      <Accordion title="The Problem It Solves">
        <h4 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Traditional Hydration (React 17)</h4>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          In traditional SSR, hydration is all-or-nothing:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', marginBottom: '1.5rem' }}>
          <li>All JavaScript must download before hydration starts</li>
          <li>All components must hydrate before any are interactive</li>
          <li>One slow component blocks the entire page from becoming interactive</li>
        </ul>

        <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Selective Hydration (React 18)</h4>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          With Suspense boundaries, hydration becomes granular:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>Code for different components can load in parallel</li>
          <li>Each Suspense boundary can hydrate independently</li>
          <li>React prioritizes components the user is trying to interact with</li>
        </ul>
      </Accordion>

      <Accordion title="How It Works">
        <div className="diagram" style={{ flexDirection: 'column', gap: '0.75rem' }}>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="diagram-step-number">1</div>
            <div>
              <strong>Server Streams HTML</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Page shell loads immediately. Content inside Suspense boundaries streams in progressively.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="diagram-step-number">2</div>
            <div>
              <strong>JavaScript Loads in Chunks</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Code for each Suspense boundary loads separately. They don't block each other.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="diagram-step-number">3</div>
            <div>
              <strong>Parallel Hydration Begins</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                As each chunk arrives, React starts hydrating that boundary. Multiple boundaries hydrate in parallel.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="diagram-step-number">4</div>
            <div>
              <strong>User Interaction Detected</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                User clicks a button that hasn't hydrated yet. React detects the click.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="diagram-step-number">5</div>
            <div>
              <strong>Priority Hydration</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                React <strong>immediately prioritizes</strong> hydrating that component, replays the click, and makes it work!
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      <div style={{ marginTop: "2rem", marginBottom: "2rem", textAlign: "center" }}>
        <Link href="/selective-hydration/demo" className="btn">
          View Live Demo →
        </Link>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          See selective hydration in action
        </p>
      </div>

      <Accordion title="The Magic: Priority-Based Hydration">
        <p style={{ marginBottom: '1rem' }}>
          The most powerful aspect of selective hydration is <strong>interaction-based prioritization</strong>:
        </p>

        <div style={{ background: 'var(--code-bg)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <h4 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Scenario</h4>
          <p style={{ marginBottom: '1rem' }}>
            Your page has three sections: Header, Sidebar, and Content. The Content area has
            a heavy component that's still loading. User clicks a button in the Sidebar.
          </p>

          <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem', marginTop: '1.5rem' }}>
            What React Does
          </h4>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
            <li>Detects the click on Sidebar (not yet hydrated)</li>
            <li>Pauses hydration of Content area</li>
            <li>Immediately hydrates the Sidebar</li>
            <li>Replays the captured click event</li>
            <li>Sidebar button works! Content continues hydrating in the background</li>
          </ol>
        </div>

        <div className="info-box">
          <strong>Result:</strong> Users experience feels instant even though hydration is still in progress.
        </div>
      </Accordion>

      <Accordion title="Code Pattern">
        <p style={{ marginBottom: '1rem' }}>
          Selective hydration automatically works when you combine Suspense with streaming SSR:
        </p>

        <div className="code-block">
          <code>
{`import { Suspense } from 'react';

// This is a Server Component
export default function Page() {
  return (
    <div>
      {/* Header loads and hydrates immediately */}
      <Header />

      {/* Each Suspense boundary can hydrate independently */}
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />  {/* Hydrates as soon as its code loads */}
      </Suspense>

      <Suspense fallback={<ContentSkeleton />}>
        <HeavyContent />  {/* Has heavy code, hydrates last */}
      </Suspense>

      {/* Footer loads and hydrates immediately */}
      <Footer />
    </div>
  );
}

// If user clicks Sidebar before HeavyContent hydrates,
// React prioritizes Sidebar's hydration automatically!`}
          </code>
        </div>
      </Accordion>

      <Accordion title="Requirements">
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li><strong>React 18+</strong> - Selective hydration is a React 18 feature</li>
          <li><strong>Streaming SSR</strong> - Must use renderToPipeableStream (not renderToString)</li>
          <li><strong>Suspense Boundaries</strong> - Wrap async components in Suspense</li>
          <li><strong>Code Splitting</strong> - Different boundaries should have separate chunks</li>
        </ul>

        <div className="info-box" style={{ marginTop: '1rem' }}>
          <strong>Good News:</strong> Next.js App Router has all of this built-in! You just need
          to use Suspense boundaries.
        </div>
      </Accordion>

      <Accordion title="Benefits">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Traditional Hydration</th>
              <th>Selective Hydration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JavaScript Loading</td>
              <td style={{ color: 'var(--error)' }}>All must load first</td>
              <td style={{ color: 'var(--success)' }}>Parallel loading</td>
            </tr>
            <tr>
              <td>Hydration Blocking</td>
              <td style={{ color: 'var(--error)' }}>One slow part blocks all</td>
              <td style={{ color: 'var(--success)' }}>Independent hydration</td>
            </tr>
            <tr>
              <td>User Interaction</td>
              <td style={{ color: 'var(--error)' }}>Must wait for everything</td>
              <td style={{ color: 'var(--success)' }}>Prioritized immediately</td>
            </tr>
            <tr>
              <td>Time to Interactive</td>
              <td style={{ color: 'var(--error)' }}>Slowest component determines</td>
              <td style={{ color: 'var(--success)' }}>Fastest interactive first</td>
            </tr>
          </tbody>
        </table>
      </Accordion>

      <Accordion title="DevTools Observation">
        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Performance Tab</h4>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', marginBottom: '1.5rem' }}>
          <li>Record a page load in the Performance tab</li>
          <li>Look for multiple "Hydrate" events in the Main thread</li>
          <li>Traditional: One big hydration block. Selective: Multiple smaller blocks</li>
          <li>Try clicking during hydration - see React prioritize that component</li>
        </ol>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Network Tab</h4>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>Look for multiple JavaScript chunk files loading</li>
          <li>Each Suspense boundary typically gets its own chunk</li>
          <li>Chunks can load in parallel, not sequentially</li>
        </ul>
      </Accordion>

      <Accordion title="Common Patterns">
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>✓ Heavy Third-Party Libraries</h4>
          <p style={{ color: 'var(--text-muted)' }}>
            Wrap components that import large libraries (charts, editors) in Suspense.
            They hydrate independently without blocking the rest of the page.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>✓ Below-the-Fold Content</h4>
          <p style={{ color: 'var(--text-muted)' }}>
            Content that users scroll to can load and hydrate later. Above-the-fold content
            becomes interactive immediately.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>✓ Modals and Dialogs</h4>
          <p style={{ color: 'var(--text-muted)' }}>
            Complex modals that might not be used can hydrate on-demand when opened.
          </p>
        </div>
      </Accordion>
    </div>
  );
}
