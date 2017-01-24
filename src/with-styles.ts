import * as React from 'react';

/**
 * Register the component styles.
 * @param styles The styles you want to assign.
 * @return {(target:any)=>void} A function that wraps the target with the provided styles.
 */
export function WithStyles(styles: any) {
    return function (Component): void {

        // Add context types
        Component.contextTypes = {
            insertCss: React.PropTypes.func
        };


        // Subscribe to lifecycle methods
        Component.prototype.componentWillMount = function () {
            if (this.context.insertCss) {
                this.removeCss = this.context.insertCss(styles);
            }
        };

        Component.prototype.componentWillUnmount = function () {
            setTimeout(this.removeCss, 0);
        }

    }
}