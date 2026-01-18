## How to use

To build this plugin on your machine, create a new Obsidian vault and enable community plugins in Obsidian settings.

As a best practice, you _should never develop plugins in your main vault to avoid data loss_. Always use a separate vault dedicated to plugin development.

In a terminal window:

1. Open a terminal window and change the project directory to the plugins directory.
   cd path/to/vault
   `mkdir .obsidian/plugins`
   `cd .obsidian/plugins`
2. Clone the sample plugin using Git.
   `git clone https://github.com/mattserrano/obsidian-kindle-plugin.git`

3. Make sure your NodeJS is at least v16 (`node --version`)
4. Run `npm install` to install this plugin's dependencies
5. Run `npx lint-staged && npm run lint && npm run test` to lint files and test run unit tests
6. Run `npm run dev` to start compilation in watch mode

After following these steps, the plugin should be visible under Community plugins in your Obsidian vault's settings.

See Obsidian's [Getting started](0https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin#Step%202%20Build%20the%20plugin) guide to plugin development for best practices and further reference.
