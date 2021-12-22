module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../components/**/*.stories.mdx',
    '../components/**/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-formik/register',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  staticDirs: ['../public/'],
  framework: '@storybook/react',
}
