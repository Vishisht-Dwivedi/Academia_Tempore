/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use: { loader: 'graphql-tag/loader' },
        });
        return config;
    },

    async rewrites() {
        return [
            {
                source: "/api",
                destination: "http://localhost:5000/graphql",
            },
        ];
    },
};

export default nextConfig;
