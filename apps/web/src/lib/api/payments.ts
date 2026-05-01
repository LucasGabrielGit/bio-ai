import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "./client";

export interface Plan {
  id: string;
  name: string;
}

export interface SubscriptionInfo {
  plan: string;
  subscription: {
    id: string;
    planId: string;
    status: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
  } | null;
}

export interface CheckoutResponse {
  message: string;
  url: string;
  sessionId: string;
}

// API functions
export const paymentsApi = {
  listPlans: async (): Promise<Plan[]> => {
    const response = await apiClient.get("/payments/plans");
    return response.data.plans;
  },

  createCheckout: async (data: {
    planId: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<CheckoutResponse> => {
    const response = await apiClient.post("/payments/create-checkout", data);
    return response.data;
  },

  getSubscription: async (): Promise<SubscriptionInfo> => {
    const response = await apiClient.get("/payments/subscription");
    return response.data;
  },

  cancelSubscription: async (): Promise<{ message: string }> => {
    const response = await apiClient.post("/payments/cancel");
    return response.data;
  },

  createPortalSession: async (
    returnUrl?: string,
  ): Promise<{ url: string }> => {
    const params = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : "";
    const response = await apiClient.post(`/payments/portal${params}`);
    return response.data;
  },

  verifyCheckout: async (sessionId: string): Promise<{ success: boolean; plan: string }> => {
    const response = await apiClient.post("/payments/verify-checkout", { sessionId });
    return response.data;
  },
};

// React Query hooks
export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: paymentsApi.listPlans,
    staleTime: 30 * 60 * 1000, // 30 min
  });
};

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: paymentsApi.getSubscription,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: paymentsApi.createCheckout,
    onSuccess: (data) => {
      // Redirecionar para o Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentsApi.cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
};

export const useCreatePortalSession = () => {
  return useMutation({
    mutationFn: (returnUrl?: string) =>
      paymentsApi.createPortalSession(returnUrl),
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
};

export const useVerifyCheckout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: paymentsApi.verifyCheckout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
};
