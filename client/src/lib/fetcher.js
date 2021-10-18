import { writable, get } from "svelte/store";

const cache = new Map();

export function getData(urls, callback) {
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
            cache.set(urls[i], fetchedData[i]);
            arrayData.push(fetchedData[i]);
         }
         d.set(arrayData);
         p.set(false);
      })
      .catch((err) => {
         e.set(err);
         p.set(false);
      });

   return callback({ d, p, e });
}

export function fetcher(urls, init, edit) {
   const key = urls.join();
   const data = new Array(urls.length).fill(null).map(() => writable(null));
   const error = writable(null);

   if (cache.has(key)) {
      for (let i = 0; i < urls.length; i++) {
         data[i].set(cache.get(urls[i]));
      }
   } else if (init) {
      const defaultData = init();
      for (let i = 0; i < urls.length; i++) {
         data[i].set(defaultData[i]);
      }
   }

   setTimeout(() => {
      Promise.all(urls.map((url) => fetch(url)))
         .then((responses) => Promise.all(responses.map((response) => response.json())))
         .then((fetchedData) => {
            if (edit) {
               fetchedData = edit(fetchedData);
            }
            for (let i = 0; i < fetchedData.length; i++) {
               data[i].set(fetchedData[i]);
               cache.set(urls[i], fetchedData[i]);
            }
            cache.set(key, fetchedData);
         })
         .catch((err) => {
            error.set(err)
         });

   }, 1000)

   return [data, error];
}


function someFunction() {
   let data = [1, 2, 3, 4];
   let bool = false;
   return [data, bool];
}


let [[n1, n2, n3], bool] = someFunction();
console.log(n1)

