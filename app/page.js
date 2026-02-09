// Home Page - Overview of Web Request Lifecycle
// This is a Server Component (no 'use client' directive)
// It renders on the server and demonstrates the fundamentals of web requests

"user";
import Link from "next/link";
import FlowDiagram, { requestLifecycleSteps, csrSteps, ssrSteps } from "../components/FlowDiagram";

// Main landing page that introduces the web request lifecycle
// Compares CSR and SSR approaches with interactive flow diagrams
export default function Home() {
    return (
        <div className="page">
            <h1 className="page-title">The Lifecycle of a Web Request</h1>
            <p className="page-subtitle">Understanding what happens from the moment you hit Enter to seeing a page on screen</p>

            <div className="card">
                <h2 className="card-title">Every Click Starts a Journey</h2>
                <p>When you visit a website, a complex chain of events unfolds in milliseconds. Understanding this journey helps you build faster, more reliable web applications and debug issues when things go wrong.</p>
            </div>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>The Request Lifecycle</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>This is what happens every time you navigate to a webpage, regardless of the technology behind it.</p>

            <FlowDiagram title="From URL to Rendered Page" steps={requestLifecycleSteps} />

            <div className="card" style={{ marginTop: "2rem" }}>
                <h2 className="card-title">Where CSR and SSR Differ</h2>
                <p>
                    The lifecycle above is universal. But step 3 (server processing) and steps 4-5 (parsing, rendering, interactivity) play out very differently depending on whether your app uses Client-Side Rendering or Server-Side Rendering. This determines what's "on the wire" and ultimately what
                    users experience.
                </p>
            </div>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Two Approaches to Rendering</h2>

            <div className="demo-container">
                <FlowDiagram title="Client-Side Rendering (CSR)" steps={csrSteps} />
                <FlowDiagram title="Server-Side Rendering (SSR)" steps={ssrSteps} />
            </div>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>The Trade-offs</h2>

            <table className="comparison-table">
                <thead>
                    <tr>
                        <th>What Users Experience</th>
                        <th>CSR</th>
                        <th>SSR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Time to first content</td>
                        <td>Slower - must wait for JS to download and execute</td>
                        <td>Faster - HTML arrives ready to display</td>
                    </tr>
                    <tr>
                        <td>Time to interactive</td>
                        <td>Same as first content - no hydration gap</td>
                        <td>Delayed - must wait for hydration after content shows</td>
                    </tr>
                    <tr>
                        <td>Subsequent navigation</td>
                        <td>Fast - no server round-trip needed</td>
                        <td>Varies - may need server for each page</td>
                    </tr>
                    <tr>
                        <td>Works without JavaScript</td>
                        <td>No - blank page without JS</td>
                        <td>Partially - content visible, but not interactive</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <Link href="/csr" className="btn">
                    View Live Demos →
                </Link>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.75rem" }}>Use navigation above to explore CSR, SSR, Hydration, Streaming, and RSC demos</p>
            </div>
        </div>
    );
}
