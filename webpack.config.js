const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const productsData = require("./src/data/products.json"); // Импорт данных

module.exports = (env = {}) => {
  const isProd = env.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: {
      index: "./src/scripts/start-page/index.js",
      catalog: "./src/scripts/catalog/catalog.js",
      productTemplate: "./src/scripts/product-template/product-template.js",
      certification: "./src/scripts/certification/certification.js",
      contacts: "./src/scripts/contacts/contacts.js",
      partners: "./src/scripts/partners/partners.js",
      about: "./src/scripts/about/about.js",
      ralClassic: "./src/scripts/ralClassic/ralClassic.js",
      color_collections: "./src/scripts/color_collections/color_collections.js",
      duluxCr5: "./src/scripts/duluxCr5/duluxCr5.js",
      nskSystem: "./src/scripts/nskSystem/nskSystem.js",
      tikkurilasymphony: "./src/scripts/tikkurilasymphony/tikkurilasymphony.js",
      tekcinterior: "./src/scripts/tekc/tekcinterior.js",
      tekcexterior: "./src/scripts/tekc/tekcexterior.js",
      obratnaya_svyaz: "./src/scripts/obratnaya-svyaz/obratnaya-svyaz.js",
    },

    output: {
      path: path.resolve(__dirname, "docs"),
      filename: "[name].[contenthash].js",
      publicPath: isProd ? "./" : "/",
    },

    devServer: {
      static: path.resolve(__dirname, "dist"),
      compress: true,
      port: 8080,
      open: true,
      historyApiFallback: true, // Позволяет правильно работать с маршрутизацией
    },

    module: {
      rules: [
        {
          test: /\.js?$/i,
          use: "babel-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name].[hash][ext]",
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name].[hash][ext]",
          },
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { importLoaders: 1 },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.xlsx$/i,
          type: "asset/resource",
          generator: {
            filename: "excel-files/[name].[hash][ext]",
          },
        },
        {
          test: /\.pdf$/i,
          type: "asset/resource",
          generator: {
            filename: "pdf/[name].[hash][ext]",
          },
        },
      ],
    },

    plugins: [
      ...productsData.products.map((product) => {
        return new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src", "product-template.html"),
          filename: `${product.name}.html`,
          templateParameters: {
            title: product.title,
            descriptionSmall: product.description_small,
            productName: product.name,
            productName_Rus: product.name_ru,
            productType: product.product_type,
            brand: product.brand,
            image: product.image,
            details: product.details,
            application_tools: product.application_tools,
            application_temperature_range:
              product.application_temperature_range,
            extended_description: product.extended_description,
            specification: product.details.specification,
            typeProduct: product.product_type,
            subTypeProduct: product.product_subtype,
            workType: product.work_type,
            production_country: product.production_country,
            base_colors: product.base_colors,
            productContainer: product.details.packaging.container_type,
            productSize: product.details.packaging.sizes,
            productPrice: product.details.packaging.price,
            coloring: product.coloring,
            surfaceTypes: product.surface_types,
            descriptionBig: product.description_big,
            consumptionPaint: product.details.consumption,
            product_coverage_area_smallMin:
              product.details.coverage_area_small.min,
            product_coverage_area_smallMax:
              product.details.coverage_area_small.max,
            product_coverage_area_bigMin: product.details.coverage_area_big.min,
            product_coverage_area_bigMax: product.details.coverage_area_big.max,
            recoatTimeHours: product.recoat_time_hours,
            fullDryTimeHours: product.full_dry_time_hours,
            productId: product.id,
          },
          chunks: ["productTemplate"],
        });
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        filename: "index.html",
        chunks: ["index"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "catalog.html"),
        filename: "catalog.html",
        chunks: ["catalog"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "certification.html"),
        filename: "certification.html",
        chunks: ["certification"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "contacts.html"),
        filename: "contacts.html",
        chunks: ["contacts"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "partners.html"),
        filename: "partners.html",
        chunks: ["partners"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "about.html"),
        filename: "about.html",
        chunks: ["about"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "color_collections.html"),
        filename: "color_collections.html",
        chunks: ["color_collections"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "duluxCr5.html"),
        filename: "duluxCr5.html",
        chunks: ["duluxCr5"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "nskSystem.html"),
        filename: "nskSystem.html",
        chunks: ["nskSystem"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "ralClassic.html"),
        filename: "ralClassic.html",
        chunks: ["ralClassic"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "tikkurilasymphony.html"),
        filename: "tikkurilasymphony.html",
        chunks: ["tikkurilasymphony"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "tekcinterior.html"),
        filename: "tekcinterior.html",
        chunks: ["tekcinterior"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "tekcexterior.html"),
        filename: "tekcexterior.html",
        chunks: ["tekcexterior"],
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "obratnaya-svyaz.html"),
        filename: "obratnaya-svyaz.html",
        chunks: ["obratnaya_svyaz"],
      }),

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
  };
};
