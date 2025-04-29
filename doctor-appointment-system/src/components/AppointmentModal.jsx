import React, { useState, useEffect } from 'react'
import './AppointmentModal.css'

function AppointmentModal({ isOpen, onClose, onSave, onDelete, selectedDate, existingData }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        time: '',
        description: ''
    })

    useEffect(() => {
        if (existingData) {
            setFormData({
                name: existingData.name || '',
                email: existingData.email || '',
                phone: existingData.phone || '',
                time: existingData.time || '',
                description: existingData.description || ''
            })
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                time: '',
                description: ''
            })
        }
    }, [existingData, isOpen])

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.time) {
            alert("Please fill in required fields (Name and Time)")
            return
        }
        onSave(formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

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
            <div className="modal">
                <div className="modal-header">
                    <h3>{existingData ? 'Edit' : 'Book'} Appointment</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-date">
                    {formatDate(selectedDate)}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Patient Name: <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Time: <span className="required">*</span>
                        </label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="save-button">
                            {existingData ? 'Update' : 'Book'} Appointment
                        </button>
                        {onDelete && (
                            <button
                                type="button"
                                onClick={onDelete}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppointmentModal
