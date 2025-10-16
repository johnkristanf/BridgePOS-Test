"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface SidebarToggleState {
  isOpen: boolean
}

interface SidebarToggleActions {
  setIsOpen: () => void
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
}

type SidebarToggleStore = SidebarToggleState & SidebarToggleActions

export const useSidebarToggle = create<SidebarToggleStore>()(
  persist(
    immer((set) => ({
      isOpen: true,
      setIsOpen: () =>
        set((state) => {
          state.isOpen = !state.isOpen
        }),
      toggleSidebar: () =>
        set((state) => {
          state.isOpen = !state.isOpen
        }),
      openSidebar: () =>
        set((state) => {
          state.isOpen = true
        }),
      closeSidebar: () =>
        set((state) => {
          state.isOpen = false
        }),
    })),
    {
      name: "sidebar-toggle",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isOpen: state.isOpen }),
    },
  ),
)
