'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const months = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
]

const weekdays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি']

const holidays = {
  '2025-01-01': 'নববর্ষ',
  '2025-02-21': 'শহীদ দিবস',
  '2025-03-26': 'স্বাধীনতা দিবস',
  '2025-04-14': 'বাংলা নববর্ষ',
  '2025-05-01': 'মে দিবস',
  '2025-08-15': 'জাতীয় শোক দিবস',
  '2025-12-16': 'বিজয় দিবস',
  '2025-12-25': 'বড়দিন',
}

export default function AcademicCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const renderCalendar = (month: number) => {
    const firstDay = new Date(2025, month, 1)
    const lastDay = new Date(2025, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    let days = []
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center py-2"></div>)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `2025-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      const isHoliday = holidays[date]
      const isSelected = selectedDate === date
      days.push(
        <motion.div
          key={i}
          whileHover={{ scale: 1.1 }}
          className={`text-center py-2 cursor-pointer ${isHoliday ? 'bg-red-100 border border-red-200' : ''} ${isSelected ? 'bg-yellow-200 border border-yellow-300' : ''} rounded-lg transition-all duration-300`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="font-bold">{i}</span>
          {isHoliday && <p className="text-xs text-red-600">{isHoliday}</p>}
        </motion.div>
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-8 transition-colors duration-300">
          <ArrowLeft className="mr-2" /> হোম পেজে ফিরে যান
        </Link>
        <h1 className="text-4xl font-bold text-orange-800 mb-8 flex items-center">
          <Calendar className="mr-4" /> একাডেমিক ক্যালেন্ডার ২০২৫
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-yellow-200">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentMonth(prev => (prev - 1 + 12) % 12)}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-colors duration-300 shadow-md"
            >
              <ChevronLeft />
            </button>
            <h2 className="text-2xl font-bold text-orange-800">{months[currentMonth]}</h2>
            <button
              onClick={() => setCurrentMonth(prev => (prev + 1) % 12)}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-colors duration-300 shadow-md"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekdays.map(day => (
              <div key={day} className="text-center font-bold text-orange-800">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar(currentMonth)}
          </div>
          {selectedDate && holidays[selectedDate] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-orange-100 rounded-lg border border-orange-200"
            >
              <h3 className="text-lg font-semibold text-orange-800 mb-2">ছুটির দিন</h3>
              <p className="text-orange-700">{holidays[selectedDate]}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

