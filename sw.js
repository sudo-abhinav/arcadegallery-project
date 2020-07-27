// version
var appversion = 'v1.00';

// files to catch
var files = [
    './',
    './index.html',
    './senior.html',
    './gallery-clean.css',
    'button/music.png',
    'button/whatsapp.png',
    'music/song.mp3'

   

]

// install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appversion)
        .then(async Cache => {
            return Cache.addAll(files)
                .catch(err => {
                    console.error('error adding to cache', err);
                    //  console.error('error adding to cache', err);
                })
        })
    )
    console.info('sw installed');
    // self.skipWaiting();
})


// activate

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
        .then(cachesName => {
            return Promise.all(
                cachesName.map(cache => {
                    if (cache !== appversion) {
                        console.info('deleting old cache', cache);
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
    return self.clients.claim();
})
// fetch

self.addEventListener('fetch', event => {
    console.info('sw fetced', event.request.url);
    event.respondWith(
        // event.respondWith(
        caches.match(event.request)
        .then(res => {
            return res || fetch(event.request);
        })
    )
})