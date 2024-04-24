// forumIdStore.ts
import { defineStore } from 'pinia';

export const useForumIdStore = defineStore({
  id: 'forumIdStore',
  state: () => ({
    forumId: '1' ||null,
  }),
  actions: {
    setForumId(id: string) {
      this.forumId = id;
    },
    getForumId() {
      return this.forumId;
    },
  },
});