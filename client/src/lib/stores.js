import { writable } from 'svelte/store'
import { browser } from '$app/env';

// * Set the stored value or a sane default.
export const userStore = writable(browser && JSON.parse(localStorage.getItem('user')))

// * Anytime the store changes, update the local storage value.
userStore.subscribe((value) => {
   if (browser) {
      localStorage.setItem('user', typeof value === 'object' && value !== null ? JSON.stringify(value) : value);
   }
});

export const studentsStore = writable({});
export const updateStudentsStore = writable(() => { });

export const usersStore = writable({});
export const updateUsersStore = writable(() => { });



