import supabase, { supabaseAdmin } from "@/lib/supabase";

// Services API
export const servicesAPI = {
  // Get all active services (public)
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
      const { data, error } = await supabase.from("services").select("*").eq("is_active", true).order("order_index").limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get service by slug
  getBySlug: async (slug) => {
    try {
      const { data, error } = await supabase.from("services").select("*").eq("slug", slug).eq("is_active", true).single();

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
  },
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
      const { data, error } = await supabase.from("projects").select("*").eq("is_featured", true).order("order_index").limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get projects by status
  getByStatus: async (status) => {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("status", status).order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }, // Get limited projects
  getLimited: async (limit = 6) => {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(limit);

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
  },
};

// News API
export const newsAPI = {
  // Get published news
  getPublished: async (limit = null) => {
    try {
      let query = supabase.from("news").select("*, news_categories(name)").eq("is_published", true).order("published_at", { ascending: false });

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
      const { data, error } = await supabase.from("news").select("*, news_categories(name), users(full_name)").eq("slug", slug).eq("is_published", true).single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get news by category
  getByCategory: async (categoryId, limit = null) => {
    try {
      let query = supabase.from("news").select("*, news_categories(name)").eq("category_id", categoryId).eq("is_published", true).order("published_at", { ascending: false });

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
};

// Jobs API
export const jobsAPI = {
  // Get active jobs
  getActive: async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false });

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
  },
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
  },
};

// Admin API - Uses service key for full control (server-side only)
export const adminAPI = {
  // Services Admin
  services: {
    // Get all services including inactive (admin only)
    getAll: async () => {
      try {
        const { data, error } = await supabaseAdmin.from("services").select("*").order("order_index");

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Create new service
    create: async (serviceData) => {
      try {
        const { data, error } = await supabaseAdmin.from("services").insert([serviceData]).select().single();

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Update service
    update: async (id, updates) => {
      try {
        const { data, error } = await supabaseAdmin.from("services").update(updates).eq("id", id).select().single();

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Delete service
    delete: async (id) => {
      try {
        const { error } = await supabaseAdmin.from("services").delete().eq("id", id);

        if (error) throw error;
        return { data: true, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },
  },

  // Projects Admin
  projects: {
    // Get all projects including drafts
    getAll: async () => {
      try {
        const { data, error } = await supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false });

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Create new project
    create: async (projectData) => {
      try {
        const { data, error } = await supabaseAdmin.from("projects").insert([projectData]).select().single();

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Update project
    update: async (id, updates) => {
      try {
        const { data, error } = await supabaseAdmin.from("projects").update(updates).eq("id", id).select().single();

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Delete project
    delete: async (id) => {
      try {
        const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);

        if (error) throw error;
        return { data: true, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },
  },

  // News Admin
  news: {
    // Get all news including drafts
    getAll: async () => {
      try {
        const { data, error } = await supabaseAdmin.from("news").select("*").order("created_at", { ascending: false });

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Create new news article
    create: async (newsData) => {
      try {
        const { data, error } = await supabaseAdmin.from("news").insert([newsData]).select().single();

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Update news article
    update: async (id, updates) => {
      try {
        const { data, error } = await supabaseAdmin.from("news").update(updates).eq("id", id).select().single();

        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    // Delete news article
    delete: async (id) => {
      try {
        const { error } = await supabaseAdmin.from("news").delete().eq("id", id);

        if (error) throw error;
        return { data: true, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },
  },
};

// Legacy functions for backward compatibility
export const fetchActiveServices = servicesAPI.getAll;
export const fetchFeaturedProjects = projectsAPI.getFeatured;
export const fetchLatestNews = newsAPI.getPublished;
