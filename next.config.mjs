/** @type {import('next').NextConfig} */
import globImporter from 'node-sass-glob-importer';

const nextConfig = {
  sassOptions: {
    includePaths: ['./ui/styles', './ui/components'],
    importer: globImporter(),
  },
};

export default nextConfig;
