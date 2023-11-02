# weather-web

This project is some quick hacking to develop a replacemnt frontend for our Paragliging/Hangliding site weather station.

## HOBOLinkLib.js

This JS library provides some methods to query the same Web Socket Service used by the official HoboLink public dashboard.
The main interfaces are via the DataManager class to manage a connection and handle callback functions.
To request new data use the RequestTSData or RequestLatestData methods (see doc-comments of the methods).

## DataManager.vue

This Vue is intended to create the DataManager and handle calling the data request methods and updating the vue data.
**WIP** *It just establishes a connection and calls the methods once at this commit point.  The callback functions when the WSS recieces data currently just log to console.*


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
