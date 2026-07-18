import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App).
// Using a project-local entry avoids expo/AppEntry.js's '../../App' relative
// import, which does not resolve under pnpm's symlinked node_modules layout.
registerRootComponent(App);
