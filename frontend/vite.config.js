export default {
    server: {
        port: 4173,
        host: true,
        strictPort: true,
        watch: {
            usePolling: true,
            interval: 1000
        },
        hmr: {
            clientPort: 4173
        }
    }
}