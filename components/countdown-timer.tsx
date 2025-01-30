'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endDate: Date
}

export function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className="flex items-center gap-2 text-xl font-mono">
      <div className="bg-primary/10 rounded-lg p-2">
        {String(timeLeft.hours).padStart(2, '0')}
      </div>
      :
      <div className="bg-primary/10 rounded-lg p-2">
        {String(timeLeft.minutes).padStart(2, '0')}
      </div>
      :
      <div className="bg-primary/10 rounded-lg p-2">
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  )
}

