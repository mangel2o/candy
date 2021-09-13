import { writable } from 'svelte/store'
import { browser } from '$app/env';

// Set the stored value or a sane default.
export const userStore = writable(browser && JSON.parse(localStorage.getItem('user')) || undefined)

// Anytime the store changes, update the local storage value.
userStore.subscribe((value) => {
   if (browser) {
      localStorage.setItem('user', JSON.stringify(value));
   }
});