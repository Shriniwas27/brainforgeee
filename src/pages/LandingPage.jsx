import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full flex flex-col justify-center overflow-y-auto overflow-x-hidden landing-grid transition-colors duration-200">
      {/* Ambient Glows */}
      <div className="absolute top-10 left-[-10%] w-[50%] h-[600px] glow-blue -z-10 pointer-events-none rounded-full"></div>
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[600px] glow-orange -z-10 pointer-events-none rounded-full"></div>

      <main className="max-w-[1200px] mx-auto px-margin-edge md:px-gutter lg:px-margin-edge w-full py-stack-lg z-10 my-auto">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[600px]">
          
          {/* Left Block: Heading and description */}
          <div className="lg:col-span-6 flex flex-col gap-stack-lg text-left">
            <div className="inline-flex items-center gap-2 bg-surface border border-outline-variant px-3 py-1.5 rounded-full w-fit shadow-sm">
              <span className="material-symbols-outlined text-primary text-sm animate-bounce">
                rocket_launch
              </span>
              <span className="font-label-caps text-xs text-on-surface-variant tracking-wider">
                ROOM-BASED CODING COMPETITIONS
              </span>
            </div>

            <h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg text-on-surface leading-tight font-extrabold">
              Compete, collaborate, and master <span className="syntax-highlight-orange">DSA</span> in real-time rooms
            </h1>

            <p className="font-body-md text-on-surface-variant max-w-lg leading-relaxed text-lg">
              Join live coding rooms and challenge other developers in timed competitions for Data Structures &amp; Algorithms, Aptitude, and problem-solving. Practice together, climb the leaderboard, and sharpen your skills.
            </p>

            <div className="flex flex-wrap gap-2 text-sm font-semibold text-on-surface-variant">
              <span className="rounded-full bg-surface border border-outline-variant px-3 py-1.5">DSA Challenges</span>
              <span className="rounded-full bg-surface border border-outline-variant px-3 py-1.5">Aptitude Contests</span>
              <span className="rounded-full bg-surface border border-outline-variant px-3 py-1.5">Live Leaderboards</span>
            </div>

            <div className="flex flex-wrap gap-stack-md pt-2">
              <Link
                to="/signup"
                className="bg-primary-container text-on-primary-container font-body-md font-bold px-8 py-3.5 rounded hover:bg-primary hover:text-on-primary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm text-center"
              >
                Sign Up Free
              </Link>
              <Link
                to="/login"
                className="bg-surface border border-outline text-on-surface font-body-md font-semibold px-8 py-3.5 rounded hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
              >
                Log In
              </Link>
            </div>
          </div>

          {/* Right Block: Live Coding Preview */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0 px-4">
            
            {/* CSS 3 Floating Icon */}
            <div className="absolute -top-10 -left-6 bg-surface p-4 rounded-xl border border-outline-variant shadow-md z-20 flex flex-col items-center gap-2 animate-bounce duration-1000">
              <div 
                className="w-12 h-12 bg-contain bg-no-repeat bg-center" 
                style={{ 
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWsY57nNMWx7URLc2ZUdSb51gyINx9JlY9Y4kkjz0EfmzztGLrYqB0N8OPoxGQru1doIaMil1ywvNxPIkQARrV-jeV19Txuq1tVcIgIsefszH_hbKuMtJ0eKk35PKbGLLUV_W2yNV5Tu9Ha32dUwfzey3TAZeYGKl01CmuCyDcl6DXnekzrQ3v8AQtvkNXf5e0Ruzrp2F-EzRJfkO-6EDwmBZC4p3u0cgYWLpmD2LybmNzbu5WXPV7s2xL78cUBZmTpWZ-KazgyGbA')" 
                }}
              ></div>
              <span className="font-label-caps text-[10px] text-on-surface-variant font-bold">CSS 3</span>
            </div>

            {/* Python Floating Icon */}
            <div className="absolute -bottom-8 -right-4 bg-surface p-4 rounded-xl border border-outline-variant shadow-md z-20 flex flex-col items-center gap-2 animate-bounce duration-700">
              <div 
                className="w-12 h-12 bg-contain bg-no-repeat bg-center" 
                style={{ 
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByq6Mt4xs0sRaJ9viRKWASXzp57Q8W63X7VHeOFDNRffVtnaQxwexJpafY3ne2QQRUPquIe2kIC_D_ipGY2zJviXy0qguNDigbHujNKHjmX890Jwg4pCdA-bYPykURHKqORSso9j3aJm8WCYCFLaI-1c2_ipfbM2XTi4mlAQ-OKHfMUGJhV2OOAXqPJzrNWvwVmy-OlNoxx2cR4UQuXOUWUEWHH7tfWy6OyBG5WYQa3KnsRtzo0sc4r1DgW-aVvtsaBilSd2YaCJY5')" 
                }}
              ></div>
              <span className="font-label-caps text-[10px] text-on-surface-variant font-bold">Python</span>
            </div>

            {/* Mock Editor Window */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-lg relative glow-active">
              
              {/* Header */}
              <div className="bg-surface-container-low border-b border-outline-variant px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
                <span className="ml-4 font-code-sm text-xs text-on-surface-variant">
                  main.py - DevSolve Workspace
                </span>
              </div>

              {/* Editor Code */}
              <div className="p-6 font-code-sm text-sm text-on-surface bg-surface-container-lowest overflow-x-auto text-left leading-relaxed">
                <pre>
                  <code>
                    <span className="text-secondary font-bold">def</span> <span className="text-primary font-bold">init_project</span>(name: <span className="text-tertiary font-bold">str</span>) -&gt; <span className="text-tertiary font-bold">bool</span>:{"\n"}
                    {"    "}<span className="text-on-surface-variant/70 italic"># Initialize a new high-energy workspace</span>{"\n"}
                    {"    "}config = &#123;{"\n"}
                    {"        "}<span className="text-secondary">"mode"</span>: <span className="text-secondary">"collaborative"</span>,{"\n"}
                    {"        "}<span className="text-secondary">"theme"</span>: <span className="text-secondary">"Lumina"</span>,{"\n"}
                    {"        "}<span className="text-secondary">"sync"</span>: <span className="text-primary">True</span>{"\n"}
                    {"    "}&#125;{"\n\n"}
                    {"    "}<span className="text-primary font-bold">if</span> setup_environment(config):{"\n"}
                    {"        "}<span className="text-secondary">print</span>(f<span className="text-secondary">"Welcome to &#123;name&#125;! Let's build."</span>){"\n"}
                    {"        "}<span className="text-primary font-bold">return True</span>{"\n\n"}
                    {"    "}<span className="text-primary font-bold">return False</span>{"\n\n"}
                    <span className="text-on-surface-variant/70 italic"># Awaiting user input...</span>{"\n"}
                    <span className="animate-ping font-bold text-primary">|</span>
                  </code>
                </pre>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
