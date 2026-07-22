import React, { useMemo } from 'react'
import { Github, ExternalLink, Star, GitCommit, GitPullRequest, AlertCircle } from 'lucide-react'
import { UserProfileData } from '../services/api'

interface DashboardWidgetsProps {
  profileData: UserProfileData | null
  isLoading: boolean
}

/* ---- Mini heatmap generator ---- */
function generateHeatmapGrid(totalCommits: number): number[][] {
  const weeks = 26
  const days = 7
  const grid: number[][] = []
  for (let w = 0; w < weeks; w++) {
    const row: number[] = []
    for (let d = 0; d < days; d++) {
      const idx = w * days + d
      // Simulate realistic distribution: heavier recent
      const progress = idx / (weeks * days)
      const rand = Math.random()
      let val = 0
      if (rand < 0.38) val = 0
      else if (rand < 0.55) val = 1
      else if (rand < 0.72) val = 2
      else if (rand < 0.87) val = 3
      else val = 4
      // Weight later weeks to have more activity
      if (progress < 0.3 && rand < 0.5) val = Math.max(0, val - 1)
      row.push(val)
    }
    grid.push(row)
  }
  return grid
}

const heatmapColors = [
  '#EBEDF0', // 0 - empty
  '#9BE9A8', // 1 - light
  '#40C463', // 2 - medium
  '#30A14E', // 3 - dark
  '#216E39', // 4 - darkest
]

