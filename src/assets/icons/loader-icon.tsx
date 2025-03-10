import * as React from "react";

const LoaderIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 100 100" {...props}>
        <path d="M31.6 3.5C5.9 13.6-6.6 42.7 3.5 68.4s39.2 38.3 64.9 28.1l-3.1-7.9C44 97 19.9 86.6 11.5 65.3s2-45.4 23.3-53.8z" >
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1.5s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
            />
        </path>
        <path d="M42.3 39.6c5.7-4.3 13.9-3.1 18.1 2.7 4.3 5.7 3.1 13.9-2.7 18.1l4.1 5.5c8.8-6.5 10.6-19 4.1-27.7-6.5-8.8-19-10.6-27.7-4.1z" >
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="-360 50 50"
                repeatCount="indefinite"
            />
        </path>
        <path d="M82 35.7C74.1 18 53.4 10.1 35.7 18S10.1 46.6 18 64.3l7.6-3.4c-6-13.5 0-29.3 13.5-35.3s29.3 0 35.3 13.5z" >
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="2s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
            />
        </path>
    </svg>
);

export default LoaderIcon;
