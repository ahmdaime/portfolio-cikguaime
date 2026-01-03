import { useState, useEffect } from 'react';

// --- Types ---
export interface SlotData {
  max: number;
  sold: number;
  remaining: number;
}

export interface SlotsState {
  'template-tersedia': SlotData;
  'custom-template': SlotData;
}

// --- Constants ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzwOoBDvnEYHhGOq-mwZUHlZSOynnk4vKHVrEa391bntt91p8CSErYlqihaX17dHwBww/exec";

const DEFAULT_SLOTS: SlotsState = {
  'template-tersedia': { max: 10, sold: 0, remaining: 10 },
  'custom-template': { max: 3, sold: 0, remaining: 3 }
};

interface UseSlotsOptions {
  enabled?: boolean; // Whether to fetch slots (useful for conditional fetching)
}

interface UseSlotsReturn {
  slots: SlotsState | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useSlots = (options: UseSlotsOptions = {}): UseSlotsReturn => {
  const { enabled = true } = options;

  const [slots, setSlots] = useState<SlotsState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSlots = async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();

      if (data.success && data.slots) {
        setSlots(data.slots);
      } else {
        // API returned but no valid slots, use defaults
        setSlots(DEFAULT_SLOTS);
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch slots'));
      // Fallback to default values if fetch fails
      setSlots(DEFAULT_SLOTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchSlots();
    }
  }, [enabled]);

  return {
    slots,
    isLoading,
    error,
    refetch: fetchSlots
  };
};

export default useSlots;