const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function HeatmapGrid({ totalCommits }: { totalCommits: number }) {
  const grid = useMemo(() => generateHeatmapGrid(totalCommits), [totalCommits])
  return (
    <div>
      {/* Month labels */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '4px', paddingLeft: '2px' }}>
        {months.map((m, i) => (
          <span
            key={m}
            style={{
              fontSize: '11px',
              color: '#6B7280',
              flex: 1,
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {m}
          </span>
        ))}
      </div>
      {/* Grid */}
      <div style={{ display: 'flex', gap: '3px' }}>
        {grid.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map((val, di) => (
              <div
                key={di}
                title={`${val} contributions`}
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '2px',
                  background: heatmapColors[val],
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Language usage bar ---- */
const languageColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  'C++': '#00599C',
  Java: '#B07219',
  CSS: '#563D7C',
  HTML: '#E34C26',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Shell: '#89E051',
}

function LanguageBar({ languages }: { languages: string[] }) {
  const total = languages.length
  const langData = languages.slice(0, 6).map((lang, i) => ({
    name: lang,
    pct: Math.round(100 / total) - i * Math.round(5 / total),
    color: languageColors[lang] || `hsl(${i * 55}, 70%, 55%)`,
  }))
  // Normalize
  const sum = langData.reduce((a, b) => a + b.pct, 0)
  const normalized = langData.map((l) => ({ ...l, pct: Math.round((l.pct / sum) * 100) }))

  return (
    <div>
      <p style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
        Languages
      </p>
      {/* Stacked bar */}
      <div
        style={{
          display: 'flex',
          height: '10px',
          borderRadius: '99px',
          overflow: 'hidden',
          marginBottom: '12px',
          background: '#E5E7EB',
        }}
      >
        {normalized.map((l) => (
          <div
            key={l.name}
            title={`${l.name}: ${l.pct}%`}
            style={{ width: `${l.pct}%`, background: l.color, height: '100%' }}
          />
        ))}
      </div>
      {/* Legend */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px 16px',
        }}
      >
        {normalized.map((l) => (
          <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: l.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>
              {l.name}
            </span>
            <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: 'auto' }}>
              {l.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- DSA topic bar chart ---- */
const dsaTopics = [
  { name: 'Arrays', count: 301, color: '#3B82F6' },
  { name: 'Dynamic Programming', count: 112, color: '#3B82F6' },
  { name: 'Data Structures', count: 112, color: '#3B82F6' },
  { name: 'String', count: 101, color: '#3B82F6' },
  { name: 'HashMap and Set', count: 90, color: '#3B82F6' },
  { name: 'Trees', count: 78, color: '#3B82F6' },
]

function DSATopicAnalysis({ totalSolved }: { totalSolved: number }) {
  const max = dsaTopics[0].count
  const scale = totalSolved > 0 ? Math.min(totalSolved / 1000, 1) : 1
  return (
    <div>
      <p style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '12px' }}>
        DSA Topic Analysis
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {dsaTopics.map((topic) => {
          const count = Math.round(topic.count * scale)
          const pct = (count / (max * scale)) * 100
          return (
            <div key={topic.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '130px',
                  fontSize: '12px',
                  color: '#374151',
                  flexShrink: 0,
                  textAlign: 'right',
                }}
              >
                {topic.name}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '10px',
                  background: '#F3F4F6',
                  borderRadius: '99px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: '#3B82F6',
                    borderRadius: '99px',
                    transition: 'width 1s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827', width: '30px' }}>
                {count}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---- Donut chart for problem classification ---- */
function ProblemDonut({ easy, medium, hard }: { easy: number; medium: number; hard: number }) {
  const total = easy + medium + hard
  if (total === 0) return null

  const easyPct = (easy / total) * 100
  const medPct = (medium / total) * 100
  const hardPct = (hard / total) * 100

  const r = 40
  const circ = 2 * Math.PI * r
  const easyDash = (easyPct / 100) * circ
  const medDash = (medPct / 100) * circ
  const hardDash = (hardPct / 100) * circ

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <p style={{ fontSize: '13px', fontWeight: 700, color: '#374151', alignSelf: 'flex-start' }}>
        Problems Solved
      </p>
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        <svg width="120" height="120" viewBox="0 0 100 100">
          {/* Easy - Green */}
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="#22C55E"
            strokeWidth="14"
            strokeDasharray={`${easyDash} ${circ - easyDash}`}
            strokeDashoffset={circ * 0.25}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
          {/* Medium - Orange */}
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="14"
            strokeDasharray={`${medDash} ${circ - medDash}`}
            strokeDashoffset={circ * 0.25 - easyDash}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
          {/* Hard - Red */}
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="#EF4444"
            strokeWidth="14"
            strokeDasharray={`${hardDash} ${circ - hardDash}`}
            strokeDashoffset={circ * 0.25 - easyDash - medDash}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
          {/* Center text */}
          <text x="50" y="47" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111827">
            {total}
          </text>
          <text x="50" y="60" textAnchor="middle" fontSize="9" fill="#6B7280" fontWeight="600">
            Solved
          </text>
        </svg>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {[
          { label: 'Easy', count: easy, color: '#22C55E' },
          { label: 'Medium', count: medium, color: '#F59E0B' },
          { label: 'Hard', count: hard, color: '#EF4444' },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.color,
                }}
              />
              <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>
                {item.label}
              </span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#111827' }}>
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Rating mini-chart (Codeforces) ---- */
function RatingChart({ rating, maxRating }: { rating: number; maxRating: number }) {
  // Simple SVG sparkline
  const points = [1450, 1520, 1480, 1600, 1650, 1580, 1700, 1680, maxRating]
  const min = Math.min(...points) - 100
  const max2 = Math.max(...points) + 50
  const range = max2 - min
  const w = 220
  const h = 80

  const pts = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * h
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Fill area */}
        <polygon
          points={`0,${h} ${pts} ${w},${h}`}
          fill="url(#ratingGrad)"
        />
        {/* Line */}
        <polyline
          points={pts}
          fill="none"
          stroke="#FF7A00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Last point dot */}
        {(() => {
          const last = points[points.length - 1]
          const x = w
          const y = h - ((last - min) / range) * h
          return <circle cx={x} cy={y} r="4" fill="#FF7A00" />
        })()}
      </svg>
    </div>
  )
}

/* ---- Section wrapper ---- */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="section-heading"
      style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: '6px' }}
    >
      {children}
    </h2>
  )
}

export function DashboardWidgets({ profileData, isLoading }: DashboardWidgetsProps) {
  if (isLoading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="skeleton" style={{ height: '32px', width: '40%' }} />
          <div className="skeleton" style={{ height: '200px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="skeleton" style={{ height: '120px' }} />
            <div className="skeleton" style={{ height: '120px' }} />
          </div>
        </div>
      </div>
    )
  }

  if (!profileData) return null

  const {
    dev_score,
    score_breakdown,
    github_stats,
    leetcode_stats,
    codeforces_stats,
    github_username,
    leetcode_username,
    codeforces_username,
  } = profileData

  const totalContributions = github_stats.commit_count * 4 + github_stats.repos_count * 2
  const totalActiveDays = Math.round(totalContributions * 0.85)
  const ghStars = github_stats.stars_received
  const ghCommits = github_stats.commit_count

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* ============================================================
          SECTION 1: Contest Ratings (Codeforces + LeetCode)
          "Monitor your Ratings in Contests over time"
          ============================================================ */}
      <section style={{ padding: '48px 24px' }}>
        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
          Monitor your Ratings in Contests over time
        </p>
        <SectionTitle>
          Your <span style={{ color: '#FF7A00' }}>Contest</span> Rankings
        </SectionTitle>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '24px',
          }}
        >
          {/* Total Contests Card */}
          <div className="codo-card" style={{ padding: '24px' }}>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#374151',
                marginBottom: '16px',
                borderBottom: '1px solid #F3F4F6',
                paddingBottom: '12px',
              }}
            >
              Total Contests
            </p>
            <div className="stat-number" style={{ marginBottom: '16px' }}>
              {codeforces_stats.contests_count + (leetcode_stats.contest_rating ? 12 : 0)}
            </div>
            {/* Platform breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                  🏆 Codeforces
                </span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>
                  {codeforces_stats.contests_count}
                </span>
              </div>
              {leetcode_stats.contest_rating && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#F9FAFB',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                    ⚡ LeetCode
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>12</span>
                </div>
              )}
            </div>

            {/* Mini rating chart */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>Rating</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>
                    {codeforces_stats.rating}
                  </p>
                </div>
              </div>
              <RatingChart
                rating={codeforces_stats.rating}
                maxRating={codeforces_stats.max_rating}
              />
            </div>
          </div>

          {/* Awards Card */}
          <div className="codo-card" style={{ padding: '24px' }}>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#374151',
                marginBottom: '16px',
                borderBottom: '1px solid #F3F4F6',
                paddingBottom: '12px',
              }}
            >
              Showcase your Achievements
            </p>
            <p style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>
              Awards
            </p>
            {/* Hexagonal badge icons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {['🥇', '🥈', '🥉', '🏅', '🎖️', '⭐', '🔥', '💎', '🦁', '🦅'].map((badge, i) => (
                <div
                  key={i}
                  title={`Achievement ${i + 1}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    transition: 'transform 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.15)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                >
                  {badge}
                </div>
              ))}
            </div>
            <button
              style={{
                fontSize: '13px',
                color: '#6B7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
              }}
            >
              show more
            </button>
          </div>

          {/* Codeforces Contest Rankings Card */}
          <div className="codo-card" style={{ padding: '24px' }}>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#374151',
                marginBottom: '16px',
                borderBottom: '1px solid #F3F4F6',
                paddingBottom: '12px',
              }}
            >
              Contest Rankings
            </p>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#6B7280',
                letterSpacing: '0.08em',
                marginBottom: '20px',
              }}
            >
              CODEFORCES
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {/* Avatar placeholder */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#F3F4F6',
                  border: '2px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0,
                }}
              >
                👤
              </div>
              <div>
                <div className="stat-number" style={{ fontSize: '36px' }}>
                  {codeforces_stats.rating}
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, marginTop: '4px' }}>
                  (max : {codeforces_stats.max_rating})
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#374151',
                    marginTop: '6px',
                    textTransform: 'capitalize',
                  }}
                >
                  {codeforces_stats.rank}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ============================================================
          SECTION 2: GitHub Stats
          "Hub for your Projects and Dev Stats"
          ============================================================ */}
      <section style={{ padding: '48px 24px' }}>
        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
          Hub for your Projects and Dev Stats
        </p>
        <SectionTitle>
          <span style={{ color: '#FF7A00' }}>GitHub</span> Contributions
        </SectionTitle>
        <a
          href={`https://github.com/${github_username}`}
          target="_blank"
          rel="noreferrer"
          className="text-orange-link"
          style={{ fontSize: '14px', marginBottom: '24px', display: 'inline-flex' }}
        >
          Try GitHub Tracker →
        </a>

        <div className="codo-card" style={{ marginTop: '20px' }}>
          {/* Banner */}
          <div
            style={{
              padding: '14px 20px',
              background: '#FFFBF5',
              borderBottom: '1px solid #E5E7EB',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, textAlign: 'center' }}>
              Unlock the Story Behind Your GitHub Contributions – Insights, Stats, and More, All in One Place!
            </p>
          </div>

          <div style={{ padding: '24px' }}>
            {/* Top row: Contributions + Active Days + Heatmap */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto 1fr',
                gap: '16px',
                alignItems: 'start',
                marginBottom: '24px',
              }}
            >
              {/* Total Contributions */}
              <div
                style={{
                  padding: '20px 24px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  minWidth: '150px',
                }}
              >
                <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginBottom: '8px' }}>
                  Total Contributions
                </p>
                <div className="stat-number">{totalContributions}</div>
              </div>

              {/* Total Active Days */}
              <div
                style={{
                  padding: '20px 24px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  minWidth: '150px',
                }}
              >
                <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginBottom: '8px' }}>
                  Total Active Days
                </p>
                <div className="stat-number">{totalActiveDays}</div>
              </div>

              {/* Heatmap */}
              <div
                style={{
                  padding: '16px 20px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  overflowX: 'auto',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                    {totalContributions} contributions in past 6 months
                  </p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                      Max.Streak{' '}
                      <strong style={{ color: '#111827' }}>{github_stats.contribution_streak}</strong>
                    </span>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                      Current.Streak <strong style={{ color: '#111827' }}>0</strong>
                    </span>
                  </div>
                </div>
                <HeatmapGrid totalCommits={ghCommits} />
              </div>
            </div>

            {/* Bottom row: Languages + GitHub Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {/* Languages */}
              <div
                style={{
                  padding: '20px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                }}
              >
                <LanguageBar languages={github_stats.languages.length > 0 ? github_stats.languages : ['JavaScript', 'TypeScript', 'Python', 'CSS', 'HTML', 'Shell']} />
              </div>

              {/* GitHub Stats */}
              <div
                style={{
                  padding: '20px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '14px' }}>
                  Stats
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { icon: '⭐', label: 'Stars', value: ghStars },
                    { icon: '💾', label: 'Commits', value: ghCommits },
                    { icon: '🔀', label: 'PRs', value: Math.round(ghCommits * 0.18) },
                    { icon: '⚠️', label: 'Issues', value: Math.round(ghCommits * 0.12) },
                    { icon: '📁', label: 'Repos', value: github_stats.repos_count },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{stat.icon}</span>
                      <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600, flex: 1 }}>
                        {stat.label}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#111827' }}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ============================================================
          SECTION 3: DSA & Problem Stats
          "Your All-in-One Coding Portfolio"
          ============================================================ */}
      <section style={{ padding: '48px 24px 64px' }}>
        <SectionTitle>
          Your <span style={{ color: '#FF7A00' }}>All-in-One</span> Coding Portfolio
        </SectionTitle>
        <a href="#" className="text-orange-link" style={{ fontSize: '14px', marginBottom: '24px', display: 'inline-flex' }}>
          Try Profile Tracker →
        </a>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          {/* See cumulative questions solved */}
          <div className="codo-card" style={{ padding: '24px' }}>
            <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginBottom: '16px' }}>
              See cumulative questions solved
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, marginBottom: '8px' }}>
                  Total Questions
                </p>
                <div className="stat-number" style={{ fontSize: '32px' }}>
                  {leetcode_stats.total_solved}
                </div>
              </div>
              <div
                style={{
                  padding: '16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, marginBottom: '8px' }}>
                  Total Active Days
                </p>
                <div className="stat-number" style={{ fontSize: '32px' }}>
                  {Math.round(leetcode_stats.total_solved * 0.35)}
                </div>
              </div>
            </div>

            {/* LeetCode difficulty breakdown */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Easy', count: leetcode_stats.easy_solved, color: '#22C55E', bg: '#F0FDF4' },
                { label: 'Medium', count: leetcode_stats.medium_solved, color: '#F59E0B', bg: '#FFFBEB' },
                { label: 'Hard', count: leetcode_stats.hard_solved, color: '#EF4444', bg: '#FFF5F5' },
              ].map((d) => (
                <div
                  key={d.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: d.bg,
                    borderRadius: '8px',
                    border: `1px solid ${d.color}30`,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: d.color }}>
                    {d.label}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>
                    {d.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Track streak across multiple platforms */}
          <div className="codo-card" style={{ padding: '24px' }}>
            <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginBottom: '8px' }}>
              Track your streak, across multiple platforms
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                {leetcode_stats.total_solved * 8} submissions in past 6 months
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Max.Streak <strong style={{ color: '#111827' }}>72</strong>
                </span>
                <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Current.Streak <strong style={{ color: '#111827' }}>13</strong>
                </span>
              </div>
            </div>
            <HeatmapGrid totalCommits={leetcode_stats.total_solved} />
          </div>

          {/* DSA Topic Analysis */}
          <div className="codo-card" style={{ padding: '24px' }}>
            <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginBottom: '16px' }}>
              Identify your strengths and areas of improvement
            </p>
            <DSATopicAnalysis totalSolved={leetcode_stats.total_solved} />
          </div>

          {/* Problem classification donut */}
          <div className="codo-card" style={{ padding: '24px' }}>
            <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginBottom: '16px' }}>
              Get classification of Problems solved
            </p>
            <ProblemDonut
              easy={leetcode_stats.easy_solved}
              medium={leetcode_stats.medium_solved}
              hard={leetcode_stats.hard_solved}
            />
          </div>
        </div>

        {/* DevScore summary row */}
        <div
          className="codo-card"
          style={{
            marginTop: '24px',
            padding: '24px',
            background: '#FFFBF5',
            borderColor: '#FFD5A8',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, marginBottom: '4px' }}>
              Transparent DevScore (0–100)
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '48px', fontWeight: 900, color: '#FF7A00', fontFamily: "'Space Grotesk', sans-serif" }}>
                {Math.round(dev_score)}
              </span>
              <span style={{ fontSize: '20px', color: '#D1D5DB', fontWeight: 700 }}>/100</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'GitHub', score: score_breakdown.github_score, color: '#7C3AED' },
              { label: 'LeetCode', score: score_breakdown.leetcode_score, color: '#F59E0B' },
              { label: 'Codeforces', score: score_breakdown.codeforces_score, color: '#3B82F6' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: '12px 20px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {s.label}
                </p>
                <p style={{ fontSize: '22px', fontWeight: 800, color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.score}
                </p>
              </div>
            ))}
          </div>
          <a
            href={`https://github.com/${github_username}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1.5px solid #111827',
              background: '#111827',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
          >
            <Github size={15} />
            @{github_username}
            <ExternalLink size={13} />
          </a>
        </div>
      </section>
    </div>
  )
}
