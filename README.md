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

# Review Workflow

1. Job is marked completed by admin
2. Backend sends secure review request email
3. Customer opens tokenized review link
4. Customer submits feedback through `/review`
5. Positive reviews encourage Google review submission
6. Low ratings notify business internally

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