import { useState } from "react";

// ─── Shared Design Tokens ────────────────────────────────────────────────────
const colors = {
  primary: "#a23700",
  primaryContainer: "#c84b0f",
  onSurface: "#231a0d",
  onSurfaceVariant: "#594139",
  surface: "#fff8f3",
  surfaceContainer: "#fdebd5",
  surfaceContainerLow: "#fff2e2",
  surfaceContainerHigh: "#f7e6cf",
  surfaceContainerHighest: "#f2e0ca",
  outlineVariant: "#e0bfb4",
  tertiary: "#136938",
  secondary: "#3f5f92",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&family=Space+Grotesk:wght@300..700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Manrope', sans-serif; background: #fff8f3; color: #231a0d; }
  .font-serif { font-family: 'Newsreader', serif; }
  .font-mono { font-family: 'Space Grotesk', monospace; }
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block; vertical-align: middle; line-height: 1;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e0bfb4; border-radius: 10px; }
  .archival-gradient { background: linear-gradient(135deg, #a23700 0%, #c84b0f 100%); }
  .glass { backdrop-filter: blur(20px); }
  textarea:focus { outline: none; }
  input:focus { outline: none; }
`;

// ─── Nav Config ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home",     icon: "home",        label: "Home" },
  { id: "discover", icon: "explore",     label: "Discover" },
  { id: "path",     icon: "insights",    label: "Path" },
  { id: "mentor",   icon: "school",      label: "Mentor" },
  { id: "growth",   icon: "trending_up", label: "Growth" },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setPage }) {
  return (
    <aside style={{
      width: 256, flexShrink: 0, height: "100vh", position: "sticky", top: 0,
      borderRight: `1px solid ${colors.onSurface}18`,
      background: colors.surface, display: "flex", flexDirection: "column",
      padding: "32px 0", gap: 24,
    }}>
      <div style={{ padding: "0 32px 16px" }}>
        <div className="font-serif" style={{ fontSize: 22, fontWeight: 500 }}>PassionPath</div>
        <div className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4, marginTop: 4 }}>Archival Authority</div>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 24px", background: "none", border: "none",
              borderLeft: isActive ? `2px solid ${colors.primaryContainer}` : "2px solid transparent",
              color: isActive ? colors.primaryContainer : `${colors.onSurface}99`,
              fontWeight: isActive ? 700 : 400,
              backgroundColor: isActive ? `${colors.surfaceContainer}80` : "transparent",
              cursor: "pointer", transition: "all 0.2s", width: "100%", textAlign: "left",
            }}
              onMouseEnter={e => !isActive && (e.currentTarget.style.backgroundColor = colors.surfaceContainer)}
              onMouseLeave={e => !isActive && (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
              <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <button className="archival-gradient" style={{
          width: "100%", padding: "12px", color: "white", border: "none",
          cursor: "pointer", fontFamily: "'Space Grotesk', monospace",
          fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em",
          transition: "opacity 0.2s",
        }}>New Entry</button>
        <div style={{ borderTop: `1px solid ${colors.onSurface}0D`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {[{ icon: "settings", label: "Settings" }, { icon: "auto_stories", label: "Archive" }].map(i => (
            <button key={i.label} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
              background: "none", border: "none", color: `${colors.onSurface}66`,
              cursor: "pointer", textAlign: "left",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{i.icon}</span>
              <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>{i.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Top Header ──────────────────────────────────────────────────────────────
function TopHeader({ title = "PassionPath" }) {
  return (
    <header className="glass" style={{
      position: "sticky", top: 0, zIndex: 40,
      background: `${colors.surface}CC`,
      borderBottom: `1px solid ${colors.onSurface}0D`,
      height: 64, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 48px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <span className="font-serif" style={{ fontSize: 18, fontWeight: 600 }}>{title}</span>
        <nav style={{ display: "flex", gap: 24 }}>
          {["Dashboard", "Logs", "Library"].map((l, i) => (
            <a key={l} href="#" className="font-mono" style={{
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em",
              color: i === 2 ? colors.primaryContainer : `${colors.onSurface}B3`,
              textDecoration: "none",
              borderBottom: i === 2 ? `1px solid ${colors.primaryContainer}` : "none",
              paddingBottom: i === 2 ? 1 : 0,
            }}>{l}</a>
          ))}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: colors.surfaceContainerLow, padding: "6px 16px", borderRadius: 999,
          border: `1px solid ${colors.onSurface}1A`,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, opacity: 0.4 }}>search</span>
          <input placeholder="Search Archive..." style={{
            background: "none", border: "none", fontFamily: "'Space Grotesk', monospace",
            fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", width: 140,
            color: colors.onSurface,
          }} />
        </div>
        {["notifications", "history_edu"].map(ic => (
          <span key={ic} className="material-symbols-outlined" style={{ color: `${colors.onSurface}B3`, cursor: "pointer", fontSize: 22 }}>{ic}</span>
        ))}
        <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: `1px solid ${colors.outlineVariant}` }}>
          <img alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByXMkm001dj2OhzZp6DmG2Vo3AdEoaunhs-23cN6bkFNRj6GSqV3TaxNGGDx3LYRKHy3Eav1I1he0NQU3CmKCkMJaphux6a9-dhiT3r2EOb6PtKSu3wR-zSZWvXiGrQgIil9BDpXtt4GTFNXfcFVnh5m8K9OAVUNSpajRe-ytVXVM8DYlptA3YThCBrnL9bnGa9O7v4y7H2FEXwhPItgMs5n3jabj7cORqqd9skqwgiSb92iSi5qqB6-nmpKWsrUXyWu5N3Dl40gQ" />
        </div>
      </div>
    </header>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────
function MobileNav({ active, setPage }) {
  return (
    <nav className="glass" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, height: 64,
      background: `${colors.surfaceContainer}CC`,
      borderTop: `1px solid ${colors.outlineVariant}22`,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      zIndex: 50,
    }}>
      {NAV_ITEMS.map(item => (
        <button key={item.id} onClick={() => setPage(item.id)} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          background: "none", border: "none", cursor: "pointer",
          color: active === item.id ? colors.primaryContainer : `${colors.onSurface}66`,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{item.icon}</span>
          <span className="font-mono" style={{ fontSize: 8, textTransform: "uppercase" }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div>
      <TopHeader />
      <div style={{ padding: "40px 80px 80px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Hero */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
            <div style={{ maxWidth: 700 }}>
              <p className="font-mono" style={{ fontSize: 11, color: colors.primary, marginBottom: 16, display: "flex", alignItems: "center", gap: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <span style={{ width: 32, height: 1, background: colors.primary, display: "inline-block" }} /> 01 // OVERVIEW
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(42px,6vw,80px)", fontWeight: 500, lineHeight: 0.92, color: colors.onSurface }}>
                The Architecture of{" "}
                <span style={{ fontStyle: "italic", color: colors.primaryContainer }}>Your Intent</span>
              </h2>
            </div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: colors.onSurfaceVariant, maxWidth: 280, lineHeight: 1.6 }}>
              A legacy document mapping your cognitive evolution and decision-making clarity.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
          {/* Clarity Score */}
          <div style={{ gridColumn: "span 5", background: colors.surfaceContainerLow, padding: 40, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 12, right: 16, fontSize: 72, fontFamily: "'Space Grotesk'", opacity: 0.06, userSelect: "none" }}>78</div>
            <div className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: colors.onSurfaceVariant, marginBottom: 40 }}>Clarity Score</div>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
              <div style={{ position: "relative" }}>
                <svg width={192} height={192} style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={96} cy={96} r={88} fill="transparent" stroke={`${colors.outlineVariant}33`} strokeWidth={1.5} />
                  <circle cx={96} cy={96} r={88} fill="transparent" stroke={colors.primaryContainer} strokeWidth={3} strokeDasharray="552.92" strokeDashoffset="121.6" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-serif" style={{ fontSize: 64, fontWeight: 300 }}>78</span>
                  <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.4 }}>/ 100</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${colors.outlineVariant}22` }}>
              <p style={{ fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
                Decision-making threshold increased by <span style={{ color: colors.tertiary, fontWeight: 700 }}>+12%</span> this month.
              </p>
            </div>
          </div>

          {/* Current Direction */}
          <div style={{ gridColumn: "span 7", background: colors.surfaceContainer, display: "flex" }}>
            <div style={{ flex: 1, padding: 40, borderRight: `1px solid ${colors.outlineVariant}22` }}>
              <div className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: colors.primary, marginBottom: 40 }}>Current Direction</div>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
                <div style={{ width: 4, height: 48, background: colors.primary, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h4 className="font-serif" style={{ fontSize: 28, fontStyle: "italic", marginBottom: 8 }}>Systemic Synthesis</h4>
                  <p style={{ fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
                    Consolidating fragmented pursuits into a unified professional legacy.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Metacognition", "Strategic Intent", "Curated Focus"].map(t => (
                  <span key={t} className="font-mono" style={{ padding: "4px 12px", background: colors.surfaceContainerHighest, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ width: "33%", overflow: "hidden" }}>
              <img alt="Minimal Lamp" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.8 }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1HSGJY3sKmNl5fzH-W48-VAXbN4iNJqZFCyWa612jpkeRlTBGdULKNk3sA847DT59czSLin8lngmW9yX5qYOMr-Dl2Bf5IlQf4yvaojLUNTZ9a5XpZD59JWD_yCaYzDFzllRMmN3b1IC7R-Mzd3Q0k93zhBc6Zbw01HuEHQCkt9jVsNEuOdCqzGWh8_qZB0AQUDfN1eX7E5qzWzOqRFflpP6lEhODoohIOHkdCiBgHGtfo6NU7M1WwMFHZjXwjS1Zc6Glc0Z3FWw" />
            </div>
          </div>

          {/* Daily Focus */}
          <div style={{ gridColumn: "span 6", background: colors.surfaceContainerLow, padding: 40, borderLeft: `4px solid ${colors.primary}`, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
              <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: colors.onSurfaceVariant }}>Daily Focus</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>push_pin</span>
            </div>
            <h4 className="font-serif" style={{ fontSize: 26, marginBottom: 12 }}>Audit the 'Deep Work' threshold for quarterly goals.</h4>
            <p style={{ fontSize: 13, color: colors.onSurfaceVariant }}>Remove three secondary tasks that are diluting your primary intent.</p>
            <div style={{ marginTop: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", opacity: 0.4, textTransform: "uppercase" }}>Priority: Alpha</span>
              <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: 22 }}>arrow_forward</span>
            </div>
          </div>

          {/* Journey Timeline */}
          <div style={{ gridColumn: "span 6", background: colors.surfaceContainerLow, padding: 40 }}>
            <div className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: colors.onSurfaceVariant, marginBottom: 40 }}>Journey Timeline</div>
            {[
              { idx: "01 // Mar 2024", status: "Completed", statusColor: colors.tertiary, title: "Initial Research Paradigm Shift", dotColor: colors.tertiary, italic: true },
              { idx: "02 // Apr 2024", status: "Active", statusColor: colors.primaryContainer, title: "Strategic Pivot: System Synthesis", dotColor: colors.primaryContainer, italic: false },
              { idx: "03 // Jun 2024", status: "Upcoming Gate", statusColor: `${colors.onSurfaceVariant}66`, title: "Market Authority Confirmation", dotColor: "transparent", italic: false, dimmed: true },
            ].map((m, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 28, paddingBottom: i < 2 ? 32 : 0 }}>
                {i < 2 && <div style={{ position: "absolute", left: 4, top: 8, bottom: 0, width: 1, background: `${colors.outlineVariant}50` }} />}
                {i === 2 && <div style={{ position: "absolute", left: 4, top: 8, bottom: 0, width: 1, borderLeft: `1px dashed ${colors.outlineVariant}50` }} />}
                <div style={{ position: "absolute", left: 0, top: 6, width: 8, height: 8, borderRadius: "50%", background: m.dotColor, border: i === 2 ? `1px solid ${colors.outlineVariant}80` : "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: colors.onSurfaceVariant }}>{m.idx}</span>
                  <span className="font-mono" style={{ fontSize: 10, color: m.statusColor }}>{m.status}</span>
                </div>
                <p className="font-serif" style={{ fontSize: 18, fontStyle: m.italic ? "italic" : "normal", opacity: m.dimmed ? 0.5 : 1 }}>{m.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: 96, paddingTop: 24, borderTop: `1px solid ${colors.outlineVariant}22`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 48 }}>
            {[{ label: "Last Archived", val: "Today, 08:42 AM" }, { label: "System Status", val: "Precise" }].map(f => (
              <div key={f.label}>
                <p className="font-mono" style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: colors.onSurfaceVariant, marginBottom: 4 }}>{f.label}</p>
                <p style={{ fontSize: 12 }}>{f.val}</p>
              </div>
            ))}
          </div>
          <span className="font-mono" style={{ fontSize: 10, color: `${colors.onSurfaceVariant}66`, letterSpacing: "0.5em", textTransform: "uppercase" }}>Folio No. 1422-B</span>
        </footer>
      </div>
    </div>
  );
}

// ─── DISCOVER PAGE ────────────────────────────────────────────────────────────
function DiscoverPage() {
  return (
    <div>
      <TopHeader />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, padding: "64px 64px", maxWidth: 1400, margin: "0 auto" }}>
        {/* Left */}
        <div>
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 4, height: 32, background: colors.primary }} />
              <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: colors.primary, fontWeight: 700 }}>01 // Discovery Phase</span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(36px,5vw,56px)", fontStyle: "italic", lineHeight: 1.1, marginBottom: 16 }}>The Weight of Choice</h2>
            <p style={{ fontSize: 16, color: colors.onSurfaceVariant, maxWidth: 480, lineHeight: 1.7 }}>
              Each decision etched here defines the architectural integrity of your future self.
            </p>
          </div>

          {/* Dilemma Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: colors.surfaceContainerLow, padding: 48, borderBottom: `2px solid transparent`, transition: "all 0.3s" }}>
              <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: `${colors.onSurfaceVariant}99`, display: "block", marginBottom: 20 }}>Dilemma No. 422</span>
              <h3 className="font-serif" style={{ fontSize: 32, fontStyle: "italic", marginBottom: 24 }}>Depth of Mastery vs. Breadth of Versatility?</h3>
              <p style={{ fontSize: 15, color: colors.onSurfaceVariant, marginBottom: 40, lineHeight: 1.7 }}>
                Would you rather be the sole authority in a vanishing craft, or a skilled generalist across three emerging fields?
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[{ label: "Path A", title: "The Obsessive Specialist" }, { label: "Path B", title: "The Adaptive Polymath" }].map(p => (
                  <button key={p.label} style={{
                    textAlign: "left", padding: 24, background: colors.surfaceContainerHigh,
                    border: "none", cursor: "pointer", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = colors.surfaceContainerHigh; e.currentTarget.style.color = colors.onSurface; }}
                  >
                    <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8, opacity: 0.6 }}>{p.label}</span>
                    <span className="font-serif" style={{ fontSize: 18 }}>{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Micro-Experiments */}
            <div style={{ paddingTop: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, borderBottom: `1px solid ${colors.outlineVariant}22`, paddingBottom: 12 }}>
                <h3 className="font-serif" style={{ fontSize: 22 }}>Micro-Experiments</h3>
                <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>Active Testing</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { icon: "biotech", color: colors.tertiary, time: "15 Mins", title: "The \"Zero-Draft\" Sprint", desc: "Produce a raw artifact without editing. Measure the impulse of your intuition." },
                  { icon: "architecture", color: colors.secondary, time: "1 Hour", title: "Architectural Deconstruction", desc: "Take a system you admire and map its failure points." },
                ].map(exp => (
                  <div key={exp.title} style={{ background: colors.surfaceContainer, padding: 28, borderLeft: `4px solid ${exp.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span className="material-symbols-outlined" style={{ color: exp.color }}>{exp.icon}</span>
                      <span className="font-mono" style={{ fontSize: 10, color: exp.color, fontWeight: 700, letterSpacing: "0.05em" }}>{exp.time}</span>
                    </div>
                    <h4 className="font-serif" style={{ fontSize: 18, marginBottom: 10 }}>{exp.title}</h4>
                    <p style={{ fontSize: 13, color: colors.onSurfaceVariant, marginBottom: 20, lineHeight: 1.6 }}>{exp.desc}</p>
                    <a href="#" className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${colors.primary}`, color: colors.primary, textDecoration: "none" }}>Initiate Test</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <aside>
          <div style={{ background: colors.surfaceContainerHighest, padding: 28, border: `1px solid ${colors.outlineVariant}22`, position: "sticky", top: 88 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>Research Insights</span>
              <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: 18 }}>analytics</span>
            </div>
            {[
              { label: "Precision", val: 88, color: colors.primary, logs: "24, 28, 31" },
              { label: "Pragmatism", val: 42, color: colors.secondary, logs: "02, 11" },
              { label: "Abstraction", val: 65, color: colors.tertiary },
            ].map(trait => (
              <div key={trait.label} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <span className="font-serif" style={{ fontSize: 16, fontStyle: "italic" }}>{trait.label}</span>
                  <span className="font-mono" style={{ fontSize: 12 }}>{trait.val}%</span>
                </div>
                <div style={{ height: 2, background: `${colors.onSurface}0D` }}>
                  <div style={{ height: "100%", background: trait.color, width: `${trait.val}%` }} />
                </div>
                {trait.logs && <p className="font-mono" style={{ fontSize: 9, textTransform: "uppercase", marginTop: 6, opacity: 0.5, letterSpacing: "0.05em" }}>Inferred from Logs: {trait.logs}</p>}
              </div>
            ))}

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${colors.outlineVariant}33` }}>
              <span className="font-mono" style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 12, opacity: 0.4 }}>Observation Log</span>
              {[
                "\"User exhibits high resistance to standard hierarchical structures.\"",
                "\"Preference for async exploration noted in Micro-Experiment A.\"",
              ].map((obs, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "flex-start" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 12, marginTop: 2 }}>label</span>
                  <p style={{ fontSize: 11, fontStyle: "italic", lineHeight: 1.5 }}>{obs}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── PATH PAGE ────────────────────────────────────────────────────────────────
function PathPage() {
  return (
    <div>
      <TopHeader />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 48px" }}>
        {/* Header */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <span className="font-mono" style={{ fontSize: 13, color: colors.primary, letterSpacing: "0.15em", textTransform: "uppercase" }}>01 // The Selection</span>
            <div style={{ flex: 1, height: 1, background: colors.outlineVariant, opacity: 0.2 }} />
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(40px,6vw,80px)", fontStyle: "italic", lineHeight: 1.05, marginBottom: 32 }}>
            Pathways of the <br /><span style={{ color: colors.primaryContainer }}>Evolved Self.</span>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24, alignItems: "flex-end" }}>
            <p style={{ fontSize: 16, color: colors.onSurfaceVariant, maxWidth: 480, lineHeight: 1.7 }}>
              An algorithmic excavation of your potential trajectories. We analyze the intersection of latent desire, historical proficiency, and market evolution.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {[{ label: "Simulated Scenarios", val: "04" }, { label: "Confidence Score", val: "89%" }].map(s => (
                <div key={s.label} style={{ textAlign: "right" }}>
                  <p className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", color: `${colors.onSurfaceVariant}99` }}>{s.label}</p>
                  <p className="font-serif" style={{ fontSize: 32, fontStyle: "italic" }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Path Cards */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 80 }}>
          {[
            { type: "Primary Vector", title: "Digital Epistemologist", pct: 92, offset: 14, traits: ["High Autonomy Rating", "Cognitive Flow Alignment"], desc: "Your synthesis of archival data management and creative philosophy aligns with the emerging need for truth-verification protocols." },
            { type: "Secondary Vector", title: "Systems Architect", pct: 75, offset: 44, traits: ["High Capital Potential", "Institutional Recognition"], desc: "Your structural thinking mirrors complex organic systems. This path prioritizes stability and long-term infrastructure." },
          ].map(card => (
            <div key={card.title} style={{ background: colors.surfaceContainerLow, padding: 40, borderBottom: `2px solid ${colors.primary}1A`, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
                <div>
                  <p className="font-mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: colors.primary, marginBottom: 8, textTransform: "uppercase" }}>{card.type}</p>
                  <h3 className="font-serif" style={{ fontSize: 34, fontStyle: "italic" }}>{card.title}</h3>
                </div>
                <div style={{ position: "relative" }}>
                  <svg width={64} height={64} style={{ transform: "rotate(-90deg)" }}>
                    <circle cx={32} cy={32} r={28} fill="transparent" stroke={`${colors.outlineVariant}33`} strokeWidth={2} />
                    <circle cx={32} cy={32} r={28} fill="transparent" stroke={colors.primaryContainer} strokeWidth={2} strokeDasharray="175.9" strokeDashoffset={card.offset} />
                  </svg>
                  <span className="font-mono" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{card.pct}%</span>
                </div>
              </div>
              <p className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: `${colors.onSurfaceVariant}99`, marginBottom: 12 }}>Logic of Fit</p>
              <p style={{ fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 1.7, flex: 1, marginBottom: 24 }}>{card.desc}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
                {card.traits.map(t => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, fontFamily: "'Space Grotesk'" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.primaryContainer }} />
                    {t.toUpperCase()}
                  </li>
                ))}
              </ul>
              <div style={{ paddingTop: 24, borderTop: `1px solid ${colors.outlineVariant}22` }}>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Space Grotesk'", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: colors.primary, textDecoration: "none" }}>
                  Explore Trajectory <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* 5-Year Projection */}
        <section style={{ marginBottom: 80, background: `${colors.surfaceContainerHighest}50`, padding: 64, position: "relative", overflow: "hidden" }}>
          <div style={{ marginBottom: 32 }}>
            <span className="font-mono" style={{ fontSize: 13, color: colors.primary, letterSpacing: "0.15em", textTransform: "uppercase" }}>02 // 5-Year Projection</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: 44, fontStyle: "italic", marginBottom: 48 }}>The Narrative of Arrival.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 48, maxWidth: 720 }}>
            {[
              { year: "Year 01", title: "The Dissolution", desc: "You begin by stripping away redundant professional identities. This is a period of deep archival research where you publish three defining whitepapers on network ethics." },
              { year: "Year 03", title: "The Synthesis", desc: "Your framework is adopted by a major archival institution. You transition from a solo researcher to a curator of a global knowledge node, managing a team of fifteen." },
              { year: "Year 05", title: "The Authority", desc: "The path culminates in the release of \"The Eternal Index.\" You are now a recognized authority, consulting at the highest levels of digital governance." },
            ].map(yr => (
              <div key={yr.year} style={{ display: "flex", gap: 32 }}>
                <div className="font-mono" style={{ fontSize: 11, color: colors.primary, paddingTop: 6, minWidth: 60, textTransform: "uppercase" }}>{yr.year}</div>
                <div>
                  <h4 className="font-serif" style={{ fontSize: 20, fontStyle: "italic", marginBottom: 10 }}>{yr.title}</h4>
                  <p style={{ fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 1.7 }}>{yr.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Friction Analysis */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <span className="font-mono" style={{ fontSize: 13, color: colors.primary, letterSpacing: "0.15em", textTransform: "uppercase" }}>03 // Friction Analysis</span>
            <div style={{ flex: 1, height: 1, background: colors.outlineVariant, opacity: 0.2 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              { color: "#6a1b9a", icon: "warning", badge: "Social Isolation Risk", title: "The Price of Precision", desc: "Deep research trajectories often lead to a narrowing of the social circle. The simulation predicts a 40% decrease in casual interactions by Year 3.", mitigation: "Schedule deliberate community engagement every 14 days." },
              { color: "#b8860b", icon: "hourglass_empty", badge: "Opportunity Cost", title: "The Creative Sacrifice", desc: "Choosing the Architect path will likely suppress your impulse for tangential creative projects.", mitigation: "Reserve 15% of annual capacity for low-stakes exploration." },
            ].map(r => (
              <div key={r.title} style={{ background: "white", padding: 32, borderLeft: `4px solid ${r.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span className="material-symbols-outlined" style={{ color: r.color }}>{r.icon}</span>
                  <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: r.color }}>{r.badge}</span>
                </div>
                <h4 className="font-serif" style={{ fontSize: 20, fontStyle: "italic", marginBottom: 12 }}>{r.title}</h4>
                <p style={{ fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 1.7, marginBottom: 20 }}>{r.desc}</p>
                <div style={{ background: `${r.color}0D`, padding: 14 }}>
                  <p className="font-mono" style={{ fontSize: 10, color: r.color, marginBottom: 4, textTransform: "uppercase" }}>Mitigation Strategy</p>
                  <p style={{ fontSize: 12 }}>{r.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── MENTOR PAGE ─────────────────────────────────────────────────────────────
function MentorPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <TopHeader title="Mentor Engagement" />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Column 1: Session Timeline */}
        <div style={{ width: 256, background: colors.surfaceContainerLow, borderRight: `1px solid ${colors.outlineVariant}22`, padding: 28, display: "flex", flexDirection: "column", gap: 40, overflowY: "auto" }}>
          <div>
            <span className="font-mono" style={{ fontSize: 10, color: colors.primary, textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 6 }}>Current Session</span>
            <h2 className="font-serif" style={{ fontSize: 22, fontStyle: "italic" }}>The Philosophical Pivot</h2>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 1, background: `${colors.outlineVariant}50` }} />
            {[
              { step: "01 // Context", label: "Legacy Definition", done: true, active: false },
              { step: "02 // Dialogue", label: "Architectural Thinking", done: false, active: true, desc: "Deep-dive into the foundational values of your professional trajectory." },
              { step: "03 // Synthesis", label: "Outcome Mapping", done: false, active: false, dim: true },
            ].map((s, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 28, opacity: s.dim ? 0.4 : 1 }}>
                <div style={{
                  position: "absolute", left: 0, top: 4, width: 22, height: 22, borderRadius: "50%",
                  background: s.done ? colors.tertiary : s.active ? colors.primary : colors.outlineVariant,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: s.active ? "scale(1.2)" : "scale(1)",
                  border: s.active ? `3px solid ${colors.surfaceContainerLow}` : "none",
                }}>
                  {s.done && <span className="material-symbols-outlined" style={{ color: "white", fontSize: 12 }}>check</span>}
                  {s.active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                </div>
                <p className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: s.active ? colors.primary : colors.onSurfaceVariant, marginBottom: 4 }}>{s.step}</p>
                <h4 className="font-serif" style={{ fontSize: s.active ? 16 : 13, fontStyle: s.active ? "italic" : "normal", fontWeight: s.active ? 400 : 500 }}>{s.label}</h4>
                {s.desc && <p style={{ fontSize: 11, color: colors.onSurfaceVariant, marginTop: 6, lineHeight: 1.5 }}>{s.desc}</p>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", padding: 16, background: `${colors.surfaceContainerHighest}50` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: colors.primary }}>timer</span>
              <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase" }}>Session Duration</span>
            </div>
            <p className="font-mono" style={{ fontSize: 22 }}>14:22</p>
          </div>
        </div>

        {/* Column 2: Interaction */}
        <div style={{ flex: 1, padding: 48, overflowY: "auto", display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 4, background: colors.primary, alignSelf: "stretch", flexShrink: 0 }} />
              <div>
                <span style={{ fontFamily: "'Space Grotesk'", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.5, fontStyle: "italic", display: "block", marginBottom: 12 }}>Mentor Input // Marcus Aurelius AI</span>
                <h3 className="font-serif" style={{ fontSize: 26, lineHeight: 1.4 }}>
                  "Consider not what you are doing, but what you are becoming through the doing."
                </h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 16 }}>
              {[
                { path: "Reflection Path A", color: colors.primary, title: "Focus on the internal discipline of curation.", desc: "Articulate how the act of selection strengthens your objective judgment over subjective preference." },
                { path: "Reflection Path B", color: colors.secondary, title: "Focus on the permanence of the external archive.", desc: "Discuss the responsibility of leaving behind a structured legacy for those who follow your path." },
              ].map(r => (
                <div key={r.path} style={{ padding: 28, background: "white", borderBottom: `2px solid ${colors.outlineVariant}22`, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderBottomColor = `${r.color}66`}
                  onMouseLeave={e => e.currentTarget.style.borderBottomColor = `${colors.outlineVariant}22`}
                >
                  <p className="font-mono" style={{ fontSize: 10, color: r.color, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>{r.path}</p>
                  <h4 className="font-serif" style={{ fontSize: 18, marginBottom: 10 }}>{r.title}</h4>
                  <p style={{ fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 1.6, marginBottom: 16 }}>{r.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: r.color }}>
                    <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase" }}>Select Response</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <label className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: `${colors.onSurface}99` }}>Custom Nuance Entry</label>
              </div>
              <textarea rows={3} placeholder="Enter a thought that transcends the suggested paths..." style={{
                width: "100%", background: colors.surfaceContainerLow,
                borderTop: "none", borderLeft: "none", borderRight: "none",
                borderBottom: `2px solid ${colors.outlineVariant}33`,
                fontFamily: "'Manrope'", fontSize: 14, padding: 20, resize: "none",
                color: colors.onSurface, transition: "border-color 0.2s",
              }} />
              <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                <button style={{
                  background: colors.onSurface, color: colors.surface, padding: "8px 28px",
                  fontFamily: "'Space Grotesk'", fontSize: 10, textTransform: "uppercase",
                  letterSpacing: "0.1em", border: "none", cursor: "pointer",
                }}>Submit Entry</button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Insights & Mentor Cards */}
        <div style={{ width: 320, background: colors.surfaceContainer, borderLeft: `1px solid ${colors.outlineVariant}22`, padding: 28, overflowY: "auto", display: "flex", flexDirection: "column", gap: 40 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${colors.onSurface}0D`, paddingBottom: 14, marginBottom: 20 }}>
              <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em" }}>Session Insights</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>auto_awesome</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.primary }} />
                  <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", color: `${colors.onSurface}99` }}>Emergent Theme</span>
                </div>
                <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", marginBottom: 6 }}>Digital Stoicism</p>
                <p style={{ fontSize: 11, color: colors.onSurfaceVariant, lineHeight: 1.6 }}>The user is trending toward valuing the process over the product, a key indicator of cognitive maturity.</p>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.tertiary }} />
                  <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", color: `${colors.onSurface}99` }}>Structural Marker</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Legacy", "Virtue", "Curation"].map(t => (
                    <span key={t} className="font-mono" style={{ padding: "4px 8px", background: colors.surfaceContainerHighest, border: `1px solid ${colors.outlineVariant}33`, fontSize: 9, textTransform: "uppercase" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${colors.onSurface}0D`, paddingBottom: 14, marginBottom: 20 }}>
              <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em" }}>Unlock Mentors</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock_open</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { no: "402 // Stoic", name: "Seneca the Younger", work: "On the Shortness of Life", req: "15 Logs" },
                { no: "108 // Renaissance", name: "Leonardo da Vinci", work: "Systems Thinking & Art", req: "40 Logs" },
              ].map(m => (
                <div key={m.name} style={{ background: "white", padding: 20, position: "relative", cursor: "pointer", border: `1px solid transparent`, transition: "border 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${colors.outlineVariant}50`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
                >
                  <div style={{ position: "absolute", top: -6, right: -6, width: 24, height: 24, background: colors.surfaceContainer, border: `1px solid ${colors.outlineVariant}22`, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(3deg)" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 11, opacity: 0.3 }}>lock</span>
                  </div>
                  <p className="font-mono" style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: 4 }}>Item No. {m.no}</p>
                  <h4 className="font-serif" style={{ fontSize: 18, fontWeight: 600 }}>{m.name}</h4>
                  <p style={{ fontSize: 12, fontStyle: "italic", color: colors.onSurfaceVariant, margin: "6px 0 12px" }}>{m.work}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, height: 1, background: `${colors.outlineVariant}50` }} />
                    <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", color: colors.primary }}>Req. {m.req}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GROWTH PAGE ─────────────────────────────────────────────────────────────
function GrowthPage() {
  return (
    <div>
      <TopHeader />
      <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", gap: 64 }}>
        {/* Hero */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 32, background: colors.primary }} />
            <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: colors.primary }}>Status: Ascending</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(40px,5vw,60px)", fontStyle: "italic", marginBottom: 16 }}>Clarity Velocity</h2>
          <p style={{ fontSize: 16, color: `${colors.onSurface}99`, maxWidth: 560, lineHeight: 1.6 }}>
            Your trajectory across the intellectual landscape. Precision in intent drives the expansion of capability.
          </p>
        </section>

        {/* Dashboard */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
          {/* Chart */}
          <div style={{ background: colors.surfaceContainerLow, padding: 40, borderRadius: 4, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
              <div>
                <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.5, display: "block", marginBottom: 8 }}>01 // Metric Archive</span>
                <h3 className="font-serif" style={{ fontSize: 28, fontStyle: "italic" }}>Competency Trajectory</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="font-mono" style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>+12.4%</span>
                <p className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", opacity: 0.5 }}>Quarterly Yield</p>
              </div>
            </div>
            <div style={{ position: "relative", height: 200 }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: 0.05, pointerEvents: "none" }}>
                {[0,1,2,3].map(i => <div key={i} style={{ borderTop: `1px solid ${colors.onSurface}` }} />)}
              </div>
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 800 200">
                <path d="M0,180 Q100,160 200,170 T400,120 T600,80 T800,20" fill="none" stroke={colors.primary} strokeWidth={3} strokeLinecap="round" />
                <circle cx={800} cy={20} r={5} fill={colors.primary} />
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              {["Jan 24","Feb 24","Mar 24","Apr 24","May 24"].map(m => (
                <span key={m} className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", opacity: 0.4 }}>{m}</span>
              ))}
            </div>
          </div>

          {/* Drift Alerts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: colors.surfaceContainerHighest, padding: 24, borderLeft: `4px solid ${colors.primary}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span className="material-symbols-outlined" style={{ color: colors.primary }}>warning</span>
                <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Drift Alert</span>
              </div>
              <h4 className="font-serif" style={{ fontSize: 18, marginBottom: 8 }}>Syntactic Deviation</h4>
              <p style={{ fontSize: 13, color: `${colors.onSurface}B3`, lineHeight: 1.6, marginBottom: 16 }}>
                Your recent logs indicate a 15% shift away from the "Strategic Architecture" core path.
              </p>
              <button style={{ background: "none", border: "none", fontFamily: "'Space Grotesk'", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: colors.primary, textDecoration: "underline", cursor: "pointer" }}>Recalibrate Focus</button>
            </div>
            <div style={{ background: colors.surfaceContainer, padding: 24 }}>
              <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5, display: "block", marginBottom: 16 }}>Current Resonance</span>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14 }}>Philosophical Depth</span>
                <span className="font-mono" style={{ fontSize: 14 }}>88%</span>
              </div>
              <div style={{ height: 2, background: `${colors.onSurface}0D` }}>
                <div style={{ height: "100%", background: colors.primary, width: "88%" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Missions */}
        <section>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 40, gap: 24 }}>
            <h3 className="font-serif" style={{ fontSize: 36 }}>Weekly Missions</h3>
            <div style={{ flex: 1, height: 1, background: `${colors.onSurface}0D` }} />
            <span className="font-mono" style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.4 }}>Week 14 // 2024</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {[
              { no: "01", title: "Archival Synthesis", desc: "Consolidate research notes from the last three modules into a single authoritative whitepaper.", badge: null },
              { no: "02", title: "Node Expansion", desc: "Connect the \"Quantum Logic\" node to \"Classical Philosophy\" in your skill graph via three citations.", badge: null },
              { no: "03", title: "Velocity Audit", desc: "Review the last 7 days of logs to identify any recurring patterns of focus fragmentation.", badge: "COMPLETED" },
            ].map(m => (
              <div key={m.no} style={{ background: colors.surfaceContainerLow, padding: 28, borderRadius: 2, transition: "background 0.3s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = colors.surfaceContainerHighest}
                onMouseLeave={e => e.currentTarget.style.background = colors.surfaceContainerLow}
              >
                <span className="font-mono" style={{ fontSize: 10, color: colors.primary, marginBottom: 12, display: "block" }}>Mission {m.no}</span>
                <h4 className="font-serif" style={{ fontSize: 22, marginBottom: 12 }}>{m.title}</h4>
                <p style={{ fontSize: 13, color: `${colors.onSurface}99`, lineHeight: 1.6, marginBottom: 28 }}>{m.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {m.badge
                    ? <span className="font-mono" style={{ fontSize: 10, color: colors.tertiary, display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>{m.badge}</span>
                    : <div />
                  }
                  <span className="material-symbols-outlined" style={{ color: `${colors.primary}66`, fontSize: 20 }}>arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skill Graph */}
        <section style={{ background: "white", padding: 48, border: `1px solid ${colors.onSurface}08`, borderRadius: 4, position: "relative", overflow: "hidden" }}>
          <div style={{ marginBottom: 40 }}>
            <h3 className="font-serif" style={{ fontSize: 28 }}>Structural Skill Graph</h3>
            <p className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginTop: 6 }}>Competency Evolution Matrix</p>
          </div>
          <div style={{ position: "relative", height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(${colors.onSurface} 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {/* Center Node */}
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 120, height: 120, borderRadius: "50%", border: `2px solid ${colors.primary}`, background: colors.surfaceContainerLow, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, zIndex: 20 }}>
                <span className="font-mono" style={{ fontSize: 8, color: colors.primary, textTransform: "uppercase" }}>Core Authority</span>
                <span className="font-serif" style={{ fontSize: 14, lineHeight: 1.2 }}>Strategic Design</span>
              </div>
              {/* SVG Lines */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.2 }} viewBox="0 0 1000 400">
                <line x1={500} y1={200} x2={300} y2={120} stroke={colors.primary} strokeWidth={1} />
                <line x1={500} y1={200} x2={700} y2={120} stroke={colors.primary} strokeWidth={1} />
                <line x1={500} y1={200} x2={500} y2={360} stroke={colors.primary} strokeWidth={1} />
              </svg>
              {/* Sub-nodes */}
              {[
                { style: { left: "25%", top: "20%" }, tier: "Tier II", label: "Visual Semantics" },
                { style: { right: "25%", top: "20%" }, tier: "Tier II", label: "Systemic Logic" },
                { style: { left: "50%", bottom: "10%", transform: "translateX(-50%)" }, tier: "Tier II", label: "Ethical Inquiry" },
              ].map((n, i) => (
                <div key={i} style={{ position: "absolute", ...n.style, width: 90, height: 90, borderRadius: "50%", border: `1px solid ${colors.outlineVariant}50`, background: colors.surfaceContainer, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 10 }}>
                  <span className="font-mono" style={{ fontSize: 8, textTransform: "uppercase" }}>{n.tier}</span>
                  <span className="font-serif" style={{ fontSize: 12, lineHeight: 1.2 }}>{n.label}</span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div style={{ position: "absolute", bottom: 16, right: 16, background: colors.surfaceContainer, padding: 14, border: `1px solid ${colors.onSurface}08` }}>
              {[{ color: colors.primary, filled: true, label: "Mastered Authority" }, { color: "transparent", label: "Developing Insight" }].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: l.filled ? 8 : 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, border: l.filled ? "none" : `1px solid ${colors.outlineVariant}80` }} />
                  <span className="font-mono" style={{ fontSize: 9, textTransform: "uppercase" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${colors.onSurface}08`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", opacity: 0.4 }}>
          <div className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", lineHeight: 1.8 }}>
            Persistent Index: G-2404-001<br />
            Encryption: SHA-256 Validated<br />
            Authority: PassionPath Central Repository
          </div>
          <div className="font-serif" style={{ fontStyle: "italic", fontSize: 16 }}>The permanent record of progress.</div>
        </footer>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const pages = { home: <HomePage />, discover: <DiscoverPage />, path: <PathPage />, mentor: <MentorPage />, growth: <GrowthPage /> };

  return (
    <>
      <style>{style}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: colors.surface }}>
        {/* Desktop Sidebar */}
        <div style={{ display: "none" }} className="md-sidebar">
          <Sidebar active={page} setPage={setPage} />
        </div>
        <Sidebar active={page} setPage={setPage} />

        {/* Page Content */}
        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", height: "100vh" }}>
          {pages[page]}
        </div>

        {/* Mobile Nav */}
        <MobileNav active={page} setPage={setPage} />
      </div>
    </>
  );
}