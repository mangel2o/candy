import { writable, get } from "svelte/store";
import axios from "axios";
const cache = new Map();

/**
 * * Get requests handler
 * @param {*} urls 
 * @param {*} options 
 * @returns 
 */
export const fetcher = (urls, options = {}) => {
   const key = urls.join();
   const data = new Array(urls.length).fill(null).map(() => writable(null));
   const loading = writable(true);
   const error = writable(null);
   const progress = writable(0);
   const controller = new AbortController();

   // * Updates the fetched and cached data
   const update = (oldValue, newValue) => {
      const cachedData = cache.get(key);
      for (let i = 0; i < cachedData.length; i++) {
         if (cachedData[i].data === oldValue) {
            cachedData[i].data = newValue;
            data[i].set(newValue);
            cache.set(key, cachedData);
            break;
         }
      }
   }

   // * Loads data from cache if there's any
   if (cache.has(key)) {
      const cachedData = cache.get(key);
      for (let i = 0; i < cachedData.length; i++) {
         data[i].set(cachedData[i].data);
      }
      loading.set(false);
   } else if (!cache.has(key) && options.init) {
      const defaultData = options.init();
      for (let i = 0; i < urls.length; i++) {
         data[i].set(defaultData[i]);
      }
   }

   // * Fetches the data
   const refetch = (displayLoading = true) => {
      progress.set(0);
      loading.set(displayLoading);
      let currentProgress = 0;

      const promises = urls.map((url) => {
         return axios.get(url, {
            onDownloadProgress: progressEvent => {
               const total = progressEvent.total;
               const current = progressEvent.loaded;
               let percentCompleted = Math.floor(current / total * (100 / urls.length));
               if (urls.length > 1 && percentCompleted === 100 / urls.length) {
                  currentProgress = percentCompleted;
               }
               progress.set(currentProgress + percentCompleted);
            },
            signal: controller.signal,
         })
      })

      Promise.all(promises)
         .then((fetchedData) => {
            if (options.edit) {
               fetchedData = options.edit(fetchedData);
            }

            for (let i = 0; i < fetchedData.length; i++) {
               data[i].set(fetchedData[i].data);
            }
            cache.set(key, fetchedData);
            loading.set(false);
         })
         .catch((err) => {
            if (err.response) {
               error.set(err.response.data)
               loading.set(false);
            }
         });
   }

   if (!cache.has(key)) {
      refetch();
   }
   if (options.alwaysFetch && cache.has(key)) {
      refetch(false);
   }
   return [data, loading, error, refetch, update, progress, controller];
}

/**
 * * Post, put & delete requests handler
 * @returns 
 */
export const requester = () => {
   const data = writable(null);
   const loading = writable(false);
   const error = writable(null);

   // * Makes a fetch request for post, put or delete
   const request = (config, options = {}) => {
      loading.set(true);
      axios.request(config)
         .then((fetchedData) => {
            if (options.edit) {
               fetchedData = options.edit(fetchedData);
            }

            data.set(fetchedData.data);
            error.set(null);
            loading.set(false);
            if (options.finalize) {
               options.finalize(fetchedData);
            }
         })
         .catch((err) => {
            if (err.response) {
               error.set(err.response.data)
               loading.set(false);
            }
         });
   }

   return [request, loading, error, data];
}
