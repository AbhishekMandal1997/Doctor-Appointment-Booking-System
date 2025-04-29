import React, { useState, useEffect } from 'react'
import AppointmentModal from './AppointmentModal'
import AppointmentListModal from './AppointmentListModal'
import Notification from './Notification'
import './Calendar.css'

function Calendar() {
    const [appointments, setAppointments] = useState({})
    const [selectedDate, setSelectedDate] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [listModalOpen, setListModalOpen] = useState(false)
    const [editingAppointment, setEditingAppointment] = useState(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [darkMode, setDarkMode] = useState(false)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode')
        if (savedDarkMode) {
            setDarkMode(JSON.parse(savedDarkMode))
        }
    }, [])

    useEffect(() => {
        // Save dark mode preference
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        // Apply dark mode class to body
        document.body.classList.toggle('dark-mode', darkMode)
    }, [darkMode])

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate()

    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay()

    const handleCellClick = (day) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        setSelectedDate(date)
        const dateKey = date.toISOString().split('T')[0]
        const dayAppointments = appointments[dateKey] || []
        
        if (dayAppointments.length > 0) {
            setListModalOpen(true)
        } else {
            setEditingAppointment(null)
            setModalOpen(true)
        }
    }

    const handleAppointmentClick = (day, appointment) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        setSelectedDate(date)
        setEditingAppointment(appointment)
        setModalOpen(true)
    }

    const handleSave = (data) => {
        const dateKey = selectedDate.toISOString().split('T')[0]
        setAppointments((prev) => {
            const dayApts = prev[dateKey] || []

            if (editingAppointment) {
                // Edit existing
                const updated = dayApts.map(apt => 
                    apt.id === editingAppointment.id ? { ...data, id: apt.id } : apt
                )
                return { ...prev, [dateKey]: updated }
            } else {
                // Add new
                return { 
                    ...prev, 
                    [dateKey]: [...dayApts, { ...data, id: Date.now() }] 
                }
            }
        })

        setModalOpen(false)
        setEditingAppointment(null)
        showNotification(
            editingAppointment 
                ? 'Appointment updated successfully!' 
                : 'Appointment booked successfully!'
        )
    }

    const handleDelete = (id) => {
        if (!id) return

        const dateKey = selectedDate.toISOString().split('T')[0]
        setAppointments((prev) => {
            const updated = (prev[dateKey] || []).filter(
                apt => apt.id !== id
            )
            return { ...prev, [dateKey]: updated }
        })

        setModalOpen(false)
        setListModalOpen(false)
        setEditingAppointment(null)
        showNotification('Appointment deleted successfully!')
    }

    const showNotification = (message) => {
        setNotification({ message, type: 'success' })
    }

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return (
        <div className={`calendar-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="calendar-header">
                <div className="header-top">
                    <h2>Doctor Appointment Calendar</h2>
                    <button 
                        className="theme-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
                <div className="month-navigation">
                    <button onClick={prevMonth}>&lt; Previous</button>
                    <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                    <button onClick={nextMonth}>Next &gt;</button>
                </div>
            </div>

            <div className="weekdays-header">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-cell empty"></div>
                ))}

                {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1
                    const dateKey = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                    ).toISOString().split('T')[0]

                    return (
                        <div key={i} className="calendar-cell" onClick={() => handleCellClick(day)}>
                            <span className="date-number">{day}</span>
                            <div className="appointments-preview">
                                {(appointments[dateKey] || []).map((apt) => (
                                    <div
                                        key={apt.id}
                                        className="appointment"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleAppointmentClick(day, apt)
                                        }}
                                    >
                                        {apt.time} - {apt.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            <AppointmentModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    setEditingAppointment(null)
                }}
                onSave={handleSave}
                onDelete={editingAppointment ? () => handleDelete(editingAppointment.id) : null}
                selectedDate={selectedDate}
                existingData={editingAppointment}
            />

            <AppointmentListModal
                isOpen={listModalOpen}
                onClose={() => setListModalOpen(false)}
                appointments={selectedDate ? (appointments[selectedDate.toISOString().split('T')[0]] || []) : []}
                selectedDate={selectedDate}
                onEdit={(apt) => {
                    setEditingAppointment(apt)
                    setListModalOpen(false)
                    setModalOpen(true)
                }}
                onDelete={handleDelete}
            />

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    )
}

export default Calendar
