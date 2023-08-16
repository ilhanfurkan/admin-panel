# React Boilerplate

### Init modules and start project development

```
yarn && yarn start
```

### Build static files

```
yarn build
```

### Manual check Eslint

```
yarn lint
```

### Manual check Eslint

```
yarn pretty
```

---

## Instruction

#### Init project;

```
yarn create react-app react-init --template typescript
```

#### Install Redux & Redux Toolkit;

```
yarn add @reduxjs/toolkit redux react-redux redux-thunk
```

#### Install React Router DOM;

```
yarn add @reduxjs/toolkit react-router-dom
```

#### Install typescript development plugins;

```
yarn add -D typescript @types/node @types/react @types/react-dom @types/jest

```

#### Install Material UI;

```
yarn add @mui/material @emotion/react @emotion/styled @mui/styled-engine-sc styled-components @mui/icons-material
```

#### Install Eslint Plugin;

```
yarn add -D eslint @types/eslint

npx eslint --init

yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript

npx eslint "src/*.tsx"
```

#### Install Prettier Plugin;

```
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks

touch .prettierrc
```

---

#### Configure VS Code;

-   On .vscode/settings.json

```
{
    // Editor formatter forced with the prettier plugin.
    "editor.defaultFormatter": "esbenp.prettier-vscode",

    // Prettier config file path.
    "prettier.configPath": ".prettierrc",

    // Put priority on the prettier before the eslint.
    "vs-code-prettier-eslint.prettierLast": true,

    // Format after each save modified on the file.
    "editor.formatOnSave": true,

    // Replace the tab indent with these 4 spaces.
    "editor.tabSize": 4
}
```

---

Good Luck :)
