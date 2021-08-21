import * as React from 'react';

interface InputElementProps extends React.HTMLProps<HTMLInputElement> {
    fill?: boolean;
}

export const RegularInput = React.memo((props: InputElementProps) => {
    const { fill: propFill, ...otherProps } = props;
    const fill = propFill == undefined ? true : propFill;

    return (
        <div className={`bp3-input-group ${fill ? 'bp3-fill' : ''}`}>
            <input {...otherProps} className="bp3-input no-intent" />
        </div>
    );
});

interface LabeledInputProps extends React.PropsWithChildren<{}> {
    label: string;
}

export const InputElementLabel = React.memo((props: LabeledInputProps) => {
    return (
        <label className="bp3-label">
            {props.label}
            {props.children}
        </label>
    );
});

interface SelectElementProps extends React.HTMLProps<HTMLSelectElement> {
    fill?: boolean;
}

export const RegularSelect = React.memo((props: SelectElementProps) => {
    const { fill: propFill, ...otherProps } = props;
    const fill = propFill == undefined ? true : propFill;
    return (
        <div className={`bp3-select ${fill ? 'bp3-fill' : ''}`}>
            <select {...otherProps}>{props.children}</select>
        </div>
    );
});
