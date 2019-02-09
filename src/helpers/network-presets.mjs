export default [
    {
        label: 'GPRS',
        offline: false,
        downloadThroughput: (50 * 1024) / 8,
        uploadThroughput: (20 * 1024) / 8,
        latency: 500
    },
    {
        label: 'Regular 2G',
        offline: false,
        downloadThroughput: (250 * 1024) / 8,
        uploadThroughput: (50 * 1024) / 8,
        latency: 300
    },
    {
        label: 'Good 2G',
        offline: false,
        downloadThroughput: (450 * 1024) / 8,
        uploadThroughput: (150 * 1024) / 8,
        latency: 150
    },
    {
        label: 'Regular 3G',
        offline: false,
        downloadThroughput: (750 * 1024) / 8,
        uploadThroughput: (250 * 1024) / 8,
        latency: 100
    },
    {
        label: 'Godo 3G',
        offline: false,
        downloadThroughput: (1.5 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
        latency: 40
    },
    {
        label: 'Regular 4G',
        offline: false,
        downloadThroughput: (4 * 1024 * 1024) / 8,
        uploadThroughput: (3 * 1024 * 1024) / 8,
        latency: 20
    },
    {
        label: 'DSL',
        offline: false,
        downloadThroughput: (2 * 1024 * 1024) / 8,
        uploadThroughput: (1 * 1024 * 1024) / 8,
        latency: 5
    },
    {
        label: 'WiFi',
        offline: false,
        downloadThroughput: (30 * 1024 * 1024) / 8,
        uploadThroughput: (15 * 1024 * 1024) / 8,
        latency: 2
    }
];
