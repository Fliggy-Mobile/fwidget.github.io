'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "06a90d91725dd210172d42e89e27e995",
"/": "06a90d91725dd210172d42e89e27e995",
"main.dart.js": "b5643f647e5d7adf7dc000e4ae38e4b8",
"favicon.png": "f4e1f167f0991fc572ebb9629754ec04",
"icons/Icon-192.png": "7b608fd472dfc29e4073cab4a7b08121",
"icons/Icon-512.png": "04e592f036ebd56f7248a7fd9f0d8f68",
"manifest.json": "712c736b5c20f40d5787cc05f73c9226",
"assets/AssetManifest.json": "9af91db4171c9de3f6ae35470498dce7",
"assets/NOTICES": "0fc4fff0da3a1682b18e23c4de07f7cb",
"assets/FontManifest.json": "ffef466a50fbc9ba6a16887682586d0d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/open_iconic_flutter/assets/open-iconic.woff": "3cf97837524dd7445e9d1462e3c4afe2",
"assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/bg_iphone.png": "12111e7fdd37c241d933002e6038ef80",
"assets/assets/icon_github.png": "233ef12b1e398cf8e66d8da1bc02dce3",
"assets/assets/emoji_5.png": "89771ef2009b1abdef9d17ad143a6dac",
"assets/assets/emoji_4.png": "ca4cacdca3d5701940da9532cc5529ae",
"assets/assets/emoji_0.png": "bf21a8f8865ef697b6bf79601cfeb187",
"assets/assets/emoji_1.png": "22f89f0475c53ed8f020ebded24801a2",
"assets/assets/emoji_3.png": "85ebe88eb1c729ea01684c7b42cbe24d",
"assets/assets/icon_refresh3.gif": "54a9f1714e1304e36fea548bbbe5d458",
"assets/assets/emoji_2.png": "d99ef32c0d3789d5dc453ebbafa2e065",
"assets/assets/config.json": "7162785166ad8dfeb493463b95ae1be1",
"assets/assets/icon_color.png": "2f541a92a79d6d2bff38f01d522b8e6c",
"assets/assets/icon_logo.png": "71b12fae3486746a845dffc31ed88106",
"assets/assets/img_screen_1.png": "dbf9e444cd9b98031bb2852a188f501a",
"assets/assets/img_screen_0.png": "b98ec21ad31f21611501ecfd37f08d5b",
"assets/assets/icon_apple2.png": "bc5c7192a56f9818824e1a435cb3fc7a",
"assets/assets/icon_apple.png": "36019dd1eaf21b6f8b6c8b9258eae55b",
"assets/assets/icon_github2.png": "d65ec7de94112f03e8e1c300a4b4ee3c",
"assets/assets/doc/fsuper_README_CN.md": "877322225b41c6578cd15caa589bbcae",
"assets/assets/doc/frefresh_README_CN.md": "411be14cc9fa5cc5909dd0eb639c70cf",
"assets/assets/doc/ffloat_README_CN.md": "4e098b115788203afce1e40ba1368b2b",
"assets/assets/doc/fradio_README.md": "528e0fb68b4ac77f62b1ed0059aaddc2",
"assets/assets/doc/fdottedline_README_CN.md": "8a14367ca63698a50d5d922da8267e52",
"assets/assets/doc/fswitch_README_CN.md": "d04f0bc0f8660cd9111824028eaf5230",
"assets/assets/doc/fsearch_README.md": "85e782daeb2e3e98eae67e0ec988f0c2",
"assets/assets/doc/fsuper_README.md": "150c3b21c5632f8747310690402f1045",
"assets/assets/doc/fdottedline_README.md": "fbd6e20f947c84936bfdd29787107dd1",
"assets/assets/doc/fswitch_README.md": "2b8c4310e4bf1e43c5db2efce429c06f",
"assets/assets/doc/fradio_README_CN.md": "d2f32400203b5f5a29c794d620a3d9c5",
"assets/assets/doc/fbutton_README.md": "d90dbdff048058a02e74518d176ffdbe",
"assets/assets/doc/fsearch_README_CN.md": "7615f15546fc6f4d05ae117af7a16f43",
"assets/assets/doc/fbutton_README_CN.md": "138a4ef25d553f46074862c050ac1ed4",
"assets/assets/doc/ffloat_README.md": "c30a7b9d5e221013cd527005374c0d15",
"assets/assets/doc/frefresh_README.md": "857834021eb98db60243afb2bdda1072",
"assets/assets/loding_out.png": "017101c72982263afde824e2bf492d1d",
"assets/assets/icon_refresh11.gif": "8198ffe0449eb9ad5774f2bf09ed5496",
"assets/assets/icon_refresh9.gif": "50bf9cbbae79d2f41dfecc564330022f",
"assets/assets/icon_refresh8.gif": "70c01d7ee4e41251d2308153170cc4f8"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.message == 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message = 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
