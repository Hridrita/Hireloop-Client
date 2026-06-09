

export function StatCard({ stats }) {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-2xl p-6 border border-white/10 backdrop-blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-violet-400">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-white/40 text-sm font-medium">{stat.title}</p>
            <h3 className="text-white text-3xl font-bold mt-1">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}