# Tiershow

## Live Demo
[https://tiershow.vercel.app/](https://tiershow.vercel.app/)

Tiershow is a Next.js web application for managing and displaying events with tiered access and authentication. It uses Supabase for backend services and Clerk for authentication.

## Features
- Event grid display
- Tier-based popups
- User authentication (Clerk)
- Supabase integration
- Custom UI components (Badge, Button, Card, etc.)
- Tailwind CSS styling

## Project Structure
```
app/                # Main app pages and providers
components/         # React components and UI elements
lib/                # Utility functions and Supabase integration
supabase/           # Supabase config and SQL scripts
```

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure Supabase:**
   - Update `supabase/config.toml` and `lib/supabase/client.ts` with your Supabase credentials.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server

## Technologies Used
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Clerk](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## License
MIT
