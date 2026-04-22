const CACHE_NAME = 'v0';

// Adicione aqui todos os arquivos que precisam funcionar offline
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './dingo.png',
    './tonini.png',
    './trocha.png',
    './werner.png',
    './cidade.png',
    '[https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)'
];

// Instalação do Service Worker e cache inicial
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Arquivos em cache com sucesso.');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Intercepta as requisições para fornecer os arquivos pelo Cache quando possível
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna o arquivo do cache se encontrar, senão busca na internet
                return response || fetch(event.request);
            })
    );
});

// Limpeza de caches antigos caso você atualize a versão
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
