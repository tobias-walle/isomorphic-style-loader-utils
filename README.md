# Isomorphic Style loader decorator

This is a simple wrapper for the 
[Isomorphic CSS style loader for Webpack](https://github.com/kriasoft/isomorphic-style-loader)
which lets you use typescript decorators to assign your styles to a react component.

### Installation
If you are using [npm](https://www.npmjs.com/) as your package manager, you can install the package with the following 
command:
```
npm install isomorphic-style-loader-decorator --save-dev
```

### Dependencies
In Order to use this package you need to compile your project with [typescript](https://github.com/Microsoft/TypeScript).

You also need to have [isomorphic-style-loader](https://github.com/kriasoft/isomorphic-style-loader) installed and ready.
If you have not already done this, please follow the steps on the github side.

### Example

```scss
// MyComponent.scss
.red {
  color: red;
}

.bold {
  font-weight: bold;
}
```

```js
// MyComponent.tsx
import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-decorator';
 
const s = require('./MyComponent.scss');
 

@WithStyles(s)
export class MyComponent extend React.Component<any, any> {
   
  render() {
    return (
      <div>
        <p className={styles.red}>This paragraph is red</p>
        <p className={stlyes.bold}>This paragraph is bold</p>
      </div>
    )
  }
   
}
```

