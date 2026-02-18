import React, { ReactElement } from 'react';

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

declare module 'react-icons/hi' {
    export * from 'react-icons/hi/index';
}

declare module 'react-icons/hi2' {
    export * from 'react-icons/hi2/index';
}

declare module 'react-icons/md' {
    export * from 'react-icons/md/index';
}

declare module 'react-icons/fi' {
    export * from 'react-icons/fi/index';
}

declare module 'react-icons/fa' {
    export * from 'react-icons/fa/index';
}

declare module 'react-icons/ai' {
    export * from 'react-icons/ai/index';
}

declare module 'react-icons/go' {
    export * from 'react-icons/go/index';
}

declare module 'react-icons/rx' {
    export * from 'react-icons/rx/index';
}
