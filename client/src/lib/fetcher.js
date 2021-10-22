import { writable, get } from "svelte/store";

const cache = new Map();

export const fetcher = (urls, options = {}) => {
   const key = urls.join();
   const data = new Array(urls.length).fill(null).map(() => writable(null));
   const loading = writable(true);
   const error = writable(null);

   if (cache.has(key)) {
      for (let i = 0; i < urls.length; i++) {
         data[i].set(cache.get(urls[i]));
      }
   } else if (options.init) {
      const defaultData = options.init();
      for (let i = 0; i < urls.length; i++) {
         data[i].set(defaultData[i]);
      }
   }
   const refetch = async () => {
      await Promise.all(urls.map((url) => fetch(url)))
         .then((responses) => Promise.all(responses.map((response) => response.json())))
         .then((fetchedData) => {
            if (options.edit) {
               fetchedData = options.edit(fetchedData);
            }
            for (let i = 0; i < fetchedData.length; i++) {
               data[i].set(fetchedData[i]);
               cache.set(urls[i], fetchedData[i]);
            }
            cache.set(key, fetchedData);
            loading.set(false);

         })
         .catch((err) => {
            error.set(err)
            loading.set(false);
         });
   }
   refetch();
   return [data, loading, error, refetch];
}

/**
 * const [[data1, data2], isPen, err] = fetcher(
      [`http://localhost:4000/students`, `http://localhost:4000/documents`],
      {
         init: () => {
            const data = {
               original: null,
               filterable: null,
               entries: 0,
               limit: 0
            };
            return [data, null];
         },
         edit: ([students, categories]) => {
            const data = {
               original: students,
               filterable: students,
               entries: students.length,
               limit: students.length
            };
            return [data, categories];
         }
      }
   );
 */