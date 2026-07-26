import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Mock Database containing details for all problems
const problemsDb = {
  // DSA (Coding)
  "reverse-k-group": {
    type: "coding",
    title: "124. Reverse Nodes in k-Group",
    difficulty: "Hard",
    category: "DSA",
    subCategory: "Linked List",
    desc: `Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
You may not alter the values in the list's nodes, only nodes themselves may be changed.`,
    exampleInput: "head = [1,2,3,4,5], k = 2",
    exampleOutput: "[2,1,4,3,5]",
    constraints: [
      "The number of nodes in the list is in the range [1, 5000].",
      "0 <= Node.val <= 1000",
      "1 <= k <= sz"
    ],
    templateCode: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        groupPrev = dummy
        
        while True:
            kth = self.getKth(groupPrev, k)
            if not kth:
                break
            groupNext = kth.next
            
            # reverse group
            prev, curr = kth.next, groupPrev.next
            while curr != groupNext:
                tmp = curr.next
                curr.next = prev
                prev = curr
                curr = tmp
            
            tmp = groupPrev.next
            groupPrev.next = kth
            groupPrev = tmp
        
        return dummy.next`
  },
  "two-sum": {
    type: "coding",
    title: "1. Two Sum Challenge",
    difficulty: "Easy",
    category: "DSA",
    subCategory: "Arrays & Hashing",
    desc: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    exampleInput: "nums = [2,7,11,15], target = 9",
    exampleOutput: "[0,1]",
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109",
      "Only one valid answer exists."
    ],
    templateCode: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`
  },
  "longest-common-subsequence": {
    type: "coding",
    title: "1143. Longest Common Subsequence",
    difficulty: "Medium",
    category: "DSA",
    subCategory: "Dynamic Programming",
    desc: `Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
For example, "ace" is a subsequence of "abcde".`,
    exampleInput: 'text1 = "abcde", text2 = "ace"',
    exampleOutput: "3",
    constraints: [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of only lowercase English characters."
    ],
    templateCode: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # Write your code here
        pass`
  },

  // Aptitude (MCQ)
  "work-and-time": {
    type: "mcq",
    title: "Quantitative: Work & Time Efficiency",
    difficulty: "Medium",
    category: "Aptitude",
    subCategory: "Quantitative",
    question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:",
    options: [
      { key: "A", text: "1/4" },
      { key: "B", text: "1/10" },
      { key: "C", text: "7/15" },
      { key: "D", text: "8/15" }
    ],
    correctAnswer: "D",
    explanation: "A's 1 day work = 1/15. B's 1 day work = 1/20. Together in 1 day = (1/15 + 1/20) = 7/60. Together in 4 days = 4 * (7/60) = 7/15. Therefore, work left = (1 - 7/15) = 8/15."
  },
  "syllogisms": {
    type: "mcq",
    title: "Logical Reasoning: Syllogisms",
    difficulty: "Easy",
    category: "Aptitude",
    subCategory: "Logical Deduction",
    question: `Statements:
1. Some keys are staplers.
2. Some staplers are stickers.
3. All stickers are pens.

Conclusions:
I. Some pens are staplers.
II. Some stickers are keys.
III. No pen is key.

Which of the conclusions logically follows?`,
    options: [
      { key: "A", text: "Only I follows" },
      { key: "B", text: "Only II and III follow" },
      { key: "C", text: "Only I and III follow" },
      { key: "D", text: "All follow" }
    ],
    correctAnswer: "A",
    explanation: "Statement 2 says 'Some staplers are stickers' and Statement 3 says 'All stickers are pens'. This implies that some pens must be staplers. Therefore, conclusion I follows. There is no direct link between keys and stickers, nor between pens and keys, so II and III do not necessarily follow."
  },
  "probability-perms": {
    type: "mcq",
    title: "Probability & Permutations in CS",
    difficulty: "Hard",
    category: "Aptitude",
    subCategory: "Math",
    question: "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?",
    options: [
      { key: "A", text: "3/7" },
      { key: "B", text: "4/7" },
      { key: "C", text: "1/8" },
      { key: "D", text: "3/14" }
    ],
    correctAnswer: "B",
    explanation: "Total number of balls = 6 + 8 = 14. Number of white balls = 8. Probability of drawing a white ball = 8/14 = 4/7."
  },

  // CS Fundamentals (MCQ)
  "process-sync": {
    type: "mcq",
    title: "OS: Process Synchronization & Semaphores",
    difficulty: "Hard",
    category: "CS Fundamentals",
    subCategory: "Operating Systems",
    question: "Suppose we want to synchronize two concurrent processes P1 and P2 using semaphores S and T. P1 executes operation A, signals T, then waits on S. P2 waits on T, executes operation B, then signals S. To ensure process synchronization and avoid deadlocks, what must be the correct initial values of S and T?",
    options: [
      { key: "A", text: "S = 0, T = 0" },
      { key: "B", text: "S = 1, T = 0" },
      { key: "C", text: "S = 0, T = 1" },
      { key: "D", text: "S = 1, T = 1" }
    ],
    correctAnswer: "A",
    explanation: "A must run before B. T must be 0 so that P2 blocks on wait(T) until P1 completes A and executes signal(T). S must be 0 so P1 blocks on wait(S) until P2 finishes B and signals S."
  },
  "sql-join-opt": {
    type: "mcq",
    title: "DBMS: SQL Join Query Optimization",
    difficulty: "Medium",
    category: "CS Fundamentals",
    subCategory: "Database Management",
    question: "Which of the following Join algorithms performs best in DBMS when both tables are extremely large but are already sorted on the join attribute?",
    options: [
      { key: "A", text: "Block Nested Loop Join" },
      { key: "B", text: "Hash Join" },
      { key: "C", text: "Sort-Merge Join" },
      { key: "D", text: "Index Nested Loop Join" }
    ],
    correctAnswer: "C",
    explanation: "Since both tables are already sorted on the join key, Sort-Merge Join only requires a single linear scan (O(N + M)) to perform the join. It skips the expensive sort phase, making it highly efficient."
  },
  "tcp-congestion": {
    type: "mcq",
    title: "CN: TCP Congestion Control Algorithms",
    difficulty: "Medium",
    category: "CS Fundamentals",
    subCategory: "Computer Networks",
    question: "During which TCP Congestion Control phase does the Congestion Window (cwnd) size increase linearly by 1 MSS (Maximum Segment Size) for every Round Trip Time (RTT)?",
    options: [
      { key: "A", text: "Slow Start" },
      { key: "B", text: "Congestion Avoidance" },
      { key: "C", text: "Fast Recovery" },
      { key: "D", text: "Timeout Retransmission" }
    ],
    correctAnswer: "B",
    explanation: "In the Congestion Avoidance phase, the cwnd increases linearly (additive increase) by 1 MSS per RTT. In the Slow Start phase, the window increases exponentially (doubling every RTT)."
  }
};

export default function CodingWorkspace() {
  const { problemId } = useParams();
  
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Problem details from backend on load
  useEffect(() => {
    const fetchProblemDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/problems/${problemId}`);
        if (response.data && typeof response.data === "object" && response.data.type) {
          setProblem(response.data);
        } else {
          throw new Error("Response data is not a valid problem object (received Vite dev server fallback page or invalid JSON)");
        }
      } catch (err) {
        console.warn("Failed to fetch problem from backend, using local fallback", err);
        // Fallback to local DB so page doesn't break if server is down/not implemented yet
        const localProblem = problemsDb[problemId] || problemsDb["reverse-k-group"];
        setProblem(localProblem);
        setError("Could not connect to server, loaded local backup.");
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchProblemDetail();
    }
  }, [problemId]);

  // Ticking Timer State (29:45 countdown)
  const [timeLeft, setTimeLeft] = useState(1785);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Coding states
  const [activeTestCase, setActiveTestCase] = useState(1);
  const [editorCode, setEditorCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Python 3");

  // MCQ states
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sync editor code when problem loads or changes
  useEffect(() => {
    if (!problem) return;
    if (problem.type === "coding") {
      setEditorCode(problem.templateCode || "");
    } else {
      setSelectedOption("");
      setIsAnswerSubmitted(false);
      setShowHint(false);
    }
  }, [problem]);

  const testCases = [
    {
      id: 1,
      name: "Case 1",
      input: problem?.exampleInput || "nums = [2,7,11,15], target = 9",
      output: problem?.exampleOutput || "[0,1]",
    },
    {
      id: 2,
      name: "Case 2",
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
  ];

  // Competitors Mock Data
  const competitors = [
    {
      name: "@byte_ninja",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDREoqrC7eH6Ibu9CccJOe5G-nZOsslHLI4vO51aKpm2S9o3e2QA2FEn0WxItS8P99B5FKCmb92iTzONXPV7xzIm4BWngXyL1Z1UXDN7M883UNt1mtj0gtqGuZ3P3PlvXot7uZghJBnqATLuHufKJxiytcLyelhRIFqHz82jBZDBI05L_6cnQnqPrCJmZtsYZK5Swqcory3MzPE197ZOyKd129U2415PuFpDXeSYF9a199v0YyKt_MFzAiei_N_IN8umulRAaER_-9E",
      solved: "3/5",
    },
    {
      name: "@code_weaver",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsN6n9jHFGjkf4syKNtmpLgsemo9EmxgvpJWaAUVuULSOPpPGWNdeGOmzFTKEGWzKymL1mbw11v5TbfzqYajanhcu9TiBfLFFfCucA3ICKR0UtEbgHQtE9yvB_GsqgeZnDFy9nvXX2JC0gmtETa2xJU02wc9EJCXiNP25C9lngs2ZMSEAZduZTleoAZ6Qwf7BrafFxdiVwcRFGf_wZTUuW_eAvdiQ6vZyEB_q6sFVFEgrLTJu6kB3IY-n128tmPzJnxafspv61MS8_",
      solved: "2/5",
    },
    {
      name: "@algo_king",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvMd0XEIE-jIzQRYC2fKcAvJFx5GvWJzgvTaOrMsugOSZEuhAApXS7fr19y5xZ7t-lQlkNvI11wGKk6FZP7gu7EJU7j-e29f7kMZ24z07Wr-nmXGiuKM2VlpiwrI4NPAYalqe0-0Y7qcERzLgng5a9mTwqmiNWj2fzkxOsH7ugCojhyYNmDZe6CO8yet1WeZIyUqMLaJXlWvDEwumDT31Gip2tAaMN-dIg68K9IHTw_aLGMIbJLwf_86Sp2QNP0Gi_WNCEPXvUCegk",
      solved: "4/5",
    }
  ];

  const [runningCode, setRunningCode] = useState(false);
  const [submittingCode, setSubmittingCode] = useState(false);

  const handleRunCode = async () => {
    setRunningCode(true);
    try {
      const response = await axios.post(`/api/problems/${problemId}/run`, {
        language: selectedLanguage,
        code: editorCode
      });
      alert(`Code Run Completed!\n\nStatus: ${response.data.status || "Success"}\nOutput: ${response.data.output || ""}`);
    } catch (err) {
      console.error("Run code error:", err);
      alert("Failed to run code on server. Please check connection.");
    } finally {
      setRunningCode(false);
    }
  };

  const handleSubmit = async () => {
    setSubmittingCode(true);
    try {
      const response = await axios.post(`/api/problems/${problemId}/submit`, {
        language: selectedLanguage,
        code: editorCode
      });
      alert(`Submission Received!\n\nStatus: ${response.data.status || "Accepted"}\nMessage: ${response.data.message || ""}`);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit code to server. Please check connection.");
    } finally {
      setSubmittingCode(false);
    }
  };

  const handleMCQSubmit = async () => {
    if (!selectedOption) return;
    setSubmittingCode(true);
    try {
      await axios.post(`/api/problems/${problemId}/submit-mcq`, {
        answer: selectedOption
      });
      setIsAnswerSubmitted(true);
    } catch (err) {
      console.error("MCQ Submission error:", err);
      setIsAnswerSubmitted(true); // Fallback to client logic if backend post fails
    } finally {
      setSubmittingCode(false);
    }
  };

  // Render Coding Layout
  const renderCodingWorkspace = () => {
    return (
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-gutter gap-gutter h-screen bg-surface-container-low/30 text-left grid-bg">
        
        {/* Left Pane: Problem Description & Competitors list */}
        <div className="w-full md:w-1/3 flex flex-col h-full shrink-0">
          <div className="glass-panel active-glow rounded-xl p-6 flex-1 overflow-y-auto relative border-t-4 border-t-secondary-container flex flex-col">
            
            {/* Meta Tags */}
            <div className="flex items-center justify-between mb-4 select-none">
              <span className="bg-primary-container text-on-primary-container font-label-caps text-[10px] font-bold px-3 py-1 rounded shadow-sm">
                {problem.difficulty}
              </span>
              <div className="flex gap-3 text-on-surface-variant">
                <button className="hover:text-primary transition-colors flex items-center justify-center focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                </button>
                <button className="hover:text-primary transition-colors flex items-center justify-center focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">thumb_down</span>
                </button>
                <button className="hover:text-primary transition-colors flex items-center justify-center focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-headline-lg-mobile text-xl md:text-2xl font-bold mb-4 text-on-surface select-none">
              {problem.title}
            </h1>

            {/* Description Text */}
            <div className="prose prose-sm text-on-surface-variant/90 max-w-none flex-grow leading-relaxed font-body-md text-sm whitespace-pre-line">
              <p className="mb-4">{problem.desc}</p>
              
              <h3 className="font-bold text-on-surface text-base mt-6 mb-2 select-none">Example 1:</h3>
              <div className="bg-surface-container-low p-4 rounded border border-outline-variant font-code-sm text-xs text-on-surface mb-4 leading-normal select-all">
                <p><strong>Input:</strong> {problem.exampleInput}</p>
                <p className="mt-1"><strong>Output:</strong> {problem.exampleOutput}</p>
              </div>

              {problem.constraints && (
                <>
                  <h3 className="font-bold text-on-surface text-base mt-6 mb-2 select-none">Constraints:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs select-none mb-6">
                    {problem.constraints.map((c, i) => (
                      <li key={i}><code>{c}</code></li>
                    ))}
                  </ul>
                </>
              )}

              {/* View Other Participants (Left column progress board) */}
              <div className="border-t border-outline-variant/30 pt-5 mt-6 select-none">
                <h4 className="font-label-caps text-[10px] font-bold text-on-surface tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  CONTEST PARTICIPANTS (3 ACTIVE)
                </h4>
                <div className="flex flex-col gap-2.5">
                  {competitors.map((c, idx) => (
                    <div key={idx} className="bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img className="w-5.5 h-5.5 rounded-full overflow-hidden object-cover border border-outline-variant/30" src={c.avatar} alt={c.name} />
                        <span className="font-bold text-on-surface">{c.name}</span>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container font-code-sm text-[10px] font-bold px-2 py-0.5 rounded">
                        Solved: {c.solved}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Pane: Code Editor + Test Cases */}
        <div className="flex-grow flex flex-col gap-gutter h-full overflow-hidden">
          
          {/* Mock Code Editor Frame */}
          <div className="flex-1 bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col active-glow min-h-0">
            
            {/* Editor Header toolbar */}
            <div className="h-12 border-b border-outline-variant bg-surface-container-low flex items-center px-4 justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary font-bold">code</span>
                <span className="font-bold text-xs text-on-surface">solution.py</span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Active Competitors Avatar Stack in editor toolbar */}
                <div className="flex -space-x-2.5 overflow-hidden mr-2" title="Active Competitors in this Room">
                  {competitors.map((c, idx) => (
                    <img 
                      key={idx} 
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-surface object-cover hover:scale-115 transition-transform cursor-pointer" 
                      src={c.avatar} 
                      alt={c.name}
                      title={c.name}
                    />
                  ))}
                </div>

                {/* Made language selection option larger and styled as dropdown */}
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-surface border border-outline-variant px-4 py-2 rounded-lg text-xs font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
                >
                  <option>Python 3</option>
                  <option>JavaScript</option>
                  <option>C++</option>
                  <option>Java</option>
                </select>

                <button className="bg-surface border border-outline-variant p-1 rounded hover:bg-surface-container transition-colors flex items-center justify-center focus:outline-none">
                  <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Code Textarea with line numbers */}
            <div className="flex-1 flex overflow-hidden font-code-sm text-xs bg-surface-container-lowest relative text-left min-h-0">
              {/* Lines Gutter */}
              <div className="w-12 bg-surface-container/60 border-r border-outline-variant select-none flex flex-col items-center py-4 text-on-surface-variant/40 leading-6 text-right pr-2 shrink-0">
                {Array.from({ length: 28 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              
              {/* Controlled Textarea */}
              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                spellCheck="false"
                className="flex-1 p-4 bg-transparent outline-none border-none resize-none font-code-sm text-xs text-on-surface leading-6 h-full focus:ring-0 overflow-y-auto"
              />
            </div>
          </div>

          {/* Test Cases Panel */}
          <div className="h-[200px] bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col shrink-0">
            
            {/* Test Case Header */}
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low shrink-0 select-none">
              <h3 className="font-headline-lg-mobile text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">bug_report</span>
                Test Cases
              </h3>
              <button 
                onClick={() => alert("Creating a custom test case...")}
                className="text-secondary hover:text-secondary/80 transition-colors flex items-center gap-1 font-label-caps text-[10px] font-bold focus:outline-none"
              >
                <span className="material-symbols-outlined text-[14px]">add_circle</span>
                Add Case
              </button>
            </div>

            {/* Cases Content */}
            <div className="flex-grow p-4 overflow-y-auto flex gap-4 items-start select-none">
              {/* Tab Selector */}
              <div className="flex flex-col gap-2 w-32 shrink-0">
                {testCases.map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => setActiveTestCase(tc.id)}
                    className={`text-left p-2.5 rounded border transition-colors flex flex-col text-xs focus:outline-none ${
                      activeTestCase === tc.id
                        ? "bg-surface-container-low border-secondary border-l-4 border-l-secondary text-secondary font-bold"
                        : "bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    {tc.name}
                  </button>
                ))}
              </div>

              {/* Selected Case Content */}
              <div className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-normal">
                <div>
                  <span className="font-code-sm text-[10px] text-on-surface-variant font-bold block mb-1">Input:</span>
                  <div className="font-code-sm bg-surface-container-lowest p-2 rounded text-on-surface font-semibold border border-outline-variant/30 break-all select-all">
                    {testCases.find((tc) => tc.id === activeTestCase)?.input}
                  </div>
                </div>
                <div>
                  <span className="font-code-sm text-[10px] text-on-surface-variant font-bold block mb-1">Expected Output:</span>
                  <div className="font-code-sm bg-surface-container-lowest p-2 rounded text-on-surface font-semibold border border-outline-variant/30 break-all select-all">
                    {testCases.find((tc) => tc.id === activeTestCase)?.output}
                  </div>
                </div>
              </div>

          </div>
        </div>

        {/* Bottom Action Controls */}
        <div className="h-16 border-t border-outline-variant bg-surface glass-panel rounded-xl flex items-center justify-between px-6 shrink-0 shadow-sm z-10 transition-colors duration-200">
          
          {/* Flashing Countdown Contest Timer */}
          <div className="flex items-center gap-3 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-error">schedule</span>
              <span className="text-xs text-error font-extrabold font-code-sm tracking-wider">
                CONTEST TIMER: {formatTimer(timeLeft)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRunCode}
              disabled={runningCode || submittingCode}
              className="px-6 py-2.5 bg-surface border border-outline-variant rounded font-bold text-xs hover:bg-surface-container text-on-surface transition-all active:scale-[0.98] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {runningCode ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={runningCode || submittingCode}
              className="px-7 py-2.5 bg-primary-container text-on-primary-container rounded font-bold text-xs hover:bg-primary hover:text-on-primary transition-all glow-active active:scale-[0.98] focus:outline-none flex items-center gap-1.5 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px] animate-spin-slow" style={{ fontVariationSettings: "'FILL' 1" }}>
                {submittingCode ? "sync" : "play_arrow"}
              </span>
              {submittingCode ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

      </div>

    </div>
    );
  };

  // Render MCQ Layout
  const renderMCQWorkspace = () => {
    const isCorrect = selectedOption === problem.correctAnswer;

    return (
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-gutter gap-gutter h-screen bg-surface-container-low/30 text-left grid-bg">
        
        {/* Left Column: Question Details */}
        <div className="w-full md:w-1/2 flex flex-col h-full shrink-0">
          <div className="glass-panel active-glow rounded-xl p-8 flex-1 overflow-y-auto border-t-4 border-t-secondary-container flex flex-col justify-between">
            <div>
              {/* Meta information badges */}
              <div className="flex items-center justify-between mb-6 select-none">
                <div className="flex gap-2">
                  <span className="bg-primary-container text-on-primary-container font-label-caps text-[9px] font-bold px-3 py-1 rounded">
                    {problem.category}
                  </span>
                  <span className="bg-surface-container-high text-on-surface font-label-caps text-[9px] font-bold px-3 py-1 rounded border border-outline-variant/30">
                    {problem.subCategory}
                  </span>
                </div>
                <span className="bg-surface-container-low border border-outline-variant px-3 py-1 rounded-full font-label-caps text-[9px] font-bold text-on-surface-variant">
                  DIFFICULTY: {problem.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Question Title */}
              <h1 className="font-display-lg text-2xl font-bold text-on-surface mb-6 select-none">
                {problem.title}
              </h1>

              {/* Question Statement */}
              <div className="font-body-md text-base text-on-surface-variant/90 leading-relaxed whitespace-pre-wrap select-text mb-8 p-4 bg-surface-container-low border border-outline-variant/40 rounded-lg">
                {problem.question}
              </div>
            </div>

            {/* Hint Box (Toggled) */}
            {showHint && (
              <div className="p-4 bg-primary-container/10 border border-primary-container rounded-lg flex gap-3 text-xs leading-relaxed text-on-primary-container animate-fade-in mb-4">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                  lightbulb
                </span>
                <div>
                  <span className="font-bold block mb-1">Concept Hint:</span>
                  Review the core definition of {problem.subCategory}. Look for dependencies or logical relationships between the variables mentioned.
                </div>
              </div>
            )}

            {/* Back button */}
            <div className="mt-auto pt-4 select-none">
              <Link to="/problems" className="inline-flex items-center gap-1.5 text-xs font-label-caps font-bold text-secondary hover:underline">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Library
              </Link>
            </div>

          </div>
        </div>

        {/* Right Column: Options & Explanation */}
        <div className="flex-1 flex flex-col gap-gutter h-full overflow-hidden">
          
          {/* Options Panel */}
          <div className="flex-1 bg-surface border border-outline-variant rounded-xl p-8 flex flex-col justify-between overflow-y-auto active-glow min-h-0">
            <div>
              <h3 className="font-label-caps text-xs font-bold text-on-surface tracking-wider mb-6 select-none">
                SELECT THE CORRECT ANSWER
              </h3>

              {/* Options Grid */}
              <div className="flex flex-col gap-3.5 select-none">
                {problem.options.map((option) => {
                  const isSelected = selectedOption === option.key;
                  let optionStyle = "border-outline-variant hover:border-secondary hover:bg-surface-container-low/40";
                  
                  if (isSelected) {
                    optionStyle = "border-secondary bg-secondary-container/10 ring-1 ring-secondary";
                  }
                  
                  // Color highlights after submission
                  if (isAnswerSubmitted) {
                    if (option.key === problem.correctAnswer) {
                      optionStyle = "border-tertiary-container bg-tertiary-container/10 text-on-tertiary-container ring-1 ring-tertiary-container";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-error bg-error/5 text-on-error ring-1 ring-error";
                    }
                  }

                  return (
                    <button
                      key={option.key}
                      disabled={isAnswerSubmitted}
                      onClick={() => setSelectedOption(option.key)}
                      className={`w-full p-4 border rounded-xl flex items-center gap-4 text-left transition-all focus:outline-none disabled:cursor-not-allowed ${optionStyle}`}
                    >
                      {/* Option Key indicator */}
                      <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-code-sm text-xs font-bold shrink-0 ${
                        isSelected 
                          ? "bg-secondary border-secondary text-on-secondary" 
                          : "border-outline-variant text-on-surface-variant bg-surface-container"
                      }`}>
                        {option.key}
                      </span>
                      <span className="font-body-md text-sm text-on-surface font-semibold">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Feedbacks Banners */}
            {isAnswerSubmitted && (
              <div className={`p-4 rounded-xl border flex gap-3.5 mt-6 animate-fade-in ${
                isCorrect 
                  ? "bg-tertiary-container/10 border-tertiary-container/30 text-on-tertiary-container" 
                  : "bg-error-container/10 border-error/20 text-on-error-container"
              }`}>
                <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isCorrect ? "check_circle" : "cancel"}
                </span>
                <div>
                  <p className="font-bold text-sm">
                    {isCorrect ? "Correct Answer! Well done." : "Incorrect Answer. Try again!"}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {isCorrect 
                      ? "Your selection matches the correct solution parameters perfectly." 
                      : "Please review the detailed solution breakdown below to understand the concept."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Explanation Panel */}
          {isAnswerSubmitted && (
            <div className="h-[220px] bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col shrink-0 animate-fade-in">
              <div className="p-4 border-b border-outline-variant bg-surface-container-low select-none shrink-0 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary font-bold text-[18px]">menu_book</span>
                <h3 className="font-headline-lg-mobile text-xs font-bold text-on-surface">Detailed Explanation</h3>
              </div>
              <div className="flex-1 p-5 overflow-y-auto text-xs leading-relaxed font-body-md text-on-surface-variant/90">
                <p className="font-semibold text-on-surface mb-2">Solution Logic:</p>
                <div className="bg-surface-container-low p-3.5 rounded border border-outline-variant/40 font-code-sm text-xs leading-relaxed text-on-surface select-text whitespace-pre-wrap">
                  {problem.explanation}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Actions for MCQ */}
          <div className="h-16 border-t border-outline-variant bg-surface glass-panel rounded-xl flex items-center justify-between px-6 shrink-0 shadow-sm z-10 transition-colors duration-200">
            
            {/* Flashing Countdown Contest Timer in MCQ Bottom Bar */}
            <div className="flex items-center gap-3 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-error">schedule</span>
                <span className="text-xs text-error font-extrabold font-code-sm tracking-wider">
                  CONTEST TIMER: {formatTimer(timeLeft)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                disabled={isAnswerSubmitted}
                onClick={() => setShowHint(!showHint)}
                className="px-5 py-2.5 bg-surface border border-outline-variant rounded font-bold text-xs hover:bg-surface-container text-on-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              {isAnswerSubmitted && (
                <button
                  onClick={() => {
                    setIsAnswerSubmitted(false);
                    setSelectedOption("");
                  }}
                  className="px-5 py-2.5 bg-surface border border-outline-variant rounded font-bold text-xs hover:bg-surface-container text-on-surface transition-all focus:outline-none"
                >
                  Try Again
                </button>
              )}
              <button
                disabled={!selectedOption || isAnswerSubmitted || submittingCode}
                onClick={handleMCQSubmit}
                className="px-7 py-2.5 bg-primary-container text-on-primary-container rounded font-bold text-xs hover:bg-primary hover:text-on-primary transition-all glow-active active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px] animate-spin-slow" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {submittingCode ? "sync" : "verified"}
                </span>
                {submittingCode ? "Submitting..." : "Submit Answer"}
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-surface-container-low/30 text-left grid-bg">
        <div className="text-center select-none flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-secondary text-[48px] mb-3 animate-spin">
            sync
          </span>
          <p className="font-body-md text-base font-semibold text-on-surface-variant animate-pulse">
            Loading problem workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex-grow flex items-center justify-center h-screen bg-surface-container-low/30 text-left grid-bg">
        <div className="text-center select-none flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-error text-[48px] mb-3">
            error
          </span>
          <p className="font-body-md text-base font-semibold text-on-surface-variant">
            Problem not found.
          </p>
          <Link to="/problems" className="mt-4 text-xs font-label-caps font-bold text-secondary hover:underline">
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return problem.type === "coding" ? renderCodingWorkspace() : renderMCQWorkspace();
}
