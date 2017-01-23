import withStyles from 'isomorphic-style-loader/lib/withStyles'

/**
 * Wrap a component with the provided styles.
 * @param styles The styles you want assign.
 * @return {(target:any)=>void} A function that wraps the target with the provided styles styles .
 */
export function WithStyles(styles) {
    return function (target) {
        withStyles(styles)(target);
    }
}