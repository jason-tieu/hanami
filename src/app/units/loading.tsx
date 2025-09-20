export default function UnitsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className="bg-card/80 border border-border rounded-2xl p-6 animate-pulse"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-muted/70 rounded-lg"></div>
            <div className="w-16 h-6 bg-muted/60 rounded-full"></div>
          </div>
          <div className="h-6 bg-muted/70 rounded w-2/3 mb-2"></div>
          <div className="h-5 bg-muted/60 rounded w-3/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted/60 rounded w-full"></div>
            <div className="h-4 bg-muted/60 rounded w-2/3"></div>
            <div className="h-4 bg-muted/60 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
