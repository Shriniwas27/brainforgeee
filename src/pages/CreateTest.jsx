import React, { useState } from "react";

export default function CreateTest() {
  const [activeTab, setActiveTab] = useState("mcq"); // "mcq" or "coding"
  const [testName, setTestName] = useState("");
  const [duration, setDuration] = useState("60");
  const [lockBrowser, setLockBrowser] = useState(true);

  // Scheduling states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Student Invite states
  const [studentEmails, setStudentEmails] = useState("");
  const [inviteList, setInviteList] = useState([]);

  // QR Code state
  const [showQRCode, setShowQRCode] = useState(false);

  // File Upload states
  const [excelFile, setExcelFile] = useState(null);
  const [codingDescFile, setCodingDescFile] = useState(null);
  const [codingTestcaseFile, setCodingTestcaseFile] = useState(null);

  const handleSendInvites = (e) => {
    e.preventDefault();
    if (!studentEmails.trim()) {
      alert("Please enter student emails.");
      return;
    }
    const emails = studentEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "");
    
    setInviteList((prev) => [...new Set([...prev, ...emails])]);
    setStudentEmails("");
    alert(`Invitations queued for ${emails.length} students!`);
  };

  const handleCreateTest = () => {
    if (!testName.trim()) {
      alert("Please enter an Assessment Name.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Please configure the Start and End timings for the test.");
      return;
    }
    alert(`Assessment Created Successfully!
- Title: ${testName}
- Duration: ${duration} minutes
- Start Time: ${startDate}
- End Time: ${endDate}
- Browser Lock Mode: ${lockBrowser ? "ENABLED (Browser Lockdown)" : "DISABLED"}
- Type: ${activeTab === "mcq" ? "MCQ (via Excel Upload)" : "Coding Challenge"}
- Invited Candidates: ${inviteList.length} students`);
  };

  // SVG QR Code Generator
  const QRCodeSVG = () => (
    <div className="flex flex-col items-center gap-3 p-4 bg-surface-container border border-outline-variant rounded-xl w-fit animate-fade-in mx-auto sm:mx-0">
      <svg className="w-32 h-32 border border-outline-variant p-2 bg-white rounded-lg shadow-sm" viewBox="0 0 100 100">
        {/* Corner 1 */}
        <rect x="5" y="5" width="25" height="25" fill="#332d2a" />
        <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
        <rect x="13" y="13" width="9" height="9" fill="#332d2a" />
        {/* Corner 2 */}
        <rect x="70" y="5" width="25" height="25" fill="#332d2a" />
        <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
        <rect x="78" y="13" width="9" height="9" fill="#332d2a" />
        {/* Corner 3 */}
        <rect x="5" y="70" width="25" height="25" fill="#332d2a" />
        <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
        <rect x="13" y="78" width="9" height="9" fill="#332d2a" />
        {/* Center / Layout Bits */}
        <rect x="75" y="75" width="10" height="10" fill="#332d2a" />
        <rect x="78" y="78" width="4" height="4" fill="#ffffff" />
        {/* Grid patterns */}
        <path d="M 35 5 h 5 v 5 h -5 z M 45 5 h 5 v 5 h -5 z M 55 5 h 10 v 5 h -10 z M 35 15 h 15 v 5 h -15 z M 55 15 h 5 v 10 h -5 z M 40 25 h 10 v 5 h -10 z M 50 25 h 5 v 5 h -5 z M 5 35 h 10 v 5 h -10 z M 20 35 h 15 v 5 h -15 z M 40 35 h 5 v 5 h -5 z M 50 35 h 10 v 5 h -10 z M 70 35 h 10 v 5 h -10 z M 85 35 h 10 v 5 h -10 z M 10 45 h 5 v 5 h -5 z M 25 45 h 10 v 5 h -10 z M 45 45 h 5 v 10 h -5 z M 60 45 h 15 v 5 h -15 z M 80 45 h 5 v 5 h -5 z M 90 45 h 5 v 5 h -5 z M 5 55 h 5 v 5 h -5 z M 15 55 h 10 v 5 h -10 z M 35 55 h 5 v 10 h -5 z M 50 55 h 5 v 5 h -5 z M 75 55 h 10 v 5 h -10 z M 90 55 h 5 v 5 h -5 z M 20 65 h 10 v 5 h -10 z M 45 65 h 5 v 5 h -5 z M 60 65 h 5 v 5 h -5 z M 70 65 h 5 v 5 h -5 z M 85 65 h 10 v 5 h -10 z M 35 75 h 10 v 5 h -10 z M 55 75 h 10 v 5 h -10 z M 35 85 h 5 v 10 h -5 z M 50 85 h 15 v 5 h -15 z M 70 85 h 5 v 5 h -5 z M 45 95 h 10 v 5 h -10 z M 60 95 h 5 v 5 h -5 z" fill="#332d2a" />
      </svg>
      <span className="font-code-sm text-[10px] text-on-surface-variant font-bold">SCAN TO ATTEMPT</span>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-screen overflow-y-auto">
      <main className="p-gutter md:p-margin-edge w-full text-left grid-bg flex-grow">
        
        {/* Page Header */}
        <header className="mb-stack-lg select-none">
          <h1 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
            Create <span className="text-gradient-accent">Assessment</span>
          </h1>
          <p className="text-on-surface-variant mt-2 font-body-md max-w-2xl leading-relaxed">
            Design structured examinations by importing question sheets or publishing coding specifications with browser anti-cheating lockdowns.
          </p>
        </header>

        {/* Main Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Side: General Settings, Timings & Lockdown (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            
            {/* General Config Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
              <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface mb-5 select-none">
                Assessment Settings
              </h3>

              <div className="flex flex-col gap-4">
                {/* Test Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider" htmlFor="test-title">
                    ASSESSMENT NAME
                  </label>
                  <input
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs font-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                    id="test-title"
                    placeholder="e.g. Summer Coding Internship 2026"
                    type="text"
                  />
                </div>

                {/* Timer Duration */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider" htmlFor="test-duration">
                    TIMER DURATION
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs font-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none cursor-pointer"
                    id="test-duration"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>

                {/* Scheduling Timings */}
                <div className="border-t border-outline-variant/30 pt-4 flex flex-col gap-3.5">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface tracking-wider select-none">
                    SCHEDULE TEST TIMINGS
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-code-sm text-[9px] text-on-surface-variant font-bold">START TIME</span>
                      <input
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary cursor-pointer"
                        type="datetime-local"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-code-sm text-[9px] text-on-surface-variant font-bold">END TIME</span>
                      <input
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary cursor-pointer"
                        type="datetime-local"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Lockdown Security Mode Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-error-container"></div>
              
              <div className="flex justify-between items-start gap-4 mb-4 select-none">
                <div>
                  <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-error text-[22px]">lock</span>
                    Browser Lockdown
                  </h3>
                  <p className="text-on-surface-variant text-[11px] mt-1 leading-relaxed">
                    Prevent candidates from cheating or navigating away during attempts.
                  </p>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setLockBrowser(!lockBrowser)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 focus:outline-none ${
                    lockBrowser ? "bg-error" : "bg-surface-container-high border border-outline-variant"
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    lockBrowser ? "translate-x-5 shadow" : "translate-x-0 border border-outline-variant/30"
                  }`} />
                </button>
              </div>

              {/* Warning Details */}
              {lockBrowser ? (
                <div className="p-4 bg-error-container/10 border border-error/20 rounded-lg flex gap-3 text-xs leading-relaxed text-on-error-container animate-fade-in select-none">
                  <span className="material-symbols-outlined text-error text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    warning
                  </span>
                  <div>
                    <span className="font-bold block mb-1">LOCKDOWN MODE ACTIVE</span>
                    This option creates a test that locks the browser window. Candidates will be forced into fullscreen mode. Escaping fullscreen, clicking other tabs, or pressing escape triggers an automatic termination.
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-lg flex gap-3 text-xs leading-relaxed text-on-surface-variant/80 animate-fade-in select-none">
                  <span className="material-symbols-outlined text-on-surface-variant/50 text-[20px] shrink-0">
                    info
                  </span>
                  <div>
                    <span className="font-bold block mb-1">Standard Mode</span>
                    Candidates can attempt the assessment without browser locking rules. Recommended only for mock assessments.
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Tabbed Question Uploader & Student Invites (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-gutter">
            
            {/* Uploader Card */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
              {/* Tabs Header */}
              <div className="flex border-b border-outline-variant bg-surface-container-low select-none">
                <button
                  type="button"
                  onClick={() => setActiveTab("mcq")}
                  className={`flex-1 py-3 text-xs font-label-caps font-bold tracking-wider border-b-2 transition-all focus:outline-none ${
                    activeTab === "mcq"
                      ? "border-secondary text-secondary bg-surface"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Upload MCQ Questions (Excel)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("coding")}
                  className={`flex-1 py-3 text-xs font-label-caps font-bold tracking-wider border-b-2 transition-all focus:outline-none ${
                    activeTab === "coding"
                      ? "border-secondary text-secondary bg-surface"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Upload Coding Question
                </button>
              </div>

              {/* MCQ Upload View */}
              {activeTab === "mcq" && (
                <div className="p-6 flex flex-col justify-between flex-grow animate-fade-in">
                  <div>
                    <h4 className="font-label-caps text-xs font-bold text-on-surface tracking-wider mb-4 select-none">
                      IMPORT MULTIPLE CHOICE SHEET
                    </h4>

                    {/* Drag and Drop Box */}
                    <div className="border-2 border-dashed border-outline-variant hover:border-secondary transition-all rounded-xl p-8 flex flex-col items-center justify-center text-center bg-surface-container-low/30 relative select-none">
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => setExcelFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3">
                        table_view
                      </span>
                      <p className="font-body-md text-sm text-on-surface font-semibold mb-1">
                        {excelFile ? excelFile.name : "Drag & Drop Excel File here"}
                      </p>
                      <p className="text-on-surface-variant text-[11px]">
                        Supports .xlsx and .xls formats (Max 5MB)
                      </p>
                    </div>

                    {/* Excel Structure Info */}
                    <div className="mt-6 select-none">
                      <p className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider mb-2.5">
                        EXCEL COLUMN STRUCTURAL GUIDELINE
                      </p>
                      <div className="bg-surface-container-low border border-outline-variant/60 rounded-lg p-3 text-[10px] leading-relaxed font-code-sm text-on-surface-variant">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-outline-variant/40">
                              <th className="pb-1 font-bold">Col A</th>
                              <th className="pb-1 font-bold">Col B-E</th>
                              <th className="pb-1 font-bold">Col F</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="pt-1.5">Question Text</td>
                              <td className="pt-1.5">Option A, B, C, D</td>
                              <td className="pt-1.5">Correct Answer (A/B/C/D)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {excelFile && (
                    <div className="mt-4 p-3 bg-tertiary-container/10 border border-tertiary-container/30 rounded-lg flex items-center justify-between animate-fade-in text-xs text-on-tertiary-container select-none">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary">check_circle</span>
                        Spreadsheet loaded successfully
                      </span>
                      <button onClick={() => setExcelFile(null)} className="hover:text-error transition-colors focus:outline-none">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Coding Upload View */}
              {activeTab === "coding" && (
                <div className="p-6 flex flex-col justify-between flex-grow animate-fade-in">
                  <div className="flex flex-col gap-5">
                    <h4 className="font-label-caps text-xs font-bold text-on-surface tracking-wider select-none">
                      IMPORT PROBLEM DATA
                    </h4>

                    {/* Upload 1: Question Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider select-none">
                        QUESTION SPECIFICATION (.MD / .TXT)
                      </label>
                      <div className="border border-outline-variant rounded-lg p-4 flex items-center justify-between bg-surface-container-low/40 relative select-none">
                        <input
                          type="file"
                          accept=".md, .txt"
                          onChange={(e) => setCodingDescFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="flex items-center gap-3 min-w-0">
                          <span className="material-symbols-outlined text-on-surface-variant/60">description</span>
                          <span className="font-body-md text-xs text-on-surface font-semibold truncate">
                            {codingDescFile ? codingDescFile.name : "Select specification file"}
                          </span>
                        </span>
                        {codingDescFile ? (
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCodingDescFile(null); }}
                            className="text-on-surface-variant hover:text-error transition-colors focus:outline-none z-10"
                          >
                            Clear
                          </button>
                        ) : (
                          <span className="text-[10px] text-secondary font-bold">Browse</span>
                        )}
                      </div>
                    </div>

                    {/* Upload 2: Test cases */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider select-none">
                        TEST CASES SPECIFICATION (.JSON / .TXT)
                      </label>
                      <div className="border border-outline-variant rounded-lg p-4 flex items-center justify-between bg-surface-container-low/40 relative select-none">
                        <input
                          type="file"
                          accept=".json, .txt"
                          onChange={(e) => setCodingTestcaseFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="flex items-center gap-3 min-w-0">
                          <span className="material-symbols-outlined text-on-surface-variant/60">data_object</span>
                          <span className="font-body-md text-xs text-on-surface font-semibold truncate">
                            {codingTestcaseFile ? codingTestcaseFile.name : "Select testcases file"}
                          </span>
                        </span>
                        {codingTestcaseFile ? (
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCodingTestcaseFile(null); }}
                            className="text-on-surface-variant hover:text-error transition-colors focus:outline-none z-10"
                          >
                            Clear
                          </button>
                        ) : (
                          <span className="text-[10px] text-secondary font-bold">Browse</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Invite Students & Share Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm flex flex-col gap-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container"></div>
              
              <div className="select-none">
                <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[22px]">group</span>
                  Student Invites & Share Link
                </h3>
                <p className="text-on-surface-variant text-[11px] mt-1">
                  Share this assessment link directly or email invitations to candidates.
                </p>
              </div>

              {/* Form invite */}
              <form onSubmit={handleSendInvites} className="flex flex-col gap-3">
                <label className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider select-none">
                  INVITE CANDIDATES BY EMAIL
                </label>
                <div className="flex gap-2">
                  <input
                    value={studentEmails}
                    onChange={(e) => setStudentEmails(e.target.value)}
                    className="font-code-sm text-xs flex-grow bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                    placeholder="student1@uni.edu, student2@uni.edu"
                    type="text"
                  />
                  <button
                    type="submit"
                    className="bg-secondary text-on-secondary px-5 rounded-lg text-xs font-label-caps font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-1 focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-sm">mail</span>
                    Invite
                  </button>
                </div>
              </form>

              {/* Invited students list bubble preview */}
              {inviteList.length > 0 && (
                <div className="flex flex-col gap-1.5 text-xs text-on-surface select-none">
                  <span className="font-label-caps text-[8px] font-bold text-on-surface-variant tracking-wider">QUEUED CANDIDATES ({inviteList.length})</span>
                  <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto p-2 bg-surface-container-low border border-outline-variant/40 rounded-lg">
                    {inviteList.map((email) => (
                      <span key={email} className="bg-surface-container-high text-on-surface text-[10px] px-2.5 py-0.5 rounded border border-outline-variant/30 font-medium">
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate QR & Share Link */}
              <div className="border-t border-outline-variant/30 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1 min-w-0 select-text">
                  <span className="font-label-caps text-[9px] font-bold text-on-surface-variant tracking-wider block mb-1 select-none">ASSESSMENT CODE LINK</span>
                  <div className="bg-surface-container-low p-2.5 border border-outline-variant/40 rounded-lg text-xs font-code-sm text-secondary font-semibold break-all truncate">
                    https://devsolve.edu/test/summer-internship-2026
                  </div>
                </div>
                
                <div className="shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowQRCode(!showQRCode)}
                    className="w-full sm:w-auto px-5 py-2.5 border border-outline text-on-surface font-label-caps text-xs tracking-wider rounded font-bold hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5 focus:outline-none select-none"
                  >
                    <span className="material-symbols-outlined text-sm">qr_code</span>
                    {showQRCode ? "Hide QR Code" : "Generate QR"}
                  </button>
                </div>
              </div>

              {/* QR Code SVG panel */}
              {showQRCode && <QRCodeSVG />}
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-surface border border-outline-variant rounded-xl p-5 flex justify-between items-center shadow-sm select-none">
              <button
                type="button"
                onClick={() => {
                  setTestName("");
                  setStartDate("");
                  setEndDate("");
                  setStudentEmails("");
                  setInviteList([]);
                  setShowQRCode(false);
                  setExcelFile(null);
                  setCodingDescFile(null);
                  setCodingTestcaseFile(null);
                }}
                className="font-label-caps text-xs tracking-wider border border-outline px-6 py-2.5 rounded font-bold hover:bg-surface-container transition-colors focus:outline-none"
              >
                Reset Form
              </button>
              <button
                type="button"
                onClick={handleCreateTest}
                className="font-label-caps text-xs tracking-wider bg-secondary text-on-secondary px-8 py-3 rounded font-bold hover:opacity-90 transition-opacity shadow-md flex items-center gap-2 focus:outline-none"
              >
                <span className="material-symbols-outlined text-[18px]">build</span>
                Create Test Assessment
              </button>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
