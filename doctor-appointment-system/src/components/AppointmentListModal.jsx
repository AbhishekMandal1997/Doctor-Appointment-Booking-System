import React from 'react'
import './AppointmentListModal.css'

function AppointmentListModal({ isOpen, onClose, appointments, selectedDate, onEdit, onDelete }) {
    if (!isOpen) return null

    const formatDate = (date) => {
        if (!date) return ''
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="modal-backdrop">
            <div className="modal appointment-list-modal">
                <div className="modal-header">
                    <h3>Appointments for {formatDate(selectedDate)}</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="appointment-list">
                    {appointments.length === 0 ? (
                        <p className="no-appointments">No appointments scheduled for this date.</p>
                    ) : (
                        appointments.map((apt) => (
                            <div key={apt.id} className="appointment-card">
                                <div className="appointment-time">{apt.time}</div>
                                <div className="appointment-details">
                                    <h4>{apt.name}</h4>
                                    {apt.email && <p>Email: {apt.email}</p>}
                                    {apt.phone && <p>Phone: {apt.phone}</p>}
                                    {apt.description && <p>Description: {apt.description}</p>}
                                </div>
                                <div className="appointment-actions">
                                    <button 
                                        className="edit-button"
                                        onClick={() => onEdit(apt)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-button"
                                        onClick={() => onDelete(apt.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="modal-actions">
                    <button className="add-button" onClick={() => onEdit(null)}>
                        Add New Appointment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AppointmentListModal 