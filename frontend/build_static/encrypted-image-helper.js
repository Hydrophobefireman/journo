/// <reference lib="WebWorker" />
/// <reference lib="scripthost" />

/**
 *
 * @param {FetchEvent} event
 */
function fetchListener(event) {
  const {request} = event;
  const {url} = request;
  const U = new URL(url);
  if (event.clientId)
    if (U.pathname.includes("/_/decrypt")) {
      event.respondWith(
        (async () => {
          const url = U.searchParams.get("url");
          const client = await clients.get(event.clientId);
          const {decryptedImage, ct} = await decryptImage(url, client);
          console.log(decryptedImage);
          return new Response(decryptedImage, {headers: {"content-type": ct}});
        })()
      );
    }
}
self.addEventListener("fetch", fetchListener);

let id = 0;
/**
 *
 * @param {string} url
 * @param {client} client
 * @returns {Promise<ArrayBuffer>}
 */
function decryptImage(url, client) {
  return new Promise(async (resolve) => {
    const resp = await fetch(url);
    const buffer = await resp.arrayBuffer();
    const code = `decryption-job:${id}:${Math.random()}`;

    const listener = async (ev) => {
      if (ev.data?.code !== code) return;
      self.removeEventListener("message", listener);
      return resolve({decryptedImage: ev.data.decryptedBuffer, ct: ev.data.ct});
    };
    self.addEventListener("message", listener);
    client.postMessage({code, buffer, url, type: "decryption-job"}, [buffer]);
  }).catch(() => ({ct: "", decryptImage: new ArrayBuffer(0)}));
}
