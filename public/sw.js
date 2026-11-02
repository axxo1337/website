//
// [SECTION] Defines
//

const VERSION = "v4";

const PRECACHE_CACHE = `axxo-precache-${VERSION}`;
const RUNTIME_CACHE = `axxo-runtime-${VERSION}`;
const STATIC_CACHE = "axxo-static";

const KNOWN_CACHES = [PRECACHE_CACHE, RUNTIME_CACHE, STATIC_CACHE];

const PRECACHE_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-512x512.png",
  "/images/icons/apple-touch-icon.png",
  "/images/bliss.avif",
  "/images/axxo_blue.avif",
  "/animations/banner/data.lottie",
  "/animations/banner/background.webp",
];

const STATIC_PATH_PREFIXES = ["/_next/static/", "/images/", "/animations/", "/wasm/"];

//
// [SECTION] Helpers
//

function isStaticPath(pathname) {
  return STATIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
  }

  return networkResponse;
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return (await caches.match(request)) ?? (await caches.match("/"));
  }
}

async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  const networkResponse = await fetch(request).catch(() => null);

  if (networkResponse?.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, networkResponse.clone());
  }

  return cachedResponse ?? networkResponse ?? Response.error();
}

//
// [SECTION] Lifecycle Events
//

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const precache = await caches.open(PRECACHE_CACHE);
      const staticCache = await caches.open(STATIC_CACHE);

      await Promise.all(
        PRECACHE_ASSETS.map((asset) => {
          const target = isStaticPath(asset) ? staticCache : precache;
          return target
            .add(new Request(asset, { cache: "reload" }))
            .catch((error) => console.warn(`[SW] Precache failed for ${asset}:`, error));
        }),
      );

      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (!KNOWN_CACHES.includes(key)) {
              return caches.delete(key);
            }
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

//
// [SECTION] Fetch Strategy
//

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  if (isStaticPath(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
