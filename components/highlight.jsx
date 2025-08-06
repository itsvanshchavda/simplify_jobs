export default function Highlight({ title, children }) {
    return (
        <span className="relative inline-block">
            {title || children}
            {/* Mobile underline */}
            <svg
                className="absolute -bottom-1 left-0 -z-10 block lg:hidden"
                fill="none"
                height="6"
                viewBox="0 0 243 6"
                width="243"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4.12165 3.70282C9.98539 3.017 42.7571 1.44003 69.6102 0.550646C102.842 -0.549285 210.168 0.112961 227.924 1.52828C250.093 3.29481 247.757 4.59483 221.285 5.22212C176.606 6.28186 -0.00183183 6.24952 0 5.18191C0 4.63413 1.85566 3.96841 4.12165 3.70282Z"
                    fill="#3EC0DD"
                />
            </svg>
            {/* Desktop underline */}
            <svg
                className="absolute -bottom-2 left-0 -z-10 hidden lg:block"
                fill="none"
                height="8"
                viewBox="0 0 304 8"
                width="304"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.15631 4.64124C12.492 3.84112 53.4904 2.00132 87.0843 0.963709C128.658 -0.319544 262.926 0.453077 285.139 2.10428C312.873 4.16523 309.951 5.68193 276.834 6.41376C220.94 7.65012 -0.00229167 7.61239 0 6.36685C0 5.72777 2.32148 4.9511 5.15631 4.64124Z"
                    fill="#3EC0DD"
                />
            </svg>
        </span>
    );
}
