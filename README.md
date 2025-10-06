# React + Vite

## Netlify Forms Sync

To make user reviews visible to everyone, the app now reads submissions from Netlify Forms through a serverless function (`netlify/functions/get-spot-reviews.js`). Before deploying, set the following environment variables in your Netlify site settings:

- `NETLIFY_AUTH_TOKEN`: Personal access token with **Forms: Read** permission so the function can call the Netlify REST API.
- `NETLIFY_SPOT_REVIEWS_FORM_ID` (optional): The ID of the `spot-reviews` form. If omitted, the function will look it up by name on every request.

After adding the variables, redeploy the site. You can test locally with `netlify dev` so the SPA fetches `/.netlify/functions/get-spot-reviews?category=...&spotId=...` and merges remote submissions with local drafts.

## Supabase integration

Click tracking and the new `reviews` table are stored in Supabase. Provide the credentials in a `.env` file (see `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These variables are required for the client-side Supabase SDK. The app logs click events to the `click_events` table and reads/writes reviews from the `reviews` table. When the variables are missing the UI will still render, but remote sync and analytics calls will fail.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
