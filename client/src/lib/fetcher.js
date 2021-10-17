import { writable, get } from "svelte/store";

const cache = new Map();

export function getData(urls) {
   const d = writable(null);
   const p = writable(true);
   const e = writable(null);

   const cachedData = [];
   urls.forEach((url) => {
      if (cache.has(url)) {
         cachedData.push(cache.get(url));
      }
   });
   d.set(cachedData);


   Promise.all(urls.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then((fetchedData) => {
         const arrayData = [];
         for (let i = 0; i < urls.length; i++) {
            arrayData.push(fetchedData[i]);
            cache.set(urls[i], fetchedData[i]);
         }
         d.set(arrayData);
         p.set(false);
      })
      .catch((err) => {
         e.set(err);
         p.set(false);
      });

   return { d, p, e };
}
