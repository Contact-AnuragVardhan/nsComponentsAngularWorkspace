# ns-components-angular

Angular wrapper components for NSComponents.

This library is published from the `projects/ns-components-angular` workspace project and exposes its public API from `src/public-api.ts`.

## Install

If the package is published to npm, install it with:

```bash
npm install ns-components-angular
```

## Use in Angular

Import the library module into your application module:

```ts
import { NSComponentsModule } from 'ns-components-angular';

@NgModule({
  imports: [NSComponentsModule]
})
export class AppModule {}
```

`NSComponentsModule` exports the library components and directive, including the textbox, navigation, multiselect dropdown, panel, calendar, date picker, dashboard, message box, grid, tab navigator, horizontal navigation, editor, numeric textbox, and table row mover directive.

## Build

Build the library from the workspace root:

```bash
ng build ns-components-angular
```

The production build output is written to `dist/ns-components-angular`.

## Library publish flow

After building, publish the package from the generated `dist/ns-components-angular` folder:

```bash
cd dist/ns-components-angular
npm publish
```

## Workspace-specific build scripts

The root workspace also provides helper scripts for the additional generated assets used by this library:

- `npm run build:library-unix`
- `npm run build:library-win`

These scripts build the library and copy the generated asset folder into the package output.
