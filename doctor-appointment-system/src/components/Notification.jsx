import React, { useEffect } from 'react'
import './Notification.css'

function Notification({ message, type = 'success', onClose, duration = 3000 }) {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [duration, onClose])

    return (
        <div className={`notification ${type}`}>
            <div className="notification-content">
                <span className="notification-icon">
                    {type === 'success' ? '✓' : '⚠'}
                </span>
                <span className="notification-message">{message}</span>
            </div>
            <button className="notification-close" onClick={onClose}>&times;</button>
        </div>
    )
}

export default Notification 