"use client";

import { useState, useEffect } from "react";

/**
 * StreamingTimeline - Visual representation of streaming SSR chunks
 *
 * Shows a timeline of when each chunk arrives, making the progressive
 * nature of streaming SSR obvious during live demos
 */
export default function StreamingTimeline() {
    const [events, setEvents] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const startTime = Date.now();

        // Add shell event immediately
        setEvents([
            {
                id: "shell",
                label: "Shell HTML",
                time: 0,
                description: "Page structure + loading skeletons",
                color: "#3b82f6",
            },
        ]);

        // Products at 2s
        const productsTimer = setTimeout(() => {
            setEvents((prev) => [
                ...prev,
                {
                    id: "products",
                    label: "Products",
                    time: Date.now() - startTime,
                    description: "First data chunk streamed",
                    color: "#10b981",
                },
            ]);
        }, 2000);

        // Reviews at 5s
        const reviewsTimer = setTimeout(() => {
            setEvents((prev) => [
                ...prev,
                {
                    id: "reviews",
                    label: "Reviews",
                    time: Date.now() - startTime,
                    description: "Second data chunk streamed",
                    color: "#10b981",
                },
            ]);
        }, 5000);

        // Recommendations at 10s
        const recsTimer = setTimeout(() => {
            setEvents((prev) => [
                ...prev,
                {
                    id: "recommendations",
                    label: "Recommendations",
                    time: Date.now() - startTime,
                    description: "Third data chunk streamed",
                    color: "#10b981",
                },
            ]);
        }, 10000);

        // Analytics at 15s
        const analyticsTimer = setTimeout(() => {
            setEvents((prev) => [
                ...prev,
                {
                    id: "analytics",
                    label: "Analytics",
                    time: Date.now() - startTime,
                    description: "Fourth data chunk streamed",
                    color: "#f59e0b",
                },
            ]);
        }, 15000);

        // Related Items at 20s
        const relatedTimer = setTimeout(() => {
            setEvents((prev) => [
                ...prev,
                {
                    id: "related",
                    label: "Related Items",
                    time: Date.now() - startTime,
                    description: "Final chunk - connection closes",
                    color: "#8b5cf6",
                },
            ]);
            setIsComplete(true);
        }, 20000);

        return () => {
            clearTimeout(productsTimer);
            clearTimeout(reviewsTimer);
            clearTimeout(recsTimer);
            clearTimeout(analyticsTimer);
            clearTimeout(relatedTimer);
        };
    }, []);

    const maxTime = 20000; // 20 seconds total

    return (
        <div className="streaming-timeline">
            <div className="timeline-header">
                <h4>🌊 Streaming Timeline</h4>
                <div className="timeline-status">{isComplete ? <span className="status-complete">✅ Complete</span> : <span className="status-streaming">⏳ Streaming...</span>}</div>
            </div>

            <div className="timeline-track">
                {/* Time markers */}
                <div className="timeline-markers">
                    <span>0s</span>
                    <span>5s</span>
                    <span>10s</span>
                    <span>15s</span>
                    <span>20s</span>
                </div>

                {/* Event markers */}
                <div className="timeline-events">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="timeline-event"
                            style={{
                                left: `${(event.time / maxTime) * 100}%`,
                                borderColor: event.color,
                            }}
                        >
                            <div className="event-marker" style={{ background: event.color }}></div>
                            <div className="event-label">{event.label}</div>
                            <div className="event-time">{(event.time / 1000).toFixed(1)}s</div>
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="timeline-progress">
                    <div
                        className="progress-fill"
                        style={{
                            width: isComplete ? "100%" : `${(events.length / 6) * 100}%`,
                            transition: "width 0.5s ease",
                        }}
                    ></div>
                </div>
            </div>

            <div className="timeline-legend">
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: "#3b82f6" }}></span>
                    <span>Shell (instant)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: "#10b981" }}></span>
                    <span>Data chunks</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: "#f59e0b" }}></span>
                    <span>Analytics</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: "#8b5cf6" }}></span>
                    <span>Final chunk</span>
                </div>
            </div>

            <div className="timeline-info">
                <strong>💡 What this shows:</strong>
                <p>Unlike traditional SSR (waits for all data), streaming sends the shell immediately, then progressively sends content as it becomes ready. Each dot represents a chunk arriving at your browser.</p>
            </div>
        </div>
    );
}
