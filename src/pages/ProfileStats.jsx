import React from "react";
import { Link } from "react-router-dom";

export default function ProfileStats() {
  // Mock Stats Data
  const stats = {
    rating: 1845,
    percentile: "Top 4.2%",
    contestWins: 12,
    contestsParticipated: 34,
    questionsSolved: 145,
    totalQuestions: 500,
    dsaSolved: 92,
    aptitudeSolved: 31,
    csSolved: 22,
    contributions: 8,
    communitySolves: 420,
    approvalRate: "98%",
  };

  // Generate 53 weeks * 7 days of contributions
  const contributionsGrid = Array.from({ length: 365 }, (_, i) => {
    // Randomize activity density: 0 (none), 1 (light), 2 (medium), 3 (dense)
    const level = Math.floor(Math.random() * 4);
    return level;
  });

  const recentContests = [
    { name: "Algorithm Blitz #14", date: "July 24, 2026", rank: "1st", change: "+45" },
    { name: "Binary Tree Sprint", date: "July 12, 2026", rank: "4th", change: "+12" },
    { name: "Dynamic Programming Cup", date: "June 28, 2026", rank: "12th", change: "-8" },
  ];

  return (
    <main className="flex-1 p-gutter md:p-margin-edge w-full text-left grid-bg h-screen overflow-y-auto">
      
      {/* Profile Overview Banner */}
      <div className="bg-surface border border-outline-variant rounded-xl p-8 mb-stack-lg relative overflow-hidden shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
        
        {/* User Card */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary shadow-md bg-surface-container shrink-0">
            <img
              alt="Alex Mercer"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1BuUHeqMH99PMu70w_Z_FbyERWcOr0UXWU0R5rEwYhxjeCFPxl6iTnP-LPbG0QFqk68NSm7yX7uXoG8J8MeIL9Rbi5dZxCC9NNnoZ5whFGeVNFPACRDvjal0DRCB_NSqNXigNxSe9VC-oAdprwAiX69kplC49vGxDopMd-hj6t2mtdFUpas0oN34sldenJDK6YCZD7UhckE3Sf4jyY7u2Zn3tLGQLHDetWwbfsSx5Qo5jFoknoUtWY86iDFFv63tCm-YVrQsevL84"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Alex Mercer</h1>
              <span className="bg-primary-container text-on-primary-container font-label-caps text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                @alexmercer
              </span>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant/90 mt-1.5">
              Full Stack Engineer & Competitive Programmer
            </p>
            <div className="flex gap-4 mt-3 text-xs text-on-surface-variant/70 font-semibold select-none">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_month</span> Joined April 2026
              </span>
            </div>
          </div>
        </div>

        {/* Global rank */}
        <div className="text-left md:text-right shrink-0 select-none">
          <span className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider block mb-1">
            GLOBAL RANK
          </span>
          <span className="font-code-sm text-3xl font-extrabold text-secondary">
            #4,124
          </span>
          <span className="text-xs text-on-surface-variant font-semibold block mt-1.5">
            Top 5% Developers
          </span>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg select-none">
        
        {/* Rating Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
          <div>
            <span className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider block mb-1">
              DEVELOPER RATING
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-code-sm text-3xl font-extrabold text-on-surface">{stats.rating}</span>
              <span className="text-[10px] font-bold text-tertiary-container">▲ 84 this week</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant font-semibold">
            <span>Rank Percentile:</span>
            <span className="font-bold text-secondary">{stats.percentile}</span>
          </div>
        </div>

        {/* Contest Record Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary-container"></div>
          <div>
            <span className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider block mb-1">
              CONTESTS OVERVIEW
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-code-sm text-3xl font-extrabold text-on-surface">{stats.contestWins} Wins</span>
              <span className="text-xs text-on-surface-variant">/ {stats.contestsParticipated} Played</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant font-semibold">
            <span>Win Rate:</span>
            <span className="font-bold text-tertiary">
              {((stats.contestWins / stats.contestsParticipated) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Questions Solved Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container"></div>
          <div>
            <span className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider block mb-1">
              QUESTIONS SOLVED
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-code-sm text-3xl font-extrabold text-on-surface">{stats.questionsSolved}</span>
              <span className="text-xs text-on-surface-variant">/ {stats.totalQuestions} Total</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/30 flex flex-col gap-2 text-[10px] text-on-surface-variant font-bold">
            <div className="flex justify-between">
              <span>DSA: {stats.dsaSolved}</span>
              <span>Aptitude: {stats.aptitudeSolved}</span>
              <span>CS: {stats.csSolved}</span>
            </div>
            {/* Visual breakdown progress bar */}
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-secondary h-full" style={{ width: `${(stats.dsaSolved / stats.questionsSolved) * 100}%` }}></div>
              <div className="bg-tertiary h-full" style={{ width: `${(stats.aptitudeSolved / stats.questionsSolved) * 100}%` }}></div>
              <div className="bg-primary h-full" style={{ width: `${(stats.csSolved / stats.questionsSolved) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Studio Contributions Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-error-container"></div>
          <div>
            <span className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider block mb-1">
              STUDIO CONTRIBUTIONS
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-code-sm text-3xl font-extrabold text-on-surface">{stats.contributions} Items</span>
              <span className="text-[10px] text-on-surface-variant">420 Solves</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant font-semibold">
            <span>Community Approval:</span>
            <span className="font-bold text-error">{stats.approvalRate}</span>
          </div>
        </div>

      </div>

      {/* Contribution Heatmap Calendar */}
      <div className="bg-surface border border-outline-variant rounded-xl p-8 mb-stack-lg shadow-sm text-left">
        <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface mb-6 select-none flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">grid_on</span>
          Developer Activity Heatmap
        </h3>
        
        {/* Mock Calendar Grid */}
        <div className="overflow-x-auto select-none">
          <div className="min-w-[700px] flex flex-col gap-2">
            <div className="flex gap-1">
              {contributionsGrid.map((level, idx) => {
                let colorClass = "bg-surface-container-low"; // 0
                if (level === 1) colorClass = "bg-secondary-container/20 border border-secondary/20";
                if (level === 2) colorClass = "bg-secondary-container/50 border border-secondary/40";
                if (level === 3) colorClass = "bg-secondary border border-secondary";
                
                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-sm shrink-0 transition-colors hover:brightness-105 cursor-pointer ${colorClass}`}
                    title={`Activity level: ${level}`}
                  />
                );
              })}
            </div>
            
            {/* Heatmap Legend */}
            <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-bold mt-4 px-2">
              <span>A total of 418 submissions in the last 12 months</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <div className="w-3.5 h-3.5 rounded-sm bg-surface-container-low" />
                <div className="w-3.5 h-3.5 rounded-sm bg-secondary-container/20 border border-secondary/20" />
                <div className="w-3.5 h-3.5 rounded-sm bg-secondary-container/50 border border-secondary/40" />
                <div className="w-3.5 h-3.5 rounded-sm bg-secondary" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Contests Listing */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm text-left">
        <div className="border-t-4 border-secondary w-full"></div>
        <div className="p-6 border-b border-outline-variant select-none bg-surface-container-low">
          <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">workspace_premium</span>
            Recent Contest History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low/40 select-none">
                <th className="py-3 px-6 font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider">Contest Room</th>
                <th className="py-3 px-6 font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider">Date</th>
                <th className="py-3 px-6 font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider">Placement</th>
                <th className="py-3 px-6 font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider text-right">Rating Impact</th>
              </tr>
            </thead>
            <tbody>
              {recentContests.map((item, idx) => (
                <tr key={idx} className="border-b border-outline-variant/60 hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4 px-6 font-body-md font-bold text-xs text-on-surface">{item.name}</td>
                  <td className="py-4 px-6 font-code-sm text-xs text-on-surface-variant font-semibold">{item.date}</td>
                  <td className="py-4 px-6 select-none">
                    <span className="bg-tertiary-container text-on-tertiary-container font-label-caps text-[9px] font-bold px-2 py-0.5 rounded">
                      {item.rank}
                    </span>
                  </td>
                  <td className={`py-4 px-6 text-right font-code-sm text-xs font-bold ${
                    item.change.startsWith("+") ? "text-tertiary" : "text-error"
                  }`}>
                    {item.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  );
}
