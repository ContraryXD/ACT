# Dependency Analysis Report - Final Update

## Successfully Cleaned Up

### 1. `mysql2` - REMOVED ❌

**Reason**: The project uses Supabase (PostgreSQL) as the database, not MySQL. All database operations are handled through `@supabase/supabase-js`.

### 2. `dotenv` - REMOVED ❌

**Reason**: Next.js has built-in support for environment variables through `.env.local` files. No explicit `dotenv` package is needed.

### 3. `hash-passwords` script - REMOVED ❌

**Reason**: The script references a non-existent file `scripts/hash-existing-passwords.js`. This script doesn't exist in the project.

### 4. Static data file `src/data/services.js` - REMOVED ❌

**Reason**: Static services data is no longer needed since the application now fetches services dynamically from the API (`servicesAPI.getAll()`). The Services page has been updated to use the database-driven approach instead of static data.

### 5. Metadata exports from client components - FIXED ✅

**Issue**: Several client components had `export const metadata` which is not allowed in Next.js App Router.
**Fix**: Removed metadata exports from client components and replaced with `useEffect` to set `document.title`.
**Files affected**:

- `src/app/admin/contacts/page.js`
- `src/app/admin/jobs/page.js`
- `src/app/(public)/About/page.js`

## Project Status ✅

### All Pages Have Dynamic Data

- ✅ Services page now fetches data from API instead of static file
- ✅ All other pages already use API data (news, projects, contacts, etc.)
- ✅ No remaining static data dependencies

### All Pages Have Proper Titles

- ✅ Root layout has metadata export with default title and template
- ✅ All client component pages set `document.title` in `useEffect`
- ✅ Dynamic pages (with [id], [slug]) set title after data loads

### Clean Dependencies

- ✅ No unused dependencies in package.json
- ✅ No unused scripts in package.json
- ✅ No orphaned static data files

## Remaining Dependencies (All Used) ✅

### Core Dependencies ✅

1. **next** (15.3.1) - Main framework

   - Used in: All pages, API routes, middleware
   - Files: `middleware.js`, all route files, components

2. **react** (19.0.0) - UI library

   - Used in: All components
   - Files: All `.js` files in components and pages

3. **react-dom** (19.0.0) - React DOM renderer
   - Used in: `src/lib/antd-compat.js` for React 19 compatibility

### UI & Styling Dependencies ✅

4. **antd** (5.26.0) - UI component library

   - Used extensively in: All admin pages, components
   - Files: Headers, Forms, Tables, Modals, etc.

5. **@ant-design/icons** (6.0.0) - Icon library

   - Used in: Headers, admin components, forms
   - Files: `Header.js`, `Footer.js`, admin pages

6. **@ant-design/v5-patch-for-react-19** (1.0.3) - React 19 compatibility
   - Used in: Root layout for compatibility

### Database & Authentication ✅

7. **@supabase/supabase-js** (2.50.0) - Database client

   - Used in: `src/lib/supabase.js`, `src/services/services.js`
   - Files: All API routes, service functions

8. **bcryptjs** (3.0.2) - Password hashing

   - Used in: `src/app/api/auth/login/route.js`, `src/app/api/admin/users/route.js`

9. **jsonwebtoken** (9.0.2) - JWT authentication
   - Used in: `src/app/api/auth/login/route.js`

### Utility Dependencies ✅

10. **dayjs** (1.11.13) - Date manipulation
    - Used in: Admin pages for date formatting
    - Files: `src/app/admin/projects/page.js`, `src/app/admin/news/page.js`, `src/app/admin/users/page.js`

### Development Dependencies ✅

All dev dependencies are used:

- `@eslint/eslintrc` - ESLint configuration
- `@tailwindcss/postcss` - PostCSS plugin for Tailwind
- `eslint` - Code linting
- `eslint-config-next` - Next.js ESLint config
- `tailwindcss` - CSS framework

## Commands to Install Dependencies

### Install All Required Dependencies

```bash
npm install @ant-design/icons@^6.0.0 @ant-design/v5-patch-for-react-19@^1.0.3 @supabase/supabase-js@^2.50.0 antd@^5.26.0 bcryptjs@^3.0.2 dayjs@^1.11.13 jsonwebtoken@^9.0.2 next@15.3.1 react@^19.0.0 react-dom@^19.0.0
```

### Install Development Dependencies

```bash
npm install -D @eslint/eslintrc@^3 @tailwindcss/postcss@^4 eslint@^9 eslint-config-next@15.3.1 tailwindcss@^4.1.4
```

### Install All Dependencies (Recommended)

```bash
# First, remove node_modules and package-lock.json to ensure clean install
rm -rf node_modules package-lock.json

# Install all dependencies
npm install
```

## Summary

- **Removed**: 4 unused dependencies/files (`mysql2`, `dotenv`, `hash-passwords` script, `src/data/services.js`)
- **Kept**: 10 production dependencies + 5 development dependencies
- **Result**: Cleaner, more maintainable package.json with only actively used dependencies
- **Size reduction**: Estimated ~15MB reduction in node_modules size

All remaining dependencies are actively used throughout the codebase and are essential for the application to function properly.
