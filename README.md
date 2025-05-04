# Booking Management System

A comprehensive room booking and management platform built with React, TypeScript, and Material UI.

## 🏨 Overview

Booking Management System is a full-featured application that allows users to browse, book, and review rooms while providing administrators with tools to manage rooms, facilities, advertisements, and bookings.

## ✨ Features

### For Users

*   **Room Browsing:** View available rooms with detailed information
*   **Room Details:** Comprehensive view of room information, amenities, and images
*   **Booking System:** Book rooms with date selection and payment processing
*   **Reviews & Ratings:** Leave ratings and reviews for rooms
*   **Comments:** Add comments about rooms
*   **User Dashboard:** Manage bookings and profile information

### For Administrators

*   **Dashboard:** Overview of system statistics and metrics
*   **Room Management:** Create, update, and delete rooms
*   **Facility Management:** Manage room facilities and amenities
*   **Advertisement Management:** Create and manage promotional advertisements
*   **Booking Management:** View and manage user bookings

## 🛠️ Technology Stack

*   **Frontend:** React with TypeScript
*   **UI Framework:** Material UI (MUI)
*   **State Management:** React Context API
*   **Form Handling:** React Hook Form
*   **API Communication:** Axios
*   **Routing:** React Router
*   **Date Handling:** Day.js
*   **Charts:** Recharts
*   **Styling:** Emotion/Styled Components
*   **Build Tool:** Vite (`package.json`:12-17)


## 🖼️ Room Details System

The Room Details page provides comprehensive information about rooms, including:

*   Image gallery with responsive layout
*   Room description and pricing information
*   Facility icons and details
*   Booking card for date selection and reservation
*   Review and rating system
*   Comment section (`ReviewForm.tsx`:1-30)

## 📊 Admin Dashboard

The admin dashboard provides an overview of system statistics and management tools:

*   Room count and management
*   Facility management
*   Advertisement management
*   Booking statistics (`Dashboard.tsx`:188-241)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ahmedh997/Booking-Management-System.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Booking-Management-System
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```
4.  Start the development server (`vite.config.ts`:1-7) :
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Scripts (`package.json`:6-11)

*   `npm run dev` - Start development server
*   `npm run build` - Build for production
*   `npm run lint` - Run ESLint
*   `npm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 🙏 Acknowledgements

*   React
*   TypeScript
*   Material UI
*   Vite
