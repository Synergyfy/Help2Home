# Help2Home

**Help2Home** is a comprehensive Real Estate & Investment Platform designed to bridge the gap between landlords, tenants, developers, and investors. It streamlines property management, facilitates real estate investments, and simplifies the rental process.

##  Key Features

- **Landlord Dashboard**: Manage properties, verify tenants, and track rental income.
- **Tenant Dashboard**: Build a rental profile, view history, and communicate with landlords.
- **Developer Integration**: Showcase portfolios and list properties for investment.
- **Investment Marketplace**: Investors can browse and fund real estate projects.
- **Property Wizard**: Advanced tool for listing and managing property details.
- **Interactive Maps**: Integrated usage of Leaflet for proper`ty location services.

##   Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Forms**: React Hook Form + Zod Validation
- **Animations**: Framer Motion
- **Maps**: Leaflet / React-Leaflet
- **Icons**: React Icons

## Getting Started

### Prerequisites
Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Help2Home
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- \`app/\`: Application routes and pages.
- \`components/\`: Reusable UI components.
  - \`dashboard/\`: Role-specific dashboard components.
  - \`shared/\`: Common components used across the app.
- \`store/\`: Global state management stores.
- \`utils/\`: Utility functions and mock data.
- \`lib/\`: Library configurations and schema definitions.
