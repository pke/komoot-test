module.exports = {
  title: "komoot Test Docs",
  skipComponentsWithoutExample: true,
  styleguideDir: "../public/docs",
  pagePerSection: true,
  updateExample(props, file) {
    // Don't use interactive hook examples, as they can not be resolved
    if (/hooks\.md$/.test(file)) {
      return {
        ...props,
        settings: {
          ...props.settings,
          static: true,
        },
      }
    }
    return props
  },
  sections: [
    {
      name: "README",
      content: "../README.md",
    }, {
      name: "Hooks",
      content: "./hooks.md",
    },
    {
      name: "Components",
      components: "../src/components/**/[A-Z]*.js",
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: {
            loader: "url-loader",
          },
        },
        {
          test: /\.css$/,
          use: ["css-loader"],
        },
      ],
    },
  },
}
