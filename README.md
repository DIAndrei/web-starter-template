# web-starter-template

Starter template for HTML, CSS & vanilla JS websites. Using Gulp.js as the build system.

## 🏃 Running the website

Using VSCode, you should install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Run

`npm i`

then open either HTML file with **Live Server**.

## 🏗️ Building the website

The build system is using Gulp.js to minify & copy the required assets.

⚠️Before pushing to master, run

`npm run build`

and test the website from `/dist` folder using **Live Server**.

## 🧬 Tech Stack

HTML, CSS, JavaScript

Gulp.js - Build System

## ℹ️ Tips

The `build` comment will tell `gulp-useref` to concatenate all the files between the `build:css` and `endbuild` into one `main.min.css` file when running the `minify` function from `gulpfile.mjs`.
```
<!--build:css styles/main.min.css-->
...
HTML Markup - list of link tags.
...
<!--endbuild-->
```
This can be used for JS files too, by using `build:js` instead.

