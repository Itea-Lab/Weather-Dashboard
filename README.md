This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
Setup type: App Router

# Getting Started
First, create .env.local file in the root of the project and add your environment variables:

```env
JWT_SECRET=<secret-jwt-key>
JWT_EXPIRES_IN=<duration>
ADMIN_USERNAME=<username>
ADMIN_NAME=<name>
ADMIN_PASSWORD_HASH=<password$Hash>
ADMIN_EMAIL=<email>
ADMIN_ROLE="admin"
TEST_USERNAME="testuser"
TEST_NAME=Test User
TEST_PASSWORD_HASH=<password$Hash>
TEST_EMAIL=<email>
TEST_ROLE="user"
# InfluxDB configuration
INFLUXDB_ROUTE=http://localhost:8086
INFLUXDB_TOKEN=<your-influxdb-token>
INFLUXDB_ORG=<your-influxdb-org>
INFLUXDB_BUCKET=<your-influxdb-bucket>
```
Second, install the dependencies:

```bash
pnpm install
```
Third, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Install Shadcn
```
pnpm i shadcn@latest --strict-peer-dependencies
```

## Using Shadcn components
Add Shadcn components to your project by running the following command:

```
pnpm dlx shadcn-ui@latest add <component-name>
```
Shadcn will automatically install the component and its dependencies, and add the import statement to your project (check folder /component/ui/).

## Folder structure
```
.next/                  # Next.js build output directory
node_modules/           # Node.js modules directory
src/                        # Source code for the application
├── app/                    # App directory for Next.js
│   ├── api/                # API routes
│   ├───|── auth/           # Authentication route
│   ├───|───|── route.ts    
│   ├───|── <otherAPI>/     # Other API routes
│   ├───|───|── route.ts    
│   ├── components/         # Reusable components
│   ├───|── ui/             # UI components (Shadcn)
│   ├── context/            # Context providers for state management
│   ├── lib/                # Utility functions and libraries
│   ├───|── auth.ts         # Authentication utilities
│   ├───|── api.ts          # API utilities
│   ├───|── influxdb.ts     # InfluxDB utilities
│   ├───|── utils.ts        # General utility functions
│   ├── types/              # TypeScript type definitions
│   ├── dashboard/          # Dashboard main page
│   ├───|───|── page.tsx
│   ├───|───|── layout.tsx
│   ├───|── subpage/        # Subpage of the dashboard
│   ├───|───|── page.tsx
│   ├── globals.css         # Global CSS styles
│   ├── layout.tsx
│   ├── page.tsx            # Main entry point for the app
├── middleware.ts           # Middleware for handling requests
public/                 # Static assets (images, fonts, etc.)
.env.local              # Environment variables for local development
.env.production         # Environment variables for production
.gitignore              # Files & directories to ignore in Git
.dockerignore           # Files & directories to ignore in Docker builds
Dockerfile              # Dockerfile for building the application
component.json          # Shadcn component configuration
next.config.ts          # Next.js configuration file
package.json            # Project metadata and dependencies
pnpm-lock.yaml          # Lockfile for package versions
tsconfig.json           # TypeScript configuration file
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Data Fetching
the sensor data must match the following format:
```json
{
  "id": "1",
  "timestamp": "2023-10-01T12:00:00Z", # any type
  "anySensorData": "number",
}
```
## Production Build
To create a production build of your Next.js app, run the following command:

```bash
pnpm build
```
This will generate an optimized version of your application in the `.next` directory.
## Running in Production
To run your Next.js app in production mode, you can use the following command:

```bash
pnpm start
```
This will start the Next.js server in production mode, serving the optimized build created by the `pnpm build` command.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Build Docker image
```
docker build -t itea-edge-hub .

```