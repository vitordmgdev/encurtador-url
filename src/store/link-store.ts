import { create } from "zustand";
import { persist } from "zustand/middleware";

type Link = {
    id: string,
    url: string,
    createdAt: Date
}

type LinkStoreState = {
    links: Link[]
}

type LinkStoreActions = {
    addLink: (link: Link) => void
}

type LinkStore = LinkStoreState & LinkStoreActions

export const useLink = create<LinkStore>()(
    persist(
        (set) => ({
            links: [],
            addLink: (link: Link) => set((state) => ({
                links: [...state.links, link]
            }))
        }),
        { name: "link-storage" }
    ),
)