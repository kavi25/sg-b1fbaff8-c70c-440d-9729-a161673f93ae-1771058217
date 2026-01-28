import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export const orderService = {
  // Get all orders
  async getAllOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get order by ID
  async getOrderById(id: string) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create order
  async createOrder(order: OrderInsert) {
    const { data, error } = await supabase
      .from("orders")
      .insert(order)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update order
  async updateOrder(id: string, updates: OrderUpdate) {
    const { data, error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete order
  async deleteOrder(id: string) {
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // Get orders by status
  async getOrdersByStatus(status: string) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get revenue statistics
  async getRevenueStats() {
    const { data, error } = await supabase
      .from("orders")
      .select("amount, status");

    if (error) throw error;

    const stats = {
      total: 0,
      completed: 0,
      pending: 0,
      count: data?.length || 0,
    };

    data?.forEach((order) => {
      stats.total += order.amount || 0;
      if (order.status === "completed") {
        stats.completed += order.amount || 0;
      } else if (order.status === "pending") {
        stats.pending += order.amount || 0;
      }
    });

    return stats;
  },
};