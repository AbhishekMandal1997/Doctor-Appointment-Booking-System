# Doctor Appointment System

A simple and interactive doctor appointment booking system built with React and Vite. This project provides a calendar interface where users can view, book, edit, and delete doctor appointments easily. It also supports dark mode for better user experience.

## Features

- Monthly calendar view with navigation between months
- Click on a date to add a new appointment or view existing appointments
- Add, edit, and delete appointments with time and patient name
- Appointment list modal to view all appointments on a selected date
- Dark mode toggle with preference saved in localStorage
- Notifications for successful booking, updating, and deleting of appointments

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd doctor-appointment-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port shown in the terminal).

## Usage

- Use the calendar to navigate between months.
- Click on any date cell to add a new appointment or view existing ones.
- In the appointment modal, fill in the appointment details and save.
- Use the appointment list modal to edit or delete existing appointments.
- Toggle dark mode using the moon/sun icon in the header.

## Project Structure

- `src/components/Calendar.jsx`: Main calendar component managing appointments and UI.
- `src/components/AppointmentModal.jsx`: Modal for adding/editing appointments.
- `src/components/AppointmentListModal.jsx`: Modal to list and manage appointments for a selected date.
- `src/components/Notification.jsx`: Notification component for user feedback.
- `src/App.jsx`: Root app component rendering the calendar.
- `src/main.jsx`: Entry point rendering the app.

## Technologies Used

- React 19
- Vite
- CSS for styling


