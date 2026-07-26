import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Helper to determine difficulty badge color if not provided by backend
const getDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case "Easy": return "bg-tertiary-container text-on-tertiary-container";
    case "Medium": return "bg-primary-fixed text-on-primary-fixed";
    case "Hard": return "bg-error-container text-on-error-container";
    default: return "bg-surface-container-high text-on-surface";
  }
};

const fallbackProblemData = [
  // DSA
  {
    id: "reverse-k-group",
    title: "Reverse Nodes in k-Group",
    category: "DSA",
    subCategory: "Linked List",
    difficulty: "Hard",
    successRate: "35%",
    status: "Attempted",
    diffClass: "bg-error-container text-on-error-container",
  },
  {
    id: "two-sum",
    title: "Two Sum Challenge",
    category: "DSA",
    subCategory: "Arrays & Hashing",
    difficulty: "Easy",
    successRate: "48%",
    status: "Solved",
    diffClass: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    category: "DSA",
    subCategory: "Dynamic Programming",
    difficulty: "Medium",
    successRate: "42%",
    status: "Todo",
    diffClass: "bg-primary-fixed text-on-primary-fixed",
  },
  // Aptitude
  {
    id: "work-and-time",
    title: "Quantitative: Work & Time Efficiency",
    category: "Aptitude",
    subCategory: "Quantitative",
    difficulty: "Medium",
    successRate: "60%",
    status: "Solved",
    diffClass: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    id: "syllogisms",
    title: "Logical Reasoning: Syllogisms",
    category: "Aptitude",
    subCategory: "Logical Deduction",
    difficulty: "Easy",
    successRate: "75%",
    status: "Todo",
    diffClass: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "probability-perms",
    title: "Probability & Permutations in CS",
    category: "Aptitude",
    subCategory: "Math",
    difficulty: "Hard",
    successRate: "30%",
    status: "Todo",
    diffClass: "bg-error-container text-on-error-container",
  },
  // CS Fundamentals
  {
    id: "process-sync",
    title: "OS: Process Synchronization & Semaphores",
    category: "CS Fundamentals",
    subCategory: "Operating Systems",
    difficulty: "Hard",
    successRate: "25%",
    status: "Todo",
    diffClass: "bg-error-container text-on-error-container",
  },
  {
    id: "sql-join-opt",
    title: "DBMS: SQL Join Query Optimization",
    category: "CS Fundamentals",
    subCategory: "Database Management",
    difficulty: "Medium",
    successRate: "55%",
    status: "Solved",
    diffClass: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    id: "tcp-congestion",
    title: "CN: TCP Congestion Control Algorithms",
    category: "CS Fundamentals",
    subCategory: "Computer Networks",
    difficulty: "Medium",
    successRate: "50%",
    status: "Todo",
    diffClass: "bg-primary-fixed text-on-primary-fixed",
  },
];

export default function ProblemsList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/problems");
        if (response.data && Array.isArray(response.data)) {
          setProblems(response.data);
        } else {
          throw new Error("Response data is not an array (received Vite dev server fallback page or invalid JSON)");
        }
      } catch (err) {
        console.warn("Failed to fetch problems from backend, using local fallback", err);
        setProblems(fallbackProblemData);
        setError("Could not connect to server, loaded local backup.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const categories = ["All", "DSA", "Aptitude", "CS Fundamentals"];

  // Filtering Logic
  const filteredProblems = problems.filter((prob) => {
    const matchesCategory =
      selectedCategory === "All" || prob.category === selectedCategory;
    const matchesDifficulty =
      difficultyFilter === "All" || prob.difficulty === difficultyFilter;
    const matchesSearch =
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <main className="flex-1 p-gutter md:p-margin-edge w-full text-left grid-bg h-screen overflow-y-auto">
      {/* Page Header */}
      <header className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-sm select-none">
        <div>
          <h1 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
            Problems <span className="text-gradient-accent">Library</span>
          </h1>
          <p className="text-on-surface-variant mt-2 font-body-md max-w-2xl leading-relaxed">
            Select a topic from DSA, Aptitude, or CS Fundamentals. Attempt challenges to build your portfolio and practice collaborative coding.
          </p>
        </div>
      </header>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch md:items-center justify-between select-none">
        {/* Category Tabs */}
        <div className="flex bg-surface border border-outline-variant rounded-lg p-1 w-fit overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-label-caps font-bold rounded-md tracking-wider transition-all whitespace-nowrap focus:outline-none ${
                selectedCategory === cat
                  ? "bg-secondary text-on-secondary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Difficulty Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search bar */}
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-4 py-2.5 pl-10 text-xs font-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none w-full sm:w-64 transition-all"
              placeholder="Search problems..."
              type="text"
            />
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant/50 absolute left-3.5 top-[11px] pointer-events-none">
              search
            </span>
          </div>

          {/* Difficulty Dropdown */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-xs font-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer appearance-none min-w-[120px]"
          >
            <option value="All">Difficulty: All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Problems Grid/Table */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="border-t-4 border-secondary w-full"></div>
        
        {loading ? (
          <div className="py-16 text-center select-none flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-[48px] mb-3 animate-spin">
              sync
            </span>
            <p className="font-body-md text-base font-semibold text-on-surface-variant">
              Loading problems library...
            </p>
          </div>
        ) : filteredProblems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low select-none">
                  <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider">Status</th>
                  <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider">Title</th>
                  <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider">Category</th>
                  <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider">Topic</th>
                  <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider">Difficulty</th>
                  <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider text-right">Success</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((prob) => (
                  <tr
                    key={prob.id}
                    className="border-b border-outline-variant/60 hover:bg-surface-container-lowest transition-colors"
                  >
                    {/* Status Check */}
                    <td className="py-4 px-6 font-code-sm text-sm">
                      {prob.status === "Solved" && (
                        <span className="material-symbols-outlined text-tertiary-container text-[20px] font-bold" title="Solved" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      )}
                      {prob.status === "Attempted" && (
                        <span className="material-symbols-outlined text-primary-container text-[20px] font-bold" title="Attempted" style={{ fontVariationSettings: "'FILL' 1" }}>
                          warning
                        </span>
                      )}
                      {prob.status === "Todo" && (
                        <span className="material-symbols-outlined text-on-surface-variant/30 text-[20px]" title="To Do">
                          radio_button_unchecked
                        </span>
                      )}
                    </td>

                    {/* Title */}
                    <td className="py-4 px-6 font-body-md font-bold text-sm">
                      <Link
                        to={`/problems/${prob.id}`}
                        className="text-on-surface hover:text-secondary transition-colors"
                      >
                        {prob.title}
                      </Link>
                    </td>

                    {/* Category Label */}
                    <td className="py-4 px-6 font-label-caps text-xs text-on-surface-variant font-bold">
                      {prob.category}
                    </td>

                    {/* Topic */}
                    <td className="py-4 px-6 font-code-sm text-xs text-on-surface-variant font-semibold">
                      {prob.subCategory}
                    </td>

                    {/* Difficulty Badge */}
                    <td className="py-4 px-6 select-none">
                      <span className={`${prob.diffClass || getDifficultyClass(prob.difficulty)} font-label-caps text-[9px] font-bold px-2.5 py-1 rounded`}>
                        {prob.difficulty}
                      </span>
                    </td>

                    {/* Success Rate */}
                    <td className="py-4 px-6 text-right font-code-sm text-xs text-on-surface font-semibold">
                      {prob.successRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center select-none opacity-60 flex flex-col items-center">
            <span className="material-symbols-outlined text-outline text-[48px] mb-3">
              search_off
            </span>
            <p className="font-body-md text-base font-bold text-on-surface-variant">
              No problems match your current criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setDifficultyFilter("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-label-caps font-bold text-secondary hover:underline focus:outline-none"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
