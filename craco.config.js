module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find and disable CSS minimizer
      const minimizerIndex = webpackConfig.optimization.minimizer.findIndex(
        (minimizer) => minimizer.constructor.name === 'CssMinimizerPlugin'
      );
      
      if (minimizerIndex > -1) {
        webpackConfig.optimization.minimizer.splice(minimizerIndex, 1);
      }
      
      return webpackConfig;
    },
  },
};
