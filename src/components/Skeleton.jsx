export function Skeleton({ className = "", style }) {
  return <div className={`skeleton-shimmer ${className}`} style={style} aria-hidden="true" />;
}

export function SkeletonCard() {
  return (
    <div className="feature-card">
      <Skeleton className="skeleton-block" style={{ height: 48, width: 48, marginBottom: 16 }} />
      <Skeleton className="skeleton-line" style={{ width: "60%", marginBottom: 10 }} />
      <Skeleton className="skeleton-line" style={{ width: "90%", marginBottom: 6 }} />
      <Skeleton className="skeleton-line" style={{ width: "75%" }} />
    </div>
  );
}

export function SkeletonResults() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="clay-result-card p-5">
          <Skeleton className="skeleton-line" style={{ width: "45%", marginBottom: 10 }} />
          <Skeleton className="skeleton-line" style={{ width: "25%", marginBottom: 14, height: 10 }} />
          <Skeleton className="skeleton-line" style={{ width: "95%", marginBottom: 6 }} />
          <Skeleton className="skeleton-line" style={{ width: "80%" }} />
        </div>
      ))}
    </div>
  );
}
