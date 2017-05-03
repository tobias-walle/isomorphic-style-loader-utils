import * as PropTypes from 'prop-types';

/**
 * Register the component styles.
 * @param styles The styles you want to assign.
 * @return {(target:any)=>void} A function that wraps the target with the provided styles.
 */
export function WithStyles(styles: any) {
  return function (Component): void {

    // Add context types
    const oldContextTypes = Component.contextTypes || {};
    Component.contextTypes = {
      ...oldContextTypes,
      insertCss: PropTypes.func
    };


    // Subscribe to lifecycle methods
    const oldComponentWillMount = Component.prototype.componentWillMount;
    Component.prototype.componentWillMount = function () {
      if (this.context.insertCss) {
        this.removeCss = this.context.insertCss(styles);
      }
      oldComponentWillMount && oldComponentWillMount.bind(Component)();
    };

    const oldComponentWillUnmount = Component.prototype.componentWillUnmount;
    Component.prototype.componentWillUnmount = function () {
      oldComponentWillUnmount && oldComponentWillUnmount.bind(Component)();
      setTimeout(this.removeCss, 0);
    };

  }
}