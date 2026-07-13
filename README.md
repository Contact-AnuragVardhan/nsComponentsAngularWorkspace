# NsComponentsAngularWorkspace

Angular 19 workspace for the NSComponents UI library and its demo application.

## Projects

- `projects/ns-components-angular` - reusable Angular library for NSComponents wrappers
- `projects/ns-components-angular-demo` - demo application that exercises the library

## Install

```bash
npm install
```

## Run the demo app

```bash
npm start
```

The app is served with Angular CLI on `http://localhost:4200/`.

## Build

Build the demo application explicitly:

```bash
ng build ns-components-angular-demo
```

Build the library on Unix-like shells:

```bash
npm run build:library-unix
```

Build the library on Windows:

```bash
npm run build:library-win
```

The library build compiles `ns-components-angular`, then copies generated assets into `dist/ns-components-angular`.

## Test

```bash
npm test
```

## Notes

- The library source lives under `projects/ns-components-angular/src`
- The public entry point is `projects/ns-components-angular/src/public-api.ts`
- The demo app consumes the library from the same workspace during development
