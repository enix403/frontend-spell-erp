import * as React from 'react';

type TableCellCenterAlignment = 'horizontal' | 'vertical' | 'both';

interface TableProps extends React.PropsWithChildren<{}> {
    center?: TableCellCenterAlignment;
}

export const ResponsiveTable = React.memo((props: TableProps) => {
    let alignClass: string;

    if (props.center == 'vertical') alignClass = 'center-table-v';
    else if (props.center == 'horizontal') alignClass = 'center-table-h';
    else if (props.center == 'both') alignClass = 'center-table';
    else alignClass = '';

    return (
        <div className="table-responsive">
            <table className={`table table-bordered ${alignClass}`}>{props.children}</table>
        </div>
    );
});
