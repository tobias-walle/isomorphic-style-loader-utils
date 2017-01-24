import * as React from 'react';

export class WithStylesContextProps {
    onInsertCss: Function;
}

export class WithStylesContext extends React.Component<WithStylesContextProps, any> {
    static childContextTypes = {
        insertCss: React.PropTypes.func.isRequired,
    };

    getChildContext() {
        return { insertCss: this.props.onInsertCss };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}