# The Insighbit - Frontend

This document provides details for the frontend of The Insighbit blogging platform.

## Purpose

The frontend is a single-page application (SPA) built with React that provides a modern, responsive, and interactive user interface for readers and authors. It communicates with the backend API to fetch and display data, and to handle user interactions.

## Features

- **Rich Text Editor**:
  - Integrates the TinyMCE rich text editor for a powerful and intuitive post creation and editing experience.

- **Routing**:
  - Client-side routing is handled by React Router, providing seamless navigation between pages without full-page reloads.

- **User Experience**:
  - Toast notifications are used to provide non-intrusive feedback for user actions.
  - A clean, modern UI designed for readability and ease of use.

- **Technology Stack**:
  - **Framework**: React (with Vite)
  - **Styling**: Tailwind CSS
  - **Routing**: React Router
  - **API Communication**: Axios
  - **Rich Text Editing**: TinyMCE

## How to Use

### Prerequisites

- Node.js (v18 or later recommended)
- The backend server must be running.

### Frontend Setup

1.  From the project's `frontend` directory, install the dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env` file in the `frontend` directory and add the following variable to point to your running backend API:
    ```env
    VITE_API_URL=http://localhost:8000
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be accessible in your browser at `http://localhost:5173`.

## Pending Tasks