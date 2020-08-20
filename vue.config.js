module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  mode: "production",
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? "/ScrollSesh/" : "/"
};
