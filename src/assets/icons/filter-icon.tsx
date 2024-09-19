import * as React from "react";

const FilterIcon = (props: any) => (
    <svg
        width={20}
        height={20}
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            clipRule="evenodd"
            d="M11 9.75c5.385 0 9.75-2.015 9.75-4.5S16.385.75 11 .75s-9.75 2.015-9.75 4.5 4.365 4.5 9.75 4.5"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M1.25 5.25a9.75 9.75 0 0 0 7.5 9.479V21a2.25 2.25 0 0 0 4.5 0v-6.271a9.75 9.75 0 0 0 7.5-9.479"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default FilterIcon;
