Automation Builder Frontend

A Next.js + React Flow web app for visually creating email automation workflows with drag-drop nodes.

🚀 Features

Visual Automation Builder

React Flow Node System

Delay Node + Email Action Node

Save & Edit Workflows

Run Test Automations

Tailwind CSS UI

Production Ready

🛠 Tech Stack

Next.js 14+

React Flow

Tailwind CSS

Axios

JavaScript / React

📁 Project Structure
client/
 ├── app/
 ├── components/
 ├── lib/
 ├── public/
 └── tailwind.config.js

📦 Install Dependencies
npm install

⚙️ Environment Variables (.env.local)
NEXT_PUBLIC_API_URL=https://your-backend-url.com

🔗 API Setup (lib/api.js)
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

▶️ Run Project
npm run dev

🧠 App Pages
Page	Route
Home	/
Create Automation	/editor/new
Edit Automation	/editor/:id
🧩 Node Types
Action Node

Sends Email

Delay Node

Time-based pause

Relative or Specific Date

🎨 UI Highlights

Flow Toolbar

Responsive Design

Error UI below input

Button reusable styles

🚀 Production Deploy (Vercel)

Build Command:

npm install && npm run build
