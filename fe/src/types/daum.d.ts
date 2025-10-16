declare global {
    interface Window {
        daum?: {
            roughmap?: {
                Lander?: new (config: {
                    timestamp: string;
                    key: string;
                    mapWidth: string;
                    mapHeight: string;
                }) => {
                    render: () => void;
                };
            };
        };
    }
}

export {};
