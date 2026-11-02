import React, { useState } from "react";

export default function ContributionStudio() {
  const [activeStudioTab, setActiveStudioTab] = useState("problem"); // "problem", "testcase", "report"

  // 1. Contribute Problem States
  const [problemTitle, setProblemTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [category, setCategory] = useState("Algorithms");
  const [problemDesc, setProblemDesc] = useState("");
  const [testCases, setTestCases] = useState([
    { id: 1, isExample: true, input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
    { id: 2, isExample: false, input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ]);
  const [languages, setLanguages] = useState(["Python 3", "JavaScript", "C++", "Java"]);

  // 2. Contribute Testcase States
  const [selectedProblemForTC, setSelectedProblemForTC] = useState("reverse-k-group");
  const [tcMotivation, setTcMotivation] = useState("");
  const [contributedTCs, setContributedTCs] = useState([
    { id: 1, input: "", output: "" }
  ]);

  // 3. Report Issue States
  const [selectedProblemForReport, setSelectedProblemForReport] = useState("reverse-k-group");
  const [issueType, setIssueType] = useState("Wrong Testcase");
  const [reportDesc, setReportDesc] = useState("");
  const [codeEvidence, setCodeEvidence] = useState("");

  const handleAddCase = () => {
    const nextId = testCases.length + 1;
    setTestCases((prev) => [
      ...prev,
      { id: nextId, isExample: false, input: "", output: "" },
    ]);
  };

  const handleDeleteCase = (id) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  const handleAddContributedTC = () => {
    const nextId = contributedTCs.length + 1;
    setContributedTCs((prev) => [
      ...prev,
      { id: nextId, input: "", output: "" }
    ]);
  };

  const handleDeleteContributedTC = (id) => {
    setContributedTCs((prev) => prev.filter((tc) => tc.id !== id));
  };

  const handlePublishProblem = () => {
    if (!problemTitle.trim()) {
      alert("Please enter a Problem Title.");
      return;
    }
    alert(`Publishing Problem: "${problemTitle}" to the Brainqueue platform!`);
  };

  const handleSubmitTestcases = () => {
    if (!tcMotivation.trim()) {
      alert("Please provide the motivation/reasoning for these test cases.");
      return;
    }
    alert(`Submitting ${contributedTCs.length} test cases for review on problem: "${selectedProblemForTC}"!`);
  };

  const handleSubmitReport = () => {
    if (!reportDesc.trim()) {
      alert("Please write a detailed explanation of the issue.");
      return;
    }
    alert(`Issue Report Submitted!
- Problem: ${selectedProblemForReport}
- Category: ${issueType}
- Description: ${reportDesc}`);
  };

  return (
    <main className="flex-1 p-gutter md:p-margin-edge w-full text-left grid-bg h-screen overflow-y-auto">
      
      {/* Page Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-stack-md select-none">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-code-sm text-xs text-on-surface-variant font-bold">
              v1.2.0
            </span>
          </div>
          <h1 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tighter">
            {activeStudioTab === "problem" && "Contribute Problem"}
            {activeStudioTab === "testcase" && "Contribute Testcases"}
            {activeStudioTab === "report" && "Report Discrepancy"}
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
            {activeStudioTab === "problem" && "Design and publish algorithmic challenges for the community. Ensure clear statements and robust test cases."}
            {activeStudioTab === "testcase" && "Suggest additional edge cases or test suites to refine standard problem verification logic."}
            {activeStudioTab === "report" && "Flag incorrect answers, broken test suites, or formatting bugs in standard problems to help improve content."}
          </p>
        </div>

        {/* Dynamic Publish Actions */}
        <div className="flex gap-4 shrink-0">
          {activeStudioTab === "problem" && (
            <>
              <button
                onClick={() => alert("Draft saved locally.")}
                className="px-6 py-3 border border-outline text-on-surface font-label-caps text-xs tracking-wider rounded font-bold hover:bg-surface-container-high transition-colors focus:outline-none"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublishProblem}
                className="px-6 py-3 bg-secondary text-on-secondary font-label-caps text-xs tracking-wider rounded font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:translate-y-0.5 duration-200 focus:outline-none"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                Publish
              </button>
            </>
          )}
          {activeStudioTab === "testcase" && (
            <button
              onClick={handleSubmitTestcases}
              className="px-6 py-3 bg-secondary text-on-secondary font-label-caps text-xs tracking-wider rounded font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:translate-y-0.5 duration-200 focus:outline-none"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Submit Testcases
            </button>
          )}
          {activeStudioTab === "report" && (
            <button
              onClick={handleSubmitReport}
              className="px-6 py-3 bg-error text-on-error font-label-caps text-xs tracking-wider rounded font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:translate-y-0.5 duration-200 focus:outline-none"
            >
              <span className="material-symbols-outlined text-[18px]">report</span>
              Submit Report
            </button>
          )}
        </div>
      </header>

      {/* Main Studio Navigation Tabs */}
      <div className="flex border-b border-outline-variant/60 mb-6 bg-surface-container-low p-1.5 rounded-lg select-none gap-2">
        <button
          type="button"
          onClick={() => setActiveStudioTab("problem")}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-lg text-xs font-label-caps font-bold tracking-wider transition-all focus:outline-none flex items-center justify-center gap-2 ${
            activeStudioTab === "problem"
              ? "bg-secondary text-on-secondary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-sm">edit_note</span>
          Contribute Problem
        </button>
        <button
          type="button"
          onClick={() => setActiveStudioTab("testcase")}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-lg text-xs font-label-caps font-bold tracking-wider transition-all focus:outline-none flex items-center justify-center gap-2 ${
            activeStudioTab === "testcase"
              ? "bg-secondary text-on-secondary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-sm">rule</span>
          Contribute Testcases
        </button>
        <button
          type="button"
          onClick={() => setActiveStudioTab("report")}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-lg text-xs font-label-caps font-bold tracking-wider transition-all focus:outline-none flex items-center justify-center gap-2 ${
            activeStudioTab === "report"
              ? "bg-secondary text-on-secondary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-sm">warning</span>
          Report wrong testcase/answer
        </button>
      </div>

      {/* Dynamic Content Views */}
      
      {/* 1. CONTRIBUTE PROBLEM VIEW */}
      {activeStudioTab === "problem" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter animate-fade-in">
          
          {/* Left Column: Metadata & Description Editor (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            
            {/* Metadata Card */}
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden relative shadow-sm">
              <div className="h-1 w-full bg-secondary"></div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Title input */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-label-caps text-xs font-bold text-on-surface tracking-wider" htmlFor="problem-title">
                      Problem Title
                    </label>
                    <input
                      value={problemTitle}
                      onChange={(e) => setProblemTitle(e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant rounded p-3 font-body-md text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all text-on-surface"
                      id="problem-title"
                      placeholder="e.g., Reverse Linked List II"
                      type="text"
                    />
                  </div>

                  {/* Difficulty Switches */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-xs font-bold text-on-surface tracking-wider">
                      Difficulty
                    </label>
                    <div className="flex gap-3">
                      {["Easy", "Medium", "Hard"].map((lvl) => {
                        const active = difficulty === lvl;
                        let activeColor = "bg-secondary text-on-secondary border-secondary";
                        
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setDifficulty(lvl)}
                            className={`flex-1 text-center py-2.5 border rounded font-label-caps text-[10px] font-bold tracking-wider transition-all focus:outline-none ${
                              active
                                ? activeColor
                                : "border-outline-variant text-on-surface-variant hover:bg-surface-container"
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-xs font-bold text-on-surface tracking-wider" htmlFor="category">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant rounded p-3 font-body-md text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all cursor-pointer text-on-surface"
                      id="category"
                    >
                      <option>Data Structures</option>
                      <option>Algorithms</option>
                      <option>Dynamic Programming</option>
                      <option>Graph Theory</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>

            {/* Markdown Editor */}
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col h-[400px] shadow-sm">
              <div className="h-1 w-full bg-secondary-container"></div>
              
              {/* Toolbar */}
              <div className="flex items-center gap-2 p-3 border-b border-outline-variant bg-surface-container-low select-none">
                <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded transition-colors focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">format_bold</span>
                </button>
                <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded transition-colors focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">format_italic</span>
                </button>
                <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded transition-colors focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">code</span>
                </button>
                <div className="w-px h-6 bg-outline-variant/60 mx-1"></div>
                <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded transition-colors focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">link</span>
                </button>
                <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded transition-colors focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">image</span>
                </button>
              </div>

              {/* Editor Area */}
              <div className="flex-grow">
                <textarea
                  value={problemDesc}
                  onChange={(e) => setProblemDesc(e.target.value)}
                  className="w-full h-full p-6 resize-none bg-surface border-none focus:ring-0 focus:outline-none font-body-md text-sm text-on-surface leading-relaxed placeholder:text-on-surface-variant/40"
                  placeholder={`Write problem description using Markdown formatting...`}
                />
              </div>
            </div>

          </div>

          {/* Right Column: Testcase builder & Allowed Languages (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            
            {/* Test Case Builder */}
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full min-h-[350px] shadow-sm">
              <div className="h-1 w-full bg-secondary-container"></div>
              
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low select-none">
                <h3 className="font-headline-lg-mobile text-sm font-bold text-on-surface">Test Cases</h3>
                <button
                  type="button"
                  onClick={handleAddCase}
                  className="text-secondary hover:text-secondary/80 transition-colors flex items-center gap-1 font-label-caps text-[10px] font-bold focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  Add Case
                </button>
              </div>

              <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
                {testCases.map((tc) => (
                  <div key={tc.id} className="border border-outline-variant rounded-lg p-3 relative bg-surface-container-lowest shadow-sm">
                    <div className="absolute top-2.5 right-2.5">
                      <button onClick={() => handleDeleteCase(tc.id)} className="text-on-surface-variant hover:text-error transition-colors focus:outline-none">
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <div className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider mb-2.5">
                      CASE {tc.id} {tc.isExample ? "(Example)" : ""}
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div>
                        <span className="font-code-sm text-[9px] text-on-surface-variant font-bold block mb-1">Input:</span>
                        <input
                          value={tc.input}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTestCases(prev => prev.map(c => c.id === tc.id ? { ...c, input: val } : c));
                          }}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
                        />
                      </div>
                      <div>
                        <span className="font-code-sm text-[9px] text-on-surface-variant font-bold block mb-1">Output:</span>
                        <input
                          value={tc.output}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTestCases(prev => prev.map(c => c.id === tc.id ? { ...c, output: val } : c));
                          }}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Allowed Languages */}
            <div className="bg-surface rounded-xl border border-outline-variant p-4 shadow-sm text-left">
              <h3 className="font-label-caps text-xs font-bold text-on-surface tracking-wider mb-3">Allowed Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span key={lang} className="bg-secondary-container text-on-secondary-container font-code-sm text-[10px] font-bold px-3 py-1 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. CONTRIBUTE TESTCASES VIEW */}
      {activeStudioTab === "testcase" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter animate-fade-in">
          
          {/* Left Column: Problem Selector & Reasoning (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-gutter">
            <div className="bg-surface rounded-xl border border-outline-variant p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
              
              <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface mb-5">
                Testcase Source & Motivation
              </h3>

              <div className="flex flex-col gap-5">
                {/* Problem Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider" htmlFor="tc-problem">
                    SELECT PROBLEM TO REFINE
                  </label>
                  <select
                    value={selectedProblemForTC}
                    onChange={(e) => setSelectedProblemForTC(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs font-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none cursor-pointer"
                    id="tc-problem"
                  >
                    <option value="reverse-k-group">124. Reverse Nodes in k-Group (Hard)</option>
                    <option value="two-sum">1. Two Sum Challenge (Easy)</option>
                    <option value="longest-common-subsequence">1143. Longest Common Subsequence (Medium)</option>
                  </select>
                </div>

                {/* Motivation/Reasoning */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider" htmlFor="tc-reason">
                    WHY SHOULD THESE TESTCASES BE ADDED?
                  </label>
                  <textarea
                    value={tcMotivation}
                    onChange={(e) => setTcMotivation(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs font-body-md text-on-surface h-36 focus:border-secondary focus:outline-none resize-none leading-relaxed placeholder:text-on-surface-variant/40"
                    id="tc-reason"
                    placeholder="Describe what edge cases are validated by these test cases (e.g. empty lists, overflow indices, negative inputs, large constraints etc.)."
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Testcases list (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-gutter">
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full min-h-[350px] shadow-sm">
              <div className="h-1 w-full bg-secondary-container"></div>
              
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low select-none">
                <h3 className="font-headline-lg-mobile text-sm font-bold text-on-surface">Suggested Testcases</h3>
                <button
                  type="button"
                  onClick={handleAddContributedTC}
                  className="text-secondary hover:text-secondary/80 transition-colors flex items-center gap-1 font-label-caps text-[10px] font-bold focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  Add Case
                </button>
              </div>

              <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
                {contributedTCs.map((tc) => (
                  <div key={tc.id} className="border border-outline-variant rounded-lg p-3.5 relative bg-surface-container-lowest shadow-sm">
                    <div className="absolute top-2.5 right-2.5">
                      <button onClick={() => handleDeleteContributedTC(tc.id)} className="text-on-surface-variant hover:text-error transition-colors focus:outline-none">
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <div className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider mb-2.5">
                      SUGGESTED CASE #{tc.id}
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div>
                        <span className="font-code-sm text-[9px] text-on-surface-variant font-bold block mb-1">Input:</span>
                        <input
                          value={tc.input}
                          onChange={(e) => {
                            const val = e.target.value;
                            setContributedTCs(prev => prev.map(c => c.id === tc.id ? { ...c, input: val } : c));
                          }}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
                          placeholder="e.g. head = [1,2], k = 3"
                        />
                      </div>
                      <div>
                        <span className="font-code-sm text-[9px] text-on-surface-variant font-bold block mb-1">Expected Output:</span>
                        <input
                          value={tc.output}
                          onChange={(e) => {
                            const val = e.target.value;
                            setContributedTCs(prev => prev.map(c => c.id === tc.id ? { ...c, output: val } : c));
                          }}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
                          placeholder="[1,2]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 3. REPORT DISCREPANCY VIEW */}
      {activeStudioTab === "report" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter animate-fade-in">
          
          {/* Left Column: Report Details (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-gutter">
            <div className="bg-surface rounded-xl border border-outline-variant p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
              
              <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface mb-5">
                Ticket Details
              </h3>

              <div className="flex flex-col gap-4">
                {/* Select Problem */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider" htmlFor="report-problem">
                    SELECT PROBLEM WITH DISCREPANCY
                  </label>
                  <select
                    value={selectedProblemForReport}
                    onChange={(e) => setSelectedProblemForReport(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs font-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none cursor-pointer"
                    id="report-problem"
                  >
                    <option value="reverse-k-group">124. Reverse Nodes in k-Group (Hard)</option>
                    <option value="two-sum">1. Two Sum Challenge (Easy)</option>
                    <option value="longest-common-subsequence">1143. Longest Common Subsequence (Medium)</option>
                    <option value="work-and-time">Quantitative: Work & Time Efficiency (MCQ)</option>
                    <option value="process-sync">OS: Process Synchronization (MCQ)</option>
                  </select>
                </div>

                {/* Discrepancy Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider" htmlFor="report-type">
                    ISSUE CATEGORY
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs font-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none cursor-pointer"
                    id="report-type"
                  >
                    <option>Wrong Testcase</option>
                    <option>Incorrect Explanation/Answer</option>
                    <option>Ambiguous Problem Description</option>
                    <option>Strict Time/Memory Limits</option>
                  </select>
                </div>

                {/* Explanatory Details */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider" htmlFor="report-desc">
                    EXPLAIN THE ERROR IN DETAIL
                  </label>
                  <textarea
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs font-body-md text-on-surface h-36 focus:border-secondary focus:outline-none resize-none leading-relaxed placeholder:text-on-surface-variant/40"
                    id="report-desc"
                    placeholder="Provide details about the incorrect test case input, the expected result vs the actual evaluation result, or standard logic explanations."
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Code Evidence / Logs (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-gutter">
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full min-h-[350px] shadow-sm">
              <div className="h-1 w-full bg-error-container"></div>
              
              <div className="p-4 border-b border-outline-variant bg-surface-container-low select-none shrink-0 flex items-center justify-between">
                <h3 className="font-headline-lg-mobile text-sm font-bold text-on-surface">Supporting Evidence</h3>
                <span className="font-code-sm text-[9px] text-on-surface-variant font-bold bg-surface px-2 py-0.5 border border-outline-variant rounded">
                  LOGS / SCRIPTS
                </span>
              </div>

              <div className="flex-1 p-5 flex flex-col gap-3">
                <label className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider select-none">
                  PASTE PROOF OR REPRODUCING CODE
                </label>
                <textarea
                  value={codeEvidence}
                  onChange={(e) => setCodeEvidence(e.target.value)}
                  className="flex-1 w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg font-code-sm text-xs text-on-surface leading-normal outline-none focus:border-secondary resize-none placeholder:text-on-surface-variant/40"
                  placeholder={`def test_case_failure():
    # Paste code snippet that reproduces the test suite error
    pass`}
                />
              </div>
            </div>
          </div>

        </div>
      )}

    </main>
  );
}
