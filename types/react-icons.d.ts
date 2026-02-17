import { ReactElement } from 'react';

// Global fix: Override react-icons IconType to return ReactElement instead of ReactNode
// This fixes the JSX type mismatch between react-icons and @types/react@18.2.0
declare module 'react-icons/lib' {
    export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
        children?: React.ReactNode;
        size?: string | number;
        color?: string;
        title?: string;
    }
    export type IconType = (props: IconBaseProps) => ReactElement;
    export function IconBase(props: IconBaseProps & { attr?: Record<string, string> }): ReactElement;
}

declare module 'react-icons' {
    import { ReactElement } from 'react';
    export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
        children?: React.ReactNode;
        size?: string | number;
        color?: string;
        title?: string;
    }
    export type IconType = (props: IconBaseProps) => ReactElement;
    export function IconBase(props: IconBaseProps & { attr?: Record<string, string> }): ReactElement;
    export { IconBaseProps, IconType, IconBase };
}
