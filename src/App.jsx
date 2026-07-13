import { useEffect, useMemo, useState } from 'react'
import IlqarZeyneb from './assets/IlqarZeyneb.jpg'
import './App.css'

const MISSION_START = new Date('2026-07-13T00:00:00+04:00')
const MISSION_TARGET = new Date('2027-07-13T00:00:00+04:00')
const TOTAL_DURATION = MISSION_TARGET.getTime() - MISSION_START.getTime()

const timeUnits = [
  ['days', 'Gün'],
  ['hours', 'Saat'],
  ['minutes', 'Dəqiqə'],
  ['seconds', 'Saniyə'],
]

const pad = (value) => String(value).padStart(2, '0')

function getRemainingTime(now) {
  const distance = Math.max(MISSION_TARGET.getTime() - now.getTime(), 0)
  const days = Math.floor(distance / 86_400_000)
  const hours = Math.floor((distance / 3_600_000) % 24)
  const minutes = Math.floor((distance / 60_000) % 60)
  const seconds = Math.floor((distance / 1_000) % 60)

  return { days, hours, minutes, seconds, distance }
}

function App() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const remaining = useMemo(() => getRemainingTime(now), [now])
  const progress = Math.min(
    Math.max(
      ((now.getTime() - MISSION_START.getTime()) / TOTAL_DURATION) * 100,
      0,
    ),
    100,
  )
  const leftPercent = Math.max(100 - progress, 0)

  return (
    <main className="app-shell">
      <section className="mission-hero" aria-labelledby="page-title">
        <div className="hero-media" aria-hidden="true">
          <img src={IlqarZeyneb} alt="" />
          <div className="scanline"></div>
        </div>

        <div className="hero-content">
          <div className="mission-kicker">
            <span>Missiya saatı</span>
            <span className="status-dot">Canlı</span>
          </div>

          <div className="title-block">
            <h1 id="page-title">İlqarın geri dönməsinə qalan vaxt</h1>
          </div>

          <div className="countdown-grid" aria-label="Qalan vaxt">
            {timeUnits.map(([key, label]) => (
              <div className="time-cell" key={key}>
                <strong>
                  {key === 'days' ? remaining[key] : pad(remaining[key])}
                </strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mission-progress" aria-label="Missiya proqresi">
            <div className="progress-head">
              <span>Başlanğıc: 13.07.2026</span>
              <span>Qayıdış tarixi: 13.07.2027</span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round(progress)}
            >
              <span
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></span>
              <span className="leave-pin" aria-hidden="true"></span>
            </div>
            <div className="leave-indicator" aria-label="Məzuniyyət göstəricisi">
              {/* <span>6 ay tamam</span> */}
              <strong>Məzuniyyət</strong>
              <span>13.01.2027</span>
            </div>
            <div className="progress-foot">
              <span>{progress.toFixed(2)}% tamamlandı</span>
              <span>{leftPercent.toFixed(2)}% qaldı</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
