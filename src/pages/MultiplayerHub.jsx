import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MultiplayerHub() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [createConfig, setCreateConfig] = useState({
    type: "DSA",
    difficulty: "Medium",
    timer: "30 mins",
    invitedFriend: "",
  });

  const [friendsList, setFriendsList] = useState([
    "@code_weaver",
    "@byte_ninja",
    "@algo_king",
    "@dev_guru",
    "@stack_overflow"
  ]);

  // Add Friend state
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomCode.trim()) {
      navigate(`/rooms/${roomCode.toLowerCase()}/leaderboard`);
    } else {
      navigate(`/rooms/algorithm-blitz/leaderboard`);
    }
  };

  const handleCreate = () => {
    alert(`Room Created!
- Type: ${createConfig.type}
- Difficulty: ${createConfig.difficulty}
- Timer: ${createConfig.timer}
- Invited: ${createConfig.invitedFriend || "None"}`);
    navigate(`/problems/reverse-k-group`);
  };

  const handleSearchFriend = (e) => {
    e.preventDefault();
    if (searchUsername.trim()) {
      const formatted = searchUsername.startsWith("@") ? searchUsername : `@${searchUsername}`;
      setSearchResult({
        name: formatted,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsJo_HCp2MPDr5RLtJsJxov2YGZjT2Y--mLKt55Ewgwj0-TVWGjyzqt0Nq5TmdPEaNO31QCiYqFWBo0CFSInbLLjORR87TFwQ2pGPXFUOgkxv5psb8oEjFF9SQMDDqsPXXoGziXVeZNTm3hanIMmLAeaOYioO2UZvfDOFzxc_2DNxdoWGwpuo_ORH7JMb7aUIl0G1ilg9x9y-ci-nGahRlAOcNSXYnmaNcTugXIA0nsnD-AkamgTd9HxMT1ebVxpBuPMH49agIYxMS",
        role: "Full Stack Developer",
      });
      setRequestSent(false);
    }
  };

  const handleSendRequest = () => {
    setRequestSent(true);
    if (searchResult && !friendsList.includes(searchResult.name)) {
      setFriendsList((prev) => [...prev, searchResult.name]);
    }
  };

  const activeRooms = [
    {
      id: "algorithm-blitz",
      title: "Algorithm Blitz",
      host: "AlexD",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2kho1Hl1lg7o2QrhFqEBPd-r2y5LVI5MsFESyj0wmBbiKVEXMNuG1QJESsIQYoxx8LfGlY_oMGelsHGz7HdcCEUMBCd7uI9P5bzaD15QET_-3p_INkRSaO2rsx-ezAmI6NTJeTMNauyObq_0ActI6fFC31LfTlO1XFCVk7ARYHvtezdrzz75zOuBJO1B_rYwDloHwG8XB_ILmWiTDmTC8f9EiFXa_sGOMhZITkPktjUgJQq493anlewo6NYJiZvO_lBu83CLbYmb5",
      lang: "Python",
      diff: "Hard",
      players: "3/4 Players",
      live: true,
      diffClass: "bg-error-container text-on-error-container",
    },
    {
      id: "ui-component-build",
      title: "UI Component Build",
      host: "SarahJ",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQq9Wf977FobPvPGKzI7WC_cuqHFR3pIyAMfrDaBioD_Le6IZAb2Nf_-FnQuTzcDmT8aUBTZN3d3KoqHBck9sNwjPJJAsLjGWIo4vxIiZ4na22zziLkOBvRgfYAp3gTehf2huEF_qzMwbHhZjhFSW-tL0RyKhb6fPWsTWYQsloncJuG0XUFnOuU0LT3sXtdyFSpbI_HfZsIvifv6iWpTL8_c6ZIJjM6MKEb__ISjqOdqCzMEJicoJAnI8TLzjt_aQlgI4-vS_3jjj6",
      lang: "React",
      diff: "Easy",
      players: "1/2 Players",
      live: true,
      diffClass: "bg-tertiary-container text-on-tertiary-container",
    },
    {
      id: "data-pipeline-fix",
      title: "Data Pipeline Fix",
      host: "SysAdmin",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH28lcyEVfe0lY7Sgjpt07gCOipZjZeHvtjLqxMMWcPOQAbZ92qC2alyvsQhYa4hW5VXVll5yJT09I5887z6kZluYOezR-xmpvfhWaHGj16fsfQJVbw_LScUzWQKHc-ggfIpz9kzeICPauVoUbpv7W2xCjAD8CE96vkBHgqvjjcapDqfVb1mhsJviLVYUNr1OpD5Q5krarhxhkVQ86G2DDrN2oOEjfXkHZEQAYuGV6HDePZiGSEL-2f4YEQJ52TzXTXXT9sm_6Dn_K",
      lang: "SQL",
      diff: "Medium",
      players: "2/5 Players",
      live: true,
      diffClass: "bg-primary-fixed text-on-primary-fixed",
    },
  ];

  return (
    <main className="flex-1 p-gutter md:p-margin-edge w-full text-left grid-bg h-screen overflow-y-auto">
      
      {/* Title block removed to match user request */}

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-lg items-stretch">
        
        {/* Join Room Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden group shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">login</span>
              </div>
              <h2 className="font-headline-lg text-lg font-bold text-on-surface">Join Room</h2>
            </div>
            <p className="text-on-surface-variant mb-6 text-xs leading-relaxed font-body-md">
              Enter an active room code to instantly join a synchronized session.
            </p>
          </div>
          
          <form onSubmit={handleJoin} className="flex flex-col gap-4 items-start w-full">
            <input
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="font-code-sm text-xs w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none uppercase tracking-widest transition-all"
              placeholder="Enter room code"
              type="text"
            />
            <button
              type="submit"
              className="font-label-caps text-[10px] tracking-wider bg-primary-container text-on-primary-container font-bold w-fit px-6 py-2.5 rounded-lg hover:bg-primary hover:text-on-primary transition-all flex justify-center items-center gap-1.5 shadow-sm focus:outline-none"
            >
              Join Session
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Create Room Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-1 bg-tertiary-container"></div>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-2xl">add_circle</span>
              </div>
              <h2 className="font-headline-lg text-lg font-bold text-on-surface">Create Room</h2>
            </div>
            <p className="text-on-surface-variant mb-4 text-xs leading-relaxed font-body-md">
              Configure parameters and invite friends from your list.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Question Type Selector */}
              <div className="flex flex-col gap-1 text-left">
                <label className="font-label-caps text-[8px] font-bold text-on-surface-variant tracking-wider">TYPE</label>
                <select
                  value={createConfig.type}
                  onChange={(e) => setCreateConfig(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full font-body-md text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-2 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
                >
                  <option>DSA</option>
                  <option>Aptitude</option>
                  <option>CS Fundamentals</option>
                </select>
              </div>

              {/* Timer Selector */}
              <div className="flex flex-col gap-1 text-left">
                <label className="font-label-caps text-[8px] font-bold text-on-surface-variant tracking-wider">TIMER</label>
                <select
                  value={createConfig.timer}
                  onChange={(e) => setCreateConfig(prev => ({ ...prev, timer: e.target.value }))}
                  className="w-full font-body-md text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-2 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
                >
                  <option>15 mins</option>
                  <option>30 mins</option>
                  <option>45 mins</option>
                  <option>60 mins</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Difficulty Selector */}
              <div className="flex flex-col gap-1 text-left">
                <label className="font-label-caps text-[8px] font-bold text-on-surface-variant tracking-wider">DIFFICULTY</label>
                <select
                  value={createConfig.difficulty}
                  onChange={(e) => setCreateConfig(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full font-body-md text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-2 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              {/* Invite Friends Dropdown Selector */}
              <div className="flex flex-col gap-1 text-left">
                <label className="font-label-caps text-[8px] font-bold text-on-surface-variant tracking-wider">INVITE FRIEND</label>
                <select
                  value={createConfig.invitedFriend}
                  onChange={(e) => setCreateConfig(prev => ({ ...prev, invitedFriend: e.target.value }))}
                  className="w-full font-body-md text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-2 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
                >
                  <option value="">-- Choose --</option>
                  {friendsList.map((friend) => (
                    <option key={friend} value={friend}>
                      {friend}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={handleCreate}
              className="font-label-caps text-[10px] tracking-wider bg-surface border border-outline text-on-surface font-semibold w-fit px-6 py-2.5 rounded-lg hover:bg-surface-container transition-colors flex justify-center items-center gap-1.5 focus:outline-none mt-2"
            >
              Create Room
              <span className="material-symbols-outlined text-sm">group_add</span>
            </button>
          </div>
        </div>

        {/* Add Friend Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary-container"></div>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container/25 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">person_add</span>
              </div>
              <h2 className="font-headline-lg text-lg font-bold text-on-surface">Add Friend</h2>
            </div>
            <p className="text-on-surface-variant mb-6 text-xs leading-relaxed font-body-md">
              Search for profiles to send a friend request and add them to your invite lists.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <form onSubmit={handleSearchFriend} className="flex gap-2">
              <input
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                className="font-code-sm text-xs flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                placeholder="Search username..."
                type="text"
              />
              <button
                type="submit"
                className="bg-secondary text-on-secondary px-4 rounded-lg flex items-center justify-center hover:bg-secondary/90 transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-lg">search</span>
              </button>
            </form>

            {/* Search Result Box */}
            {searchResult && (
              <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-3 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container shadow-sm shrink-0">
                    <img className="w-full h-full object-cover" alt="User" src={searchResult.avatar} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-on-surface truncate">{searchResult.name}</p>
                    <p className="text-[10px] text-on-surface-variant/80 truncate">{searchResult.role}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendRequest}
                  disabled={requestSent}
                  className={`px-3 py-1.5 rounded text-[9px] font-label-caps font-bold transition-all focus:outline-none flex items-center gap-1 ${
                    requestSent
                      ? "bg-tertiary-container text-on-tertiary-container cursor-default"
                      : "bg-primary-container text-on-primary-container hover:brightness-105 active:scale-95"
                  }`}
                >
                  {requestSent ? (
                    <>
                      <span className="material-symbols-outlined text-xs">done</span>
                      Sent
                    </>
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Active Rooms Section (List View) */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-6 select-none">
          <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Active Rooms</h3>
          <button className="text-secondary font-label-caps text-xs tracking-wider font-bold hover:underline flex items-center gap-1 focus:outline-none">
            View All <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {activeRooms.map((room) => (
            <div 
              key={room.id}
              className="bg-surface border border-outline-variant rounded-xl p-4 hover:shadow-md transition-shadow relative flex flex-col md:flex-row md:items-center justify-between gap-4 glow-active text-left"
            >
              {/* Left Section: Host & Room Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shadow-sm shrink-0">
                  <img className="w-full h-full object-cover" alt={room.host} src={room.avatar} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-headline-lg-mobile text-base font-bold text-on-surface truncate">{room.title}</h4>
                    {room.live && (
                      <span className="flex items-center gap-1 bg-surface border border-outline-variant px-2 py-0.5 rounded-full shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                        <span className="text-[9px] font-label-caps text-on-surface-variant font-bold">LIVE</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant font-semibold mt-0.5">
                    Hosted by {room.host}
                  </p>
                </div>
              </div>

              {/* Center/Right Section: Badges & Join Action */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-container-high text-on-surface px-2.5 py-1 rounded font-label-caps text-[9px] font-bold border border-outline-variant/30">
                    {room.lang}
                  </span>
                  <span className={`${room.diffClass} px-2.5 py-1 rounded font-label-caps text-[9px] font-bold`}>
                    {room.diff}
                  </span>
                  <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded font-label-caps text-[9px] font-bold">
                    {room.players}
                  </span>
                </div>

                <Link
                  to={`/rooms/${room.id}/leaderboard`}
                  className="inline-block text-center font-label-caps text-xs tracking-wider bg-surface border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary px-6 py-2.5 rounded font-bold transition-all w-fit"
                >
                  Join Room
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
