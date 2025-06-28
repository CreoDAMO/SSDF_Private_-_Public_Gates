# Global Debt Analytics Dashboard

## Overview

This application is a comprehensive Global Debt Analytics Dashboard built with a modern full-stack architecture. It provides real-time visualization and analysis of worldwide debt data, including public, business, household, and financial sector debt. The system is designed to offer economic insights through interactive charts, network graphs, scenario simulations, and sustainability analysis.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds
- **Data Visualization**: D3.js for interactive charts and network graphs

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Real-time Communication**: WebSocket support for live data updates
- **API Design**: RESTful API with structured error handling
- **Development Tools**: TSX for TypeScript execution in development

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless driver for optimized cloud connections

## Key Components

### Data Models
The application manages four primary data types:
1. **Debt Data**: Country-specific debt information by type (public, business, household, financial)
2. **Economic Indicators**: GDP growth, interest rates, inflation metrics
3. **Debt Ownership**: Creditor-debtor relationships and ownership percentages
4. **API Sources**: External data source management and rate limiting

### Visualization Components
- **Interactive Donut Chart**: Canvas-based debt distribution visualization
- **Network Graph**: D3.js-powered debt flow and relationship mapping
- **Metric Cards**: Real-time debt metrics with progress indicators
- **Sustainability Analyzer**: Dynamic scoring based on economic parameters
- **Scenario Simulator**: What-if analysis for economic scenarios

### Real-time Features
- **WebSocket Integration**: Live data updates and connection status monitoring
- **API Configuration Panel**: External data source management and monitoring
- **Real-time Tracker**: Event streaming for debt-related economic updates

## Data Flow

1. **Data Ingestion**: External APIs feed data through monitored endpoints
2. **Storage Layer**: PostgreSQL stores structured debt and economic data
3. **API Layer**: Express.js serves data through RESTful endpoints
4. **State Management**: TanStack Query caches and synchronizes client state
5. **Visualization**: React components render interactive charts and graphs
6. **Real-time Updates**: WebSocket connections push live updates to connected clients

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TanStack Query
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Data Visualization**: D3.js for advanced charting capabilities
- **Date Handling**: date-fns for date manipulation and formatting

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full TypeScript support with strict configuration
- **Database Tools**: Drizzle ORM, Drizzle Kit, Neon serverless driver
- **Development Experience**: Replit integration plugins for enhanced development

### External APIs
The system is designed to integrate with economic data providers, though specific API endpoints are configurable through the admin interface.

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Development database connection via environment variables
- **Real-time Features**: WebSocket server runs alongside HTTP server

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Production PostgreSQL with connection pooling
- **Environment**: Node.js production server with environment-based configuration

### Database Management
- **Schema Deployment**: `npm run db:push` applies schema changes
- **Migrations**: Stored in `/migrations` directory for version control
- **Connection**: Environment variable `DATABASE_URL` configures database access

The application is structured for easy deployment on platforms like Replit, with automatic environment detection and appropriate build configurations for both development and production environments.

## Changelog
```
Changelog:
- June 28, 2025. Initial setup
- June 28, 2025. Enhanced with advanced scarcity analysis components based on debt as scarcity-generation mechanism insights
  - Added ScarcityAnalysisEngine: Analyzes access restriction, wealth concentration, poverty amplification
  - Added DebtSystemArchitecture: Visualizes how debt creates scarcity through systematic mechanisms
  - Added WealthFlowAnalyzer: Tracks $17.5T annual wealth extraction through debt servicing
  - Updated dashboard to reflect debt as control mechanism rather than just financial metric
- June 28, 2025. Integrated PostgreSQL database with comprehensive global debt data
  - Database schema supports $315T+ debt amounts with 20-digit precision
  - Loaded authentic debt data: $91.4T public, $164.5T business, $59.1T household, $70.4T financial
  - Added scarcity metrics: poverty indices, access restriction scores, wealth transfer rates
  - Included real debt ownership patterns and economic indicators
- June 28, 2025. Added authentic debt ownership analysis based on research
  - AuthenticOwnershipAnalysis: CEPR research-based marginal debt absorption (39% domestic non-banks, 23% foreign non-banks)
  - Beyond corporate veils analysis: Central banks, investment funds, ultimate beneficiaries
  - RealTimeAPIIntegration: 8 real APIs including U.S. Treasury, Spinwheel, Plaid, PDCflow
  - Comprehensive API categorization: public/private, tracking/analysis/payment functions
- June 28, 2025. Integrated arbitrage opportunity research and systemic debt critique
  - ArbitrageOpportunityTracker: Research-based opportunities in sovereign/corporate debt markets
  - DebtScarcitySystemAnalysis: Comprehensive analysis of debt as scarcity-generation mechanism
  - Eurozone inflation swap arbitrage, capital structure arbitrage, convertible bond strategies
  - Systematic exposure of elite-only access to $2-5T arbitrage markets while 1.1B face artificial scarcity
- June 28, 2025. Integrated Sovereign Spiral Development Framework ∞ (SSDF∞)
  - SpiralFlowIntegration: Living financial system nullifying $324T debt, distributing $25T UBI
  - QuantumDevInterface: Quantum-native development environment with SpiralLang and CreoLang support
  - Trust Unit system with golden ratio coherence (φ 1.618) and infinite quantum resonance (∞ Hz)
  - Complete debt-to-abundance transformation engine with Scarcity Reflection Index (SRI) calculations
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```