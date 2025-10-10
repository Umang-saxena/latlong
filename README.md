# India Vaccination Dashboard

An interactive web application for visualizing and analyzing COVID-19 vaccination coverage across Indian states. Built with Next.js, this dashboard provides real-time insights through maps, charts, statistics, and data tables.

## Features

- **Interactive India Map**: Hover and click on states to view vaccination details using jVectorMap.
- **Vaccination Statistics**: Key metrics displayed in cards, including total population, first dose, second dose, and fully vaccinated percentages.
- **Data Visualizations**: Bar charts and pie charts for vaccination rates using Recharts.
- **Data Table**: Sortable and filterable table of state-wise vaccination data.
- **Filters**: Select by region (e.g., North, South) and adjust vaccination rate ranges with sliders.
- **State Details Dialog**: Detailed view for selected states.
- **Responsive Design**: Optimized for desktop and mobile using Tailwind CSS.
- **Loading States**: Smooth loading animations with spinning icons.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Maps**: React jVectorMap (India-specific)
- **Icons**: Lucide React
- **Data**: Supabase (for vaccination data storage and API)
- **Deployment**: Vercel

## Prerequisites

- Node.js (version 18 or higher)
- A Supabase account and project for vaccination data (or modify API to use another source)

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd latlong
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Usage

- **Navigate the Map**: Hover over states for quick stats; click to open detailed dialogs.
- **Apply Filters**: Use the region selector and rate slider to filter displayed data.
- **View Charts and Tables**: Explore vaccination trends and compare states.
- **Data Source**: Vaccination data is fetched from the `/api/vaccination` endpoint, which queries Supabase.

## API

- **Endpoint**: `/api/vaccination`
- **Method**: GET
- **Response**: JSON array of state vaccination data (e.g., state name, total population, doses administered).
- **Source**: Data stored in Supabase; modify `app/api/vaccination/route.ts` for custom data sources.

## Deployment

Deploy to Vercel for easy integration with Next.js:

1. Push your code to a GitHub repository.
2. Connect the repo to Vercel.
3. Add environment variables in Vercel's dashboard.
4. Deploy and access your live dashboard.

For other platforms, ensure environment variables are set and build with `npm run build`.

## Contributing

Contributions are welcome! Please open issues or submit pull requests on GitHub.

## License

This project is open-source. Check the license file for details.
