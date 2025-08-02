<h1>Blogging Site</h1>

Empowering creators, this platform features robust user authentication, intuitive blog post creation and editing, and dynamic content display. Readers can effortlessly browse and engage with articles, all powered by a highly optimized serverless backend.

**Key Features & Capabilities:**
*   **User Authentication:** Secure signup and signin with JWT for protected routes.
*   **Content Management:** Create, edit, and publish blog posts with rich text capabilities.
*   **Dynamic Content Display:** Browse a curated list of articles or dive deep into individual posts.
*   **Responsive Design:** A fluid user interface that adapts beautifully across devices.
*   **Optimized Performance:** Leverages Cloudflare Workers and Prisma Accelerate for lightning-fast API responses and data access.
*   **Shared Validation:** Centralized schema validation ensures data integrity across frontend and backend.

**Tech Stack:**
*   **Frontend:** React, TypeScript, Vite, React Router DOM, Axios, Tailwind CSS
*   **Backend:** Hono (web framework), Cloudflare Workers (serverless platform), Prisma (ORM), Prisma Accelerate (database proxy), Hono JWT, CORS
*   **Database:** PostgreSQL (managed via Prisma)
*   **Shared Logic:** Zod (schema validation), TypeScript
*   **DevOps/Deployment:** Cloudflare Workers (for backend), Vite (for frontend)

**Data Flow:**
1.  The **Frontend** (React application) sends HTTP requests (e.g., for user authentication, creating/fetching posts) to the Backend API.
2.  The **Backend** (Hono application deployed on Cloudflare Workers) receives these requests.
3.  Hono routes process the requests, performing authentication (using Hono JWT) and input validation (using Zod schemas from the `common` package).
4.  For database operations, the Hono application interacts with **Prisma**, which in turn uses **Prisma Accelerate** to efficiently connect to the PostgreSQL database.
5.  The **PostgreSQL Database** stores user and blog post data.
6.  Responses are sent back from the Backend to the Frontend.

This architecture provides a clear separation of concerns, allows for shared code (via the `common` package), and leverages serverless functions for scalable and performant API delivery.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or Yarn
*   A Cloudflare account (for deploying the backend worker)
*   A PostgreSQL database (e.g., Supabase, Neon, or a local instance)
*   A Prisma Accelerate API key (if not using a direct database connection)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd medium-clone
    ```

2.  **Install dependencies for `common` package:**
    ```bash
    cd common
    npm install
    npm run build # To compile shared types and validation schemas
    cd ..
    ```

3.  **Install dependencies for `backend` package:**
    ```bash
    cd backend
    npm install
    ```
    *   **Configure Environment Variables:** Create a `.env` file in the `backend` directory.
        *   `DATABASE_URL`: Your PostgreSQL database connection string (e.g., from Prisma Accelerate).
        *   `JWTSECRET`: A strong, random secret key for JWT signing.
        *   Example `wrangler.toml` already contains placeholders for these. You might need to update `DATABASE_URL` and `JWTSECRET` in `backend/wrangler.toml` or use Cloudflare Workers secrets.

    ```toml
    # backend/wrangler.toml
    name = "backend"
    main = "src/index.ts"
    compatibility_date = "2025-01-22"

    [vars]
    DATABASE_URL="your_prisma_accelerate_database_url" # Replace with your actual URL
    JWTSECRET= "your_jwt_secret_key" # Replace with a strong secret
    ```

    *   **Run Prisma Migrations:**
        ```bash
        npx prisma migrate dev --name init_schema
        ```
        This will apply the database schema defined in `backend/prisma/schema.prisma`.

    ```bash
    cd ..
    ```

4.  **Install dependencies for `frontend` package:**
    ```bash
    cd frontend
    npm install
    ```
    *   **Configure Backend URL:** Update `frontend/src/config.ts` with your backend API URL. If running locally, it will be `http://localhost:8787`. If deployed, use your Cloudflare Worker URL.

    ```typescript
    // frontend/src/config.ts
    export const BACKEND_URL = "http://localhost:8787" // Or your deployed Cloudflare Worker URL
    ```

    ```bash
    cd ..
    ```

### Running the Application

1.  **Start the Backend (Cloudflare Worker):**
    ```bash
    cd backend
    npm run dev
    ```
    This will start the Hono API server, typically on `http://localhost:8787`.

2.  **Start the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    This will start the React development server, typically on `http://localhost:5173`.

Open your browser and navigate to `http://localhost:5173` to access the application.

### Deployment

#### Deploying the Backend (Cloudflare Worker)

1.  Ensure you have `wrangler` installed and configured for your Cloudflare account.
2.  From the `backend` directory:
    ```bash
    npm run deploy
    ```
    This will deploy your Hono application to Cloudflare Workers. After deployment, update `frontend/src/config.ts` with the deployed worker URL.

#### Deploying the Frontend

The frontend is a standard React application built with Vite. You can deploy it to any static hosting service (e.g., Netlify, Vercel, Cloudflare Pages, GitHub Pages).

1.  Build the frontend for production:
    ```bash
    cd frontend
    npm run build
    ```
    This will create a `dist` directory with the optimized production build.
2.  Upload the contents of the `dist` directory to your chosen static hosting provider.
