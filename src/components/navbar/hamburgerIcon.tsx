export default function HamburgerIcon() {
  return (
    <svg
      className="hamburger-svg scale-[-1] stroke-gray-700"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 100 100"
      fill="none"
    >
      <line
        className="hamburger__middle-line"
        x1="10"
        y1="49.7935"
        x2="90"
        y2="49.7935"
        // stroke="black"
        strokeWidth="5"
      ></line>
      <path
        className="hamburger__top-line"
        d="M10 30.7935H87.5C87.5 26.9602 87.5 18.2936 87.5 16.2936C87.5 10.7936 85.5 8.96022 84.5 8.29355C80.9 5.89355 76.5 7.29355 74 8.79354L11.5 49.2936"
        // stroke="black"
        strokeWidth="5"
      ></path>
      <path
        className="hamburger__bottom-line"
        d="M10 68.7936H87.5C87.5 72.6269 87.5 81.2936 87.5 83.2936C87.5 88.7936 85.5 90.6269 84.5 91.2936C80.9 93.6936 76.5 92.2936 74 90.7936L11.5 50.2936"
        // stroke="black"
        strokeWidth="5"
      ></path>
    </svg>
  );
}
