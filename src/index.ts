import withStyles from 'isomorphic-style-loader/lib/withStyles'

export function WithStyles(styles) {
    return function (target) {
        withStyles(styles)(target);
    }
}