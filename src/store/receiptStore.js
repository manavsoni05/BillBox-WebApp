import { create } from 'zustand';

const useReceiptStore = create((set) => ({
  receipts: [],
  recentReceipts: [],
  loading: false,
  error: null,
  setReceipts: (receiptList) => set({ receipts: receiptList }),
  setRecentReceipts: (receiptList) => set({ recentReceipts: receiptList }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (err) => set({ error: err }),
  addReceipt: (receipt) => set((state) => ({ 
    receipts: [receipt, ...state.receipts],
    recentReceipts: [receipt, ...state.recentReceipts.slice(0, 4)]
  })),
}));

export default useReceiptStore;
