# Supabase Configuration - Public vs Admin Access

## Environment Variables

```env
# Public key - for read-only operations (client-side safe)
NEXT_PUBLIC_SUPABASE_URL=https://ziuwgjpgduacjatvvrzy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service key - for full CRUD operations (server-side only, never expose to client)
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Usage Pattern

### Public Operations (Client-Side)

- **Use**: `supabase` (default export)
- **Purpose**: Read-only access to public data
- **Where**: Components, pages, public API routes
- **Access Level**: Row Level Security (RLS) applies

```javascript
import supabase from "@/lib/supabase";

// Safe for client-side use
const { data } = await supabase.from("services").select("*").eq("is_active", true);
```

### Admin Operations (Server-Side Only)

- **Use**: `supabaseAdmin` (named export)
- **Purpose**: Full CRUD operations, bypass RLS
- **Where**: Admin API routes, server actions only
- **Access Level**: Full database access

```javascript
import { supabaseAdmin } from "@/lib/supabase";

// Server-side only - never expose to client
const { data } = await supabaseAdmin.from("services").insert([newService]);
```

## API Endpoints Structure

### Public Endpoints

- `GET /api/services` - Get active services
- `GET /api/projects` - Get public projects
- `GET /api/news` - Get published news

### Admin Endpoints (Protected)

- `GET /api/admin/services` - Get all services (including inactive)
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/[id]` - Update service
- `DELETE /api/admin/services/[id]` - Delete service

## Security Best Practices

1. **Never expose service key to client-side**
2. **Use middleware to protect admin routes**
3. **Implement proper authentication for admin endpoints**
4. **Service key operations should only run server-side**
5. **Use RLS policies for additional security on public data**

## Implementation Files

- `src/lib/supabase.js` - Client configuration
- `src/services/services.js` - API functions
- `middleware.js` - Route protection
- `src/app/api/` - API endpoints

This setup ensures secure separation between public read access and admin write access to your Supabase database.
