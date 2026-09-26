# Chavez Tree Service Frontend

Frontend application for the Chavez Tree Service platform.

Built with Next.js, React, Apollo Client, and Tailwind CSS.

This application provides:
- customer-facing quote request flows
- review submission system
- responsive business website
- secure admin dashboard for managing operations

The frontend connects to a custom GraphQL backend API powering the full business workflow.

---

# Features

## Customer Experience

### Quote Request System
- Customer quote request form
- Service selection support
- Mobile-friendly form experience
- Real-time submission flow

### Customer Reviews
- Secure tokenized review links
- Star rating system
- Feedback submission page
- Google review encouragement for positive ratings

### Online Payments
- `/pay?token=...` — durable invoice page showing balance due, with a
  "Pay Now" button (drives traffic to the site rather than a bare Stripe link)
- `/pay/success` — payment confirmation
- No card data ever touches this app — Stripe Checkout handles it

### Business Website
- Responsive marketing pages
- Testimonials page
- Service presentation
- Contact and call-to-action sections

---

# Admin Dashboard

## Job Management
- View and manage customer jobs
- Track workflow statuses
- Update job progress
- Review customer information
- Add a job by hand for word-of-mouth clients, with an existing-client
  hint so returning customers' past jobs are never mixed up with a new one

## Payments
- Per-job payment log (check, Zelle, Venmo, Cash App, cash, card) with a
  running balance instead of a single paid/unpaid flag
- Record a payment collected by any method, including backfilling anything
  collected before the job was in the system
- One "Send Receipt" action — combined receipt, ways to pay, and review
  request, replacing two separate emails

## Employee & Service Management
- Assign employees to jobs
- Manage available services
- Track job-service relationships

## Media Management
- Upload and manage job photos
- Display completed work imagery

## Feedback Management
- View customer reviews
- Monitor low-rating alerts
- Track customer satisfaction

---

# Receipt, Payment & Review Workflow

1. Job is marked completed by admin, who sets the job total
2. Admin sends the combined receipt email — balance due, ways to pay
   (including a Pay Now link), and the review request
3. Client pays online, or by Zelle/Venmo/Cash App/check/cash reported
   back to admin, who logs anything not paid online
4. Job auto-flips to "paid" once its logged payments cover the total
5. Customer opens the tokenized review link and submits feedback through
   `/review`
6. Positive reviews encourage Google review submission
7. Low ratings notify the business internally

---

# Tech Stack

## Frontend
- Next.js
- React
- Apollo Client
- Tailwind CSS

## API & Backend Integration
- GraphQL API
- JWT Authentication

## Deployment
- Vercel (Frontend Hosting)
- Cloudflare DNS

---

# Project Structure

```bash
components/
lib/
pages/
public/
styles/
utils/