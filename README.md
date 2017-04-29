# Isomorphic Style loader utils

Utilities for the 
[Isomorphic CSS style loader for Webpack](https://github.com/kriasoft/isomorphic-style-loader)
which simplify the usage of the library. It is recommended to use this module with typescript, but 
plain javascript should work too.

### Installation
If you are using [npm](https://www.npmjs.com/) as your package manager, you can install the package with the following 
command:
```
npm install isomorphic-style-loader-utils --save-dev
```

### Dependencies
In Order to use this package you need to have [isomorphic-style-loader](https://github.com/kriasoft/isomorphic-style-loader) installed and setup.
If you have not already done this, please follow the steps in the linked repository

### Features 

#### WithStyles decorator
The WithStyles decorator allows the assign styles to stateful components. Example (Typescript):

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
export class MyComponent extends React.Component<any, any> {
   
  render() {
    return (
      <div>
        <p className={styles.red}>This paragraph is red</p>
        <p className={stlyes.bold}>This paragraph is bold</p>
      </div>
    );
  }
   
}
```

You can also use the decorator without typescript. In this case just use the decorator as a wrapper.
```js
// MyComponent.js
imports...
 
const s = require('./MyComponent.scss');
 
class MyComponent extends Component {
   
  render() {
    return (
      <div>
        <p className={styles.red}>This paragraph is red</p>
        <p className={stlyes.bold}>This paragraph is bold</p>
      </div>
    );
  }
   
}
 
WithStyles(s)(MyComponent);
```

#### WithStylesContext
The WithStylesContext Component provides a context for the app to process the styles.
Example with react-router (typescript):

Server:

```js
// server.tsx
...
let component = (
    <Provider store={store}>
        <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
            <Router history={history} routes={routes} />
        </WithStylesContext>
    </Provider>
);
res.status(200).send(renderToString(
    <HtmlComponent store={store} component={component} styles={css}/>
));
...
``` 
 
```js
// html-component.tsx
...
export class HtmlComponent extends React.Component<HtmlProps, any> {
    render(): JSX.Element {
        let {component, store, styles} = this.props;
        if (styles === undefined) {
            styles = [];
        }
        let head = Helmet.rewind();
        let content: string = component ? ReactDOM.renderToString(component) : '';

        return (
            <html>
            <head>
                <style type="text/css"
                       dangerouslySetInnerHTML={{__html: styles.join('  ')}}/>
            </head>
            <body>
            <div id="container"
                 dangerouslySetInnerHTML={{__html: content}}
            />

            <script src="/dist/vendor.bundle.js"></script>
            <script src="/dist/bundle.js"></script>
            <script
                dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}
                charSet="UTF-8"
            />
            </body>
            </html>
        )
    }
}

```

Client:

```js
...
render(
    <Provider store={store}>
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
            <Router history={browserHistory} routes={routes}/>
        </WithStylesContext>
    </Provider>

    , document.getElementById('container')
);

```
