import { writable } from "svelte/store";

const cache = new Map();

export function getDataThatWorks(url) {
   const store = writable(new Promise(() => { }));

   if (cache.has(url)) {
      store.set(Promise.resolve(cache.get(url)));
   }

   const load = async () => {
      const response = await fetch(url);
      const data = await response.json();
      cache.set(url, data);
      store.set(Promise.resolve(data));
   }

   return store;
}


export function getData(url) {
   const fetchedData = writable(null);
   const pending = writable(true);
   const bad = writable(null);

   if (cache.has(url)) {
      fetchedData.set(cache.get(url));
      pending.set(false);
   }

   const load = async () => {
      fetch(url)
         .then((res) => res.json())
         .then((data) => {
            fetchedData.set(data);
            pending.set(false);
            cache.set(url, data);
         })
         .catch((err) => {
            bad.set(err);
            pending.set(false);
         });
   }

   setTimeout(() => {
      load();
   }, 1000)
   return { fetchedData, pending, bad };
}


export function getMultipleData(urls) {
   const fetchedData = writable(null);
   const pending = writable(true);
   const bad = writable(null);

   const cachedData = [];
   for (const url of urls) {
      if (cache.has(url)) {
         cachedData.push(cache.get(url));
      }
   }
   fetchedData.set(cachedData);

   const load = async () => {
      Promise.all(urls.map((url) => fetch(url)))
         .then((responses) => Promise.all(responses.map((response) => response.json())))
         .then((data) => {
            fetchedData.set(data);
            pending.set(false);
            for (let i = 0; i < urls.length; i++) {
               cache.set(urls[i], data[i]);
            }
         })
         .catch((err) => {
            bad.set(err);
            pending.set(false);
         });
   }
   setTimeout(() => {
      load();
   }, 1000)
   return { fetchedData, pending, bad };
}
