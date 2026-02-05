import { Suspense } from "react";
import { SlowProducts, SlowReviews, SlowRecommendations } from "@/components/streaming/SlowComponent";
import { ProductsSkeleton, ReviewsSkeleton, RecommendationsSkeleton } from "@/components/streaming/LoadingSkeleton";

export default function StreamingDemoPage() {
  return (
    <div className="page">
      <h1 className="page-title">Streaming SSR Demo</h1>

      <div className="demo-box" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
        <h3 className="demo-box-title">Products (2 second delay)</h3>
        <Suspense fallback={<ProductsSkeleton />}>
          <SlowProducts delayMs={2000} />
        </Suspense>
      </div>

      <div className="demo-box" style={{ marginBottom: '1.5rem' }}>
        <h3 className="demo-box-title">Reviews (3 second delay)</h3>
        <Suspense fallback={<ReviewsSkeleton />}>
          <SlowReviews delayMs={3000} />
        </Suspense>
      </div>

      <div className="demo-box" style={{ marginBottom: '1.5rem' }}>
        <h3 className="demo-box-title">Recommendations (10 second delay)</h3>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <SlowRecommendations delayMs={10000} />
        </Suspense>
      </div>
    </div>
  );
}
