# S H P F K

A modern, production-ready e-commerce platform built with Next.js 15 and the latest web technologies. This project demonstrates best practices in modern web development, from architecture to deployment.

## Tech Stack

- **Framework**: Next.js
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Code Quality**:
  - Prettier for code formatting
  - ESLint for code linting
  - Husky for git hooks
  - lint-staged for running linters on staged files
  - commitlint for conventional commit messages

## Key Features

- **Server-First Architecture**: Leverages Next.js 15's powerful server components for optimal performance and SEO
- **Type-Safe Development**: End-to-end type safety with TypeScript and Zod schema validation
- **Modern Authentication**: Secure, cookie-based auth flow with refresh token rotation
- **Responsive UI**: Beautiful, accessible interface built with shadcn/ui and Tailwind CSS
- **Performance Optimized**: Server-side rendering with strategic client hydration
- **Data Management**: Efficient data fetching with React Query and built-in caching

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd shop-fake
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Data Source

This project uses [DummyJSON](https://dummyjson.com/) as its data source, providing mock data for products, users, and other e-commerce related content.

## Features

Detailed documentation about features and pages will be added soon.

## Architecture

### Homepage

The homepage is built with a mix of server and client components, optimizing for both performance and user experience.

#### Navigation

- **Categories Menu**:

  - Server-side rendered component (`src/components/common/Navbar/Categories.tsx`)
  - Fetches product categories directly from DummyJSON API
  - Uses Suspense boundary for smooth loading states

- **Authentication Button**:
  - Client-side component (`src/components/common/AuthButton.tsx`)
  - Uses React Query for client-side user data fetching
  - Makes requests to internal API endpoint (`/api/auth/me`)
  - Displays user avatar when authenticated or login button when not
  - Authentication state is managed via httpOnly cookies for security

#### Content Sections

All main content sections are server-side rendered for optimal performance:

- **Featured Products** (`src/components/page/home/FeaturedProducts.tsx`):

  - Server component that displays highlighted products
  - Direct server-side data fetching from DummyJSON API

- **Categories Preview** (`src/components/page/home/CategoriesPreview.tsx`):
  - Server component showcasing product categories
  - Server-side data fetching for optimal performance

#### API Routes

- **/api/auth/me**:
  - Internal API route for user authentication
  - Validates authentication using httpOnly cookie
  - Proxies requests to DummyJSON API
  - Returns user data if authenticated, error if not

### Shop Page

The shop page (`/shop`) provides a rich e-commerce browsing experience with the following features:

#### Advanced Filtering and Sorting

- **Filter Panel**: Allows users to filter products by category
- **Sorting Options**: Products can be sorted by:
  - Title
  - Brand
  - Category
  - Price
  - Rating
- **Sort Order**: Customizable ascending/descending order
- **URL-based State**: Filter and sort preferences are preserved in URL parameters for shareable links

#### Server-Side Product Loading

- Products are fetched server-side through the `ProductsGrid` component
- Utilizes Next.js's built-in caching with `cache: 'force-cache'` for optimal performance
- Pagination support for handling large product sets

#### Shopping Cart Integration

- Cart status visible in the navigation bar
- Displays real-time item count for logged-in users
- Direct navigation to cart page
- Persistent cart state across sessions

#### Product Page

The product page (`/shop/product/[productId]`) is currently implemented as a placeholder with limited functionality:

- **Product Display**: Shows product details including images, title, description, and price
- **Add to Cart**: The "Add to Cart" functionality is currently a placeholder that:
  - Does not persist data to any database
  - Will be updated in future iterations to make requests to a mock server
  - Cart data will not persist when navigating away or refreshing the page
  - Serves as a demonstration of the intended user interface

Future plans include implementing a temporary cart storage solution that will:

- Handle cart operations through client-side state management
- Simulate API requests to a mock server
- Provide feedback on cart operations
- Reset on page refresh or navigation (by design)

#### Cart Page

The cart page (`/cart`) demonstrates client-side state management with limited persistence:

- **State Management**:
  - Uses React's `useReducer` for local state management
  - Handles cart items, promo codes, and order summary
  - Simulates data fetching with mock cart items
  - All state is reset on page refresh

- **Features**:
  - Cart item quantity adjustment
  - Item removal
  - Promo code application (mock functionality)
  - Order summary calculation
  - Empty cart state handling

- **Components**:
  - `PageDataWrapper`: Simulates async data fetching
  - `WithCartState`: Client-side state container using `useReducer`
  - `CartItems`: Manages item display and interactions
  - `PromoCode`: Handles promo code input
  - `OrderSummary`: Displays order totals

Note: Like the product page, the cart functionality is currently limited to client-side state and does not persist data. Future implementations will include server-side state management and data persistence.

### Login Page

The login page implements a secure authentication flow with modern form handling and validation. You can use any user's credentials from dummyjson.com/users.

#### Client-Side Implementation

- **Form Handling**:
  - Uses React Hook Form for form state management
  - Zod schema validation for type-safe form data
  - React Query for API communication and state management

#### Authentication Flow

1. User submits credentials through the validated form
2. Form data is sent to internal API endpoint (`/api/auth/login`)
3. Server validates credentials with DummyJSON API
4. On successful authentication:
   - Server sets httpOnly cookies for both accessToken and refreshToken
   - User is redirected to the shop page
   - UI updates to show authenticated state

#### API Routes

- **/api/auth/login**:
  - Handles user authentication
  - Validates credentials against DummyJSON API
  - Sets secure httpOnly cookies for tokens
  - Returns user data on successful login

## API Architecture Decisions

The project implements internal API endpoints (`/api/auth/login` and `/api/auth/me`) instead of directly accessing the DummyJSON API from the client for several important reasons:

### Security and Control

- Complete control over authentication flow and token management
- Server-side implementation of security measures and token refresh logic
- Ability to sanitize and transform response data before client consumption
- Keeping sensitive operations server-side where they belong

### Cookie Management

- DummyJSON's Set-Cookie headers lack `Domain` and `SameSite` attributes, which creates several limitations:

  - Without a `Domain` attribute, cookies default to the exact domain that set them (dummyjson.com)
  - This means the cookies won't be accessible from our application's domain
  - Modern browsers default `SameSite` to `Lax` when not specified, which:
    - Prevents cookie transmission in cross-site requests
    - Blocks cookie access in cross-origin contexts
    - Makes it impossible to use the tokens in client-side API calls to dummyjson.com

- Our internal endpoints solve these issues by:
  - Setting appropriate `Domain` attribute matching our application's domain
  - Explicitly configuring `SameSite` attribute for security
  - Ensuring cookies are accessible within our application's context
  - Maintaining proper security with `httpOnly`, `secure`, and `sameSite=strict` flags

### API Evolution and Abstraction

- Creates a clean abstraction layer between frontend and external services
- Simplifies future migration from DummyJSON to production APIs
- Enables adding features like caching or rate limiting without client changes
- Follows Backend-for-Frontend (BFF) pattern for optimal frontend-backend integration

### Cross-Origin Considerations

- Eliminates CORS concerns by keeping requests same-origin
- Removes need for complex CORS configuration
- Improves security by preventing direct external API access

## Technical Excellence

### Performance Optimization

- Server components for reduced JavaScript bundle size
- Automatic image optimization with Next.js Image component
- Strategic code splitting and lazy loading
- Efficient data caching with React Query

### Security Best Practices

- HttpOnly cookies for token storage
- Server-side validation of all user inputs
- Protected API routes with proper error handling
- Secure authentication flow with token refresh mechanism

### Developer Experience

- Strict TypeScript configuration for type safety
- Automated code formatting with Prettier
- Git hooks with Husky for code quality
- Conventional commits enforced by commitlint
- Efficient development workflow with hot reloading

### Code Quality

- Component-driven architecture
- Clean code principles and consistent naming conventions
- Separation of concerns between UI, logic, and data layers
- Reusable custom hooks and utilities
- Comprehensive error handling

### Modern Development Patterns

- React Server Components for optimal rendering strategy
- Compound components for complex UI elements
- Custom hooks for shared logic
- Type-safe API layer with Zod validation
- Responsive design with mobile-first approach

## Contributing

1. Ensure you have Husky hooks installed:

   ```bash
   npm run prepare
   ```

2. Create a new branch for your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit using conventional commit messages:

   ```bash
   git commit -m "feat: add new feature"
   ```

4. Push your changes and create a pull request.
