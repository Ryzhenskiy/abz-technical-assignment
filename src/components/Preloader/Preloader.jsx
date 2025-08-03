const Preloader = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#00bcd4"
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="4">
        <circle strokeOpacity=".3" cx="22" cy="22" r="20" />
        <path d="M42 22c0-11.046-8.954-20-20-20">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 22 22"
            to="360 22 22"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);

export default Preloader;
