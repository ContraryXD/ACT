import supabase from "@/lib/supabase";

// Services API
export const servicesAPI = {
   // Get all active services
   getAll: async () => {
      try {
         const { data, error } = await supabase.from("services").select("*").eq("is_active", true).order("order_index");

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get services with limit
   getLimited: async (limit = 6) => {
      try {
         const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("is_active", true)
            .order("order_index")
            .limit(limit);

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get service by slug
   getBySlug: async (slug) => {
      try {
         const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("slug", slug)
            .eq("is_active", true)
            .single();

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get service by ID
   getById: async (id) => {
      try {
         const { data, error } = await supabase.from("services").select("*").eq("id", id).single();

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   }
};

// Projects API
export const projectsAPI = {
   // Get all projects
   getAll: async () => {
      try {
         const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get featured projects
   getFeatured: async (limit = 4) => {
      try {
         const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("is_featured", true)
            .order("order_index")
            .limit(limit);

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get projects by status
   getByStatus: async (status) => {
      try {
         const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("status", status)
            .order("created_at", { ascending: false });

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   }, // Get limited projects
   getLimited: async (limit = 6) => {
      try {
         const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(limit);

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   }, // Get project by ID
   getById: async (id) => {
      try {
         const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   }
};

// News API
export const newsAPI = {
   // Get published news
   getPublished: async (limit = null) => {
      try {
         let query = supabase
            .from("news")
            .select("*, news_categories(name)")
            .eq("is_published", true)
            .order("published_at", { ascending: false });

         if (limit) {
            query = query.limit(limit);
         }

         const { data, error } = await query;

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get news by slug
   getBySlug: async (slug) => {
      try {
         const { data, error } = await supabase
            .from("news")
            .select("*, news_categories(name), users(full_name)")
            .eq("slug", slug)
            .eq("is_published", true)
            .single();

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get news by category
   getByCategory: async (categoryId, limit = null) => {
      try {
         let query = supabase
            .from("news")
            .select("*, news_categories(name)")
            .eq("category_id", categoryId)
            .eq("is_published", true)
            .order("published_at", { ascending: false });

         if (limit) {
            query = query.limit(limit);
         }

         const { data, error } = await query;

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   }
};

// Jobs API
export const jobsAPI = {
   // Get active jobs
   getActive: async () => {
      try {
         const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("is_active", true)
            .order("created_at", { ascending: false });

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get job by ID
   getById: async (id) => {
      try {
         const { data, error } = await supabase.from("jobs").select("*").eq("id", id).eq("is_active", true).single();

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   }
};

// Contacts API
export const contactsAPI = {
   // Create new contact
   create: async (contactData) => {
      try {
         const { data, error } = await supabase.from("contacts").insert([contactData]).select().single();

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   },

   // Get all contacts (admin only)
   getAll: async () => {
      try {
         const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });

         if (error) throw error;
         return { data, error: null };
      } catch (error) {
         return { data: null, error: error.message };
      }
   }
};

// Legacy functions for backward compatibility
export const fetchActiveServices = servicesAPI.getAll;
export const fetchFeaturedProjects = projectsAPI.getFeatured;
export const fetchLatestNews = newsAPI.getPublished;
