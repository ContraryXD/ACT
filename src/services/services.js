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
      const response = await fetch("/api/admin/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch projects");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Create new project
  create: async (projectData) => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create project");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Update project
  update: async (id, updates) => {
    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update project");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete project");
      }

      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get featured projects (for public use)
  getFeatured: async (limit = 4) => {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("is_featured", true).order("order_index").limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get projects by status (for public use)
  getByStatus: async (status) => {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("status", status).order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }, // Get limited projects (for public use)
  getLimited: async (limit = 6) => {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }, // Get project by ID (for public use)
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
  // Get all news (admin)
  getAll: async () => {
    try {
      const response = await fetch("/api/admin/news", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch news");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Create new news article
  create: async (newsData) => {
    try {
      const response = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create news");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Update news article
  update: async (id, updates) => {
    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update news");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Delete news article
  delete: async (id) => {
    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete news");
      }

      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get published news
  getPublished: async (limit = null) => {
    try {
      let query = supabase.from("news").select("*").eq("is_published", true).order("published_at", { ascending: false });

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
      const { data, error } = await supabase.from("news").select("*, users(full_name)").eq("slug", slug).eq("is_published", true).single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get news by category
  getByCategory: async (categoryId, limit = null) => {
    try {
      let query = supabase.from("news").select("*").eq("category_id", categoryId).eq("is_published", true).order("published_at", { ascending: false });

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
  // Get all jobs (admin)
  getAll: async () => {
    try {
      const response = await fetch("/api/admin/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch jobs");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Create new job
  create: async (jobData) => {
    try {
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create job");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Update job
  update: async (id, updates) => {
    try {
      const response = await fetch(`/api/admin/jobs?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update job");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Delete job
  delete: async (id) => {
    try {
      const response = await fetch(`/api/admin/jobs?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete job");
      }

      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

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
      const response = await fetch("/api/admin/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch contacts");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  // Delete contact (admin only)
  delete: async (id) => {
    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete contact");
      }

      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  // Mark contact as read (admin only)
  markAsRead: async (id) => {
    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_read: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to mark contact as read");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get unread contact count (admin only)
  getUnreadCount: async () => {
    try {
      const { data, error } = await contactsAPI.getAll();
      if (error) return { count: 0, error };

      const unreadCount = (data || []).filter((contact) => !contact.is_read).length;
      return { count: unreadCount, error: null };
    } catch (error) {
      return { count: 0, error: error.message };
    }
  },
};

// Users API
export const usersAPI = {
  // Get all users (admin)
  getAll: async () => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch users");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Create new user
  create: async (userData) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Update user
  update: async (id, updates) => {
    try {
      // Remove password if empty
      if (updates.password === "") {
        delete updates.password;
      }

      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch user");
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
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
