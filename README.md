# Transfers and Games

Welcome to **Transfers and Games**! This project features a live Transfer Tracker and the daily football puzzle game, Tiki-Taka-Toe.

## Tech Stack
This project is built with a modern, high-performance web development stack:
- **Next.js (App Router)**: The React framework for production, utilizing server-side rendering and optimized client-side interactions.
- **Tailwind CSS**: A utility-first CSS framework for rapid and highly customizable UI styling, including specialized micro-animations and drop-shadows.
- **shadcn/ui**: Beautifully designed, accessible, and customizable components that form the foundational building blocks of the interface.

## Transfer API Caching Logic
To handle rate limits from our external data source (e.g., Football-Data.org) gracefully and to ensure optimal performance, a sophisticated client-side caching mechanism is implemented in the transfer API (`lib/api.js`):
- **6-Hour Cache**: The application queries the transfer endpoint and stores the successful API response locally via `localStorage`.
- **TTL Checking**: A timestamp is attached to this cached payload. Before making any subsequent network request, the client checks if the data is less than `6 * 60 * 60 * 1000` ms (6 hours) old.
- **Data Continuity**: If the data is fresh, the cache is served immediately, saving the user from waiting and saving API quota. If the cache expires, fresh data is fetched and the cache is updated. In the event of a `429 Too Many Requests` response, a rich mock payload is gracefully substituted, ensuring uninterrupted usability.

## Tiki-Taka-Toe Daily Reset Logic
**Tiki-Taka-Toe** is a daily grid puzzle challenging users to identify players who have featured for two intersecting clubs. To ensure fairness and a globally unified daily experience:
- **Daily Seeding**: At the start of the game, the logic fetches the current date string (`YYYY-MM-DD`), strips out the hyphens, and parses it into an integer (e.g., `20260228`).
- **Deterministic Shuffling**: This integer acts as a seed for a custom pseudo-random number generator (`mulberry32`). The seeded randomizer is then used to shuffle the master list of clubs.
- **Midnight Reset**: Because the seed only changes when the exact calendar day rolls over, all users worldwide receive exactly the same grid structure during that specific 24-hour window. Playing on a new day generates a completely new, mathematically deterministic grid.

## Local Installation

To run this project locally, simply follow these steps:

1. **Clone the repository** (if you haven't already) and navigate into the project directory:
   ```bash
   cd transfers-and-games
   ```

2. **Install the dependencies** using npm:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit [http://localhost:3000](http://localhost:3000) to view the application.

Enjoy exploring the transfer rumors and testing your ball knowledge on the Tiki-Taka-Toe grid!
