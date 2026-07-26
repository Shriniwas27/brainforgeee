import React from "react";
import { Link, useParams } from "react-router-dom";

export default function RoomLeaderboard() {
  const { roomId } = useParams();
  
  // Format room name from URL param
  const getRoomTitle = () => {
    if (!roomId) return "Algorithm Blitz";
    return roomId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const rankList = [
    {
      rank: 4,
      username: "@dev_guru",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDphtaQwNSCRxdRKAR3jEVM4hy-RxrgJJ2WWOsB9qPXDW5kUo4rTV3Ql_S1jr3bGjgCoP8TQwwuvOqMzroHA_rkP4xmFNtPFD7rj2iiLehxRA-yTau6uBsRQF7mR9hGAD7HMYfQbJTYE14xT1QV76R8ssoDE2qmbftA97Q-gGi3_m2-gMorwLRXvs2lIQP1zyKaPPmQgq0T7OwmjI49HE09b2Sy9sy-PYVGAvsoem63w7QO0k-VQhL-gVd6GWok-JCzsixrZBAfl-WT",
      solved: "5/5",
      points: 2250,
      penalty: "1h 12m",
    },
    {
      rank: 5,
      username: "@script_kiddie",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT2O9cPqxRHDL6RdUf3XSlXNamUm7rcgQ2gpcOPXuGwzB4cwN2BWTSWF0tSHw_9xXPC-Mym054Z3b7rsq7ti4DCV0hY0-JPA4XH6W4tCgE1Yb6nA8-eWM-TjiccsPLHUkv-ktcg8J-qwv7aX083Wl_klIRyPtku2jOuxfu-TKxketP2rg6vBPon8kaiFK5KUQU0xDXFKbu-fQsNvC_jms6GGhHOb4npWpiQ_SH5on5fdo6BDiKfIoecTH68uhIYq-DCB8k2XDUooQS",
      solved: "4/5",
      points: 1800,
      penalty: "0h 45m",
    },
    {
      rank: 6,
      username: "@stack_overflow",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsJo_HCp2MPDr5RLtJsJxov2YGZjT2Y--mLKt55Ewgwj0-TVWGjyzqt0Nq5TmdPEaNO31QCiYqFWBo0CFSInbLLjORR87TFwQ2pGPXFUOgkxv5psb8oEjFF9SQMDDqsPXXoGziXVeZNTm3hanIMmLAeaOYioO2UZvfDOFzxc_2DNxdoWGwpuo_ORH7JMb7aUIl0G1ilg9x9y-ci-nGahRlAOcNSXYnmaNcTugXIA0nsnD-AkamgTd9HxMT1ebVxpBuPMH49agIYxMS",
      solved: "4/5",
      points: 1750,
      penalty: "1h 05m",
    },
    {
      rank: 7,
      username: "@binary_tree",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1BuUHeqMH99PMu70w_Z_FbyERWcOr0UXWU0R5rEwYhxjeCFPxl6iTnP-LPbG0QFqk68NSm7yX7uXoG8J8MeIL9Rbi5dZxCC9NNnoZ5whFGeVNFPACRDvjal0DRCB_NSqNXigNxSe9VC-oAdprwAiX69kplC49vGxDopMd-hj6t2mtdFUpas0oN34sldenJDK6YCZD7UhckE3Sf4jyY7u2Zn3tLGQLHDetWwbfsSx5Qo5jFoknoUtWY86iDFFv63tCm-YVrQsevL84",
      solved: "3/5",
      points: 1200,
      penalty: "0h 30m",
    },
  ];

  return (
    <div className="flex-grow flex flex-col h-screen overflow-y-auto">
      {/* Main Content */}
      <main className="p-gutter md:p-margin-edge w-full flex flex-col gap-stack-lg text-left grid-bg flex-grow">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-sm select-none">
          <div>
            <h1 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
              {getRoomTitle()}
            </h1>
            <p className="text-on-surface-variant mt-2 font-body-md">
              Global Qualifiers - Room Leaderboard
            </p>
          </div>
          <div className="bg-surface-container border border-outline px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
            <span className="font-label-caps text-xs text-on-surface tracking-wider font-bold">
              Contest Ended
            </span>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Left Column (Podium & Table) */}
          <div className="lg:col-span-9 flex flex-col gap-stack-lg">
            
            {/* Podium Display */}
            <div className="flex justify-center items-end h-72 gap-4 px-4 border-b border-outline-variant/30 pb-4 select-none">
              
              {/* 2nd Place */}
              <div className="w-1/3 max-w-[160px] bg-surface border border-outline-variant rounded-t-xl flex flex-col items-center justify-end pb-4 h-[75%] relative shadow-sm">
                <div className="absolute -top-8 w-16 h-16 rounded-full border-2 border-surface bg-surface-container overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    alt="Avatar 2"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDREoqrC7eH6Ibu9CccJOe5G-nZOsslHLI4vO51aKpm2S9o3e2QA2FEn0WxItS8P99B5FKCmb92iTzONXPV7xzIm4BWngXyL1Z1UXDN7M883UNt1mtj0gtqGuZ3P3PlvXot7uZghJBnqATLuHufKJxiytcLyelhRIFqHz82jBZDBI05L_6cnQnqPrCJmZtsYZK5Swqcory3MzPE197ZOyKd129U2415PuFpDXeSYF9a199v0YyKt_MFzAiei_N_IN8umulRAaER_-9E"
                  />
                </div>
                <span className="font-label-caps text-xs text-on-surface-variant font-bold mt-4">2ND</span>
                <span className="font-body-md text-on-surface font-bold text-sm">@byte_ninja</span>
                <span className="font-code-sm text-secondary font-bold text-xs mt-1.5">2450 pts</span>
              </div>

              {/* 1st Place */}
              <div className="w-1/3 max-w-[180px] bg-surface border-2 border-primary-container rounded-t-xl flex flex-col items-center justify-end pb-6 h-[95%] relative glow-active z-10 shadow-md">
                <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-surface bg-primary-container overflow-hidden shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    alt="Avatar 1"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvMd0XEIE-jIzQRYC2fKcAvJFx5GvWJzgvTaOrMsugOSZEuhAApXS7fr19y5xZ7t-lQlkNvI11wGKk6FZP7gu7EJU7j-e29f7kMZ24z07Wr-nmXGiuKM2VlpiwrI4NPAYalqe0-0Y7qcERzLgng5a9mTwqmiNWj2fzkxOsH7ugCojhyYNmDZe6CO8yet1WeZIyUqMLaJXlWvDEwumDT31Gip2tAaMN-dIg68K9IHTw_aLGMIbJLwf_86Sp2QNP0Gi_WNCEPXvUCegk"
                  />
                </div>
                <span className="material-symbols-outlined text-primary-container absolute -top-16 text-3xl animate-bounce">
                  star
                </span>
                <span className="font-label-caps text-xs text-on-surface-variant font-bold mt-6">1ST</span>
                <span className="font-body-md text-on-surface font-extrabold text-base">@algo_king</span>
                <span className="font-code-sm text-primary font-bold text-sm mt-1.5">2600 pts</span>
              </div>

              {/* 3rd Place */}
              <div className="w-1/3 max-w-[160px] bg-surface border border-outline-variant rounded-t-xl flex flex-col items-center justify-end pb-4 h-[65%] relative shadow-sm">
                <div className="absolute -top-8 w-16 h-16 rounded-full border-2 border-surface bg-surface-container overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    alt="Avatar 3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsN6n9jHFGjkf4syKNtmpLgsemo9EmxgvpJWaAUVuULSOPpPGWNdeGOmzFTKEGWzKymL1mbw11v5TbfzqYajanhcu9TiBfLFFfCucA3ICKR0UtEbgHQtE9yvB_GsqgeZnDFy9nvXX2JC0gmtETa2xJU02wc9EJCXiNP25C9lngs2ZMSEAZduZTleoAZ6Qwf7BrafFxdiVwcRFGf_wZTUuW_eAvdiQ6vZyEB_q6sFVFEgrLTJu6kB3IY-n128tmPzJnxafspv61MS8_"
                  />
                </div>
                <span className="font-label-caps text-xs text-on-surface-variant font-bold mt-4">3RD</span>
                <span className="font-body-md text-on-surface font-bold text-sm">@code_weaver</span>
                <span className="font-code-sm text-outline font-bold text-xs mt-1.5">2310 pts</span>
              </div>

            </div>

            {/* Ranking Table */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="border-t-4 border-secondary w-full"></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low select-none">
                      <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider">Rank</th>
                      <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider">Coder</th>
                      <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider text-center">Solved</th>
                      <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider text-right">Points</th>
                      <th className="py-4 px-6 font-label-caps text-xs font-bold text-on-surface-variant tracking-wider text-right">Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankList.map((row) => (
                      <tr
                        key={row.rank}
                        className="border-b border-outline-variant/60 hover:bg-surface-container-lowest transition-colors"
                      >
                        <td className="py-4 px-6 font-code-sm text-sm text-on-surface-variant font-bold">
                          {row.rank}
                        </td>
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container shadow-sm">
                            <img className="w-full h-full object-cover" alt={row.username} src={row.avatar} />
                          </div>
                          <span className="font-body-md font-bold text-sm text-on-surface">
                            {row.username}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center font-code-sm text-xs">
                          <span className="bg-tertiary-container text-on-tertiary-container font-bold px-3 py-1 rounded">
                            {row.solved}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-code-sm text-sm text-secondary font-bold">
                          {row.points}
                        </td>
                        <td className="py-4 px-6 text-right font-code-sm text-xs text-on-surface-variant font-semibold">
                          {row.penalty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column (Insights Sidebar) */}
          <div className="lg:col-span-3 flex flex-col gap-stack-md select-none">
            <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container"></div>
              <h3 className="font-headline-lg-mobile text-lg font-bold text-on-surface mb-4">
                Performance Insights
              </h3>
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col text-left">
                  <span className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider mb-1">
                    AVG COMPLETION TIME
                  </span>
                  <span className="font-code-sm text-base text-on-surface font-bold">
                    1h 34m 12s
                  </span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col text-left">
                  <span className="font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider mb-1">
                    HARDEST PROBLEM
                  </span>
                  <span className="font-body-md font-bold text-error text-sm">
                    Graph Traversal Matrix
                  </span>
                  <span className="font-code-sm text-xs text-on-surface-variant mt-1.5 font-bold">
                    12% Success Rate
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant w-full py-stack-lg flex flex-col sm:flex-row justify-between items-center px-margin-edge max-w-[1200px] mx-auto gap-4 transition-colors duration-200 shrink-0 select-none">
        <span className="font-label-caps text-[10px] tracking-wider text-on-surface-variant font-bold">
          © 2026 DEVARENA LABS. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-6">
          <a className="font-label-caps text-[10px] tracking-wider text-on-surface-variant font-bold hover:text-secondary transition-colors" href="#">
            PRIVACY POLICY
          </a>
          <a className="font-label-caps text-[10px] tracking-wider text-on-surface-variant font-bold hover:text-secondary transition-colors" href="#">
            TERMS OF SERVICE
          </a>
          <a className="font-label-caps text-[10px] tracking-wider text-on-surface-variant font-bold hover:text-secondary transition-colors" href="#">
            API DOCS
          </a>
        </div>
      </footer>
    </div>
  );
}
