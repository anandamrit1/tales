 
const webpack = require('webpack'); 
module.exports = function override(config) { 
   config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
         oneOf: [
          {
            test: /\.cdc$/,
            loader: "raw-loader",
          },
          ...rule.oneOf
        ]
      };
    }

    return rule;
  });

   return config; 
}
