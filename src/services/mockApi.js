import {
  userData,
  dashboardStats,
  dailyBreakdown,
  invoices,
  requestHistory,
  packages,
  subscriptions,
  recentTryOns,
  notifications,
} from '../data/mockData';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getUser() {
    await delay(300);
    return { data: userData };
  },

  async updateUser(updates) {
    await delay(500);
    return { data: { ...userData, ...updates } };
  },

  async changePassword() {
    await delay(500);
    return { data: { success: true, message: 'Password updated successfully' } };
  },

  async regenerateApiKey() {
    await delay(500);
    const newKey = 'lc_live_sk_' + Math.random().toString(36).substring(2, 34);
    return { data: { apiKey: newKey } };
  },

  async getDashboardStats() {
    await delay(300);
    return { data: dashboardStats };
  },

  async getDailyBreakdown(period = '7d') {
    await delay(300);
    const days = period === '7d' ? 7 : period === '14d' ? 14 : 11;
    return { data: dailyBreakdown.slice(0, days) };
  },

  async getInvoices(params = {}) {
    await delay(400);
    let filtered = [...invoices];
    if (params.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(
        (inv) =>
          inv.id.toLowerCase().includes(search) ||
          inv.user.toLowerCase().includes(search) ||
          inv.email.toLowerCase().includes(search)
      );
    }
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((inv) => inv.status === params.status);
    }
    const page = params.page || 1;
    const limit = params.limit || 5;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return {
      data: paginated,
      meta: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      },
    };
  },

  async getRequestHistory(params = {}) {
    await delay(400);
    let filtered = [...requestHistory];
    if (params.ip) {
      filtered = filtered.filter((req) => req.ipAddress.includes(params.ip));
    }
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((req) => req.status === params.status);
    }
    if (params.dateFrom) {
      filtered = filtered.filter((req) => req.dateTime >= params.dateFrom);
    }
    if (params.dateTo) {
      filtered = filtered.filter((req) => req.dateTime <= params.dateTo + ' 23:59:59');
    }
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return {
      data: paginated,
      meta: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      },
    };
  },

  async getPackages() {
    await delay(300);
    return { data: packages };
  },

  async getSubscriptions() {
    await delay(300);
    return { data: subscriptions };
  },

  async generateLook(clothImage, modelImage) {
    await delay(2000);
    return {
      data: {
        id: Date.now(),
        resultImage: 'https://placehold.co/400x520/ede9fe/7c3aed?text=Generated+Look',
        status: 'Completed',
        createdAt: new Date().toISOString(),
      },
    };
  },

  async getRecentTryOns() {
    await delay(300);
    return { data: recentTryOns };
  },

  async getNotifications() {
    await delay(200);
    return { data: notifications };
  },
};
