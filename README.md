# Blog Frontend Project

This project is a modern blog application built using React.js. It uses a variety of tools and libraries to provide a comprehensive blog experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)

## Features

- Create, read, update, and delete blog posts
- User authentication
- Responsive design
- Image upload and storage

## Tech Stack

- **Frontend:** React.js
- **State Management:** Redux Toolkit
- **Data Fetching:** React Query
- **Styling:** Tailwind CSS, Flowbite
- **Storage:** Supabase
- **API:** RESTful API

## Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm or yarn

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Salman-A-Asaad/Salman_Blog.git
   cd blog-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=
   VITE_SUPABASE_KEY=
   VITE_SUPABASE_IMG_URL=
   VITE_SERVER_URL=
   ```

## Running the Project

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser if the same port.
