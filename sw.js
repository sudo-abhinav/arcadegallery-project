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

    // './js/footer_update.js',
    // ' ./js/music.js',
    // 'button\music.png',
    // 'button\whatsapp.png'
    // './senior\1.jpg',
    // './senior\2.jpg',
    // './senior\3.jpg',
    // './senior\4.jpg',
    // './senior\5.jpg',
    // './senior\6.jpg',
    // './senior\7.jpg',
    // './senior\8.jpg',
    // './senior\9.jpg'

    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571818/image/abhinav.jpg ',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571855/image/yogeshwar_jfuzsl.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571845/image/ritesh_xe76qb.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571829/image/memory_kj5opo.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590587985/image/memory_2_kxyoj2.jpg"',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590587886/image/memory_3_euagel.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571820/image/aditi_ylqedu.jpg"',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571823/image/heena_jlsubo.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571852/image/sweta_fnwyyd.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571850/image/shyama_viz9ww.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571847/image/romi_thluwt.jpg ',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571826/image/manish_ikfin7.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571822/image/anish_m5ouui.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571825/image/krishnkant_e11jvt.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571848/image/santosh_fww3tp.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590592161/image/dilip.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571851/image/sumit_marbgb.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571848/image/shiv_o2dvyw.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571851/image/sonu_ya1kwn.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571827/image/manjeet_yjurjk.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571825/image/kishan_fei15a.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571846/image/rajeev_pboksp.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571817/image/abhishek.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571843/image/mayank_oitrip.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571821/image/alok_eoug0n.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571853/image/vikash_kvrivh.jpg',
    // ' https://res.cloudinary.com/abhinav234/image/upload/v1590571831/image/mikhil_ooyq1p.jpg'

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