# ChavezTree Frontend

This is the frontend application for ChavezTree Tree Service, built using Next.js and Apollo Client.

It provides the customer-facing experience for requesting quotes, viewing job updates, and submitting reviews.

It also includes an internal admin dashboard for managing jobs, services, employees, and customer feedback.

---

## Features

### Customer Side
- Quote request form
- Review system via email links
- Feedback submission page (`/review`)

### Admin Side
- Job dashboard
- Status updates (pending → completed)
- Employee assignment
- Service management
- Photo uploads
- Feedback viewing (read-only)

---

## Review System Flow

1. Customer receives review request email after job completion
2. Email contains rating links (1–5 stars)
3. Customer is redirected to `/review` page
4. Customer submits feedback on-site
5. Backend stores feedback and sends notifications if rating is low
6. High ratings are encouraged to leave a Google review

---

## Tech Stack

- Next.js
- React
- Apollo Client
- Tailwind CSS

---

## 📁 Project Structure
components/
lib/
pages/
public/
styles/
utils/
---

## ▶️ Running the App

```bash
npm install
npm run dev

---

## ▶️ Running the App

```bash
npm install
npm run dev
