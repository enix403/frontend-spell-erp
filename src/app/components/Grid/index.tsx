import * as React from 'react';
import './index.css';

interface GridRowProps extends React.PropsWithChildren<{}> {
    // small?: boolean;
    extraClasses?: string;
}

export const GridRow = React.memo((props: GridRowProps) => {
    return (
        // <div className={`row ${props.small ? 'row-sm' : ''} ${props.extraClasses || ''}`}>
        <div className={`row row-sm ${props.extraClasses || ''}`}>{props.children}</div>
    );
});

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ScreenSize = 'md' | 'xs' | 'sm';

interface GridColumnProps extends React.PropsWithChildren<{}> {
    colSize: ColSize;
    screenSize?: ScreenSize;
    extraClasses?: string;
}

export const GridColumn = React.memo((props: GridColumnProps) => {
    const screenSize = props.screenSize ? (props.screenSize as string) + '-' : '';
    return (
        <div className={`col-${screenSize}${props.colSize} ${props.extraClasses || ''}`}>
            {props.children}
        </div>
    );
});
