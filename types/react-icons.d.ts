import React from 'react';

declare module 'react-icons/lib' {
    export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
        children?: React.ReactNode;
        size?: string | number;
        color?: string;
        title?: string;
    }
    export type IconType = (props: IconBaseProps) => React.JSX.Element;
}

declare module 'react-icons' {
    export * from 'react-icons/lib';
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
