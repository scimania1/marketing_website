export enum PaginationItem {
  DOTS = "dots",
  NEXT = "next",
  PREV = "prev",
}

export type PaginationItemValue = number | PaginationItem;

// this needs to be a server component.
export type PaginationProps = {
  /**
   * The total number of pages
   */
  totalPages: number;
  /**
   * The active page
   */
  currentPage: number;
  /**
   * The number of pages to show on each side of the current page
   * @default 1
   */
  siblings?: number;
  /**
   * The number of pages to be shown at the beginning and the end of pagination
   * @default 1
   */
  boundaries?: number;
  /**
   * If `true`, show the "prev" and "next" buttons
   * @default false
   */
  showControls?: boolean;
};

function range(start: number, end: number, step: number = 1) {
  return Array.from(
    { length: (end - start) / step + 1 },
    (_, num) => start + num * step,
  );
}

function getRange(
  totalPages: number,
  currentPage: number,
  siblings: number,
  boundaries: number,
): PaginationItemValue[] {
  /** lets say we are in the middle of the array, then there is
   * 1 middle guy + siblings on either side (2 * siblings) +
   * boundary elements on either side (2 * boundaries) + 2 dots
   */
  const arraySize = siblings * 2 + boundaries * 2 + 3;
  if (arraySize >= totalPages) {
    return range(1, totalPages);
  }
  const leftSiblingIdx = Math.max(currentPage - siblings, boundaries);
  const rightSiblingIdx = Math.min(
    currentPage + siblings,
    totalPages - boundaries + 1,
  );
  const leftDotsVisible = leftSiblingIdx > boundaries + 2;
  const rightDotsVisible = totalPages - boundaries + 1 - rightSiblingIdx > 2;

  if (leftDotsVisible && !rightDotsVisible) {
    const rightCount = arraySize - boundaries;
    return [
      ...range(1, boundaries),
      PaginationItem.DOTS,
      ...range(rightCount, totalPages),
    ];
  }

  if (!leftDotsVisible && rightDotsVisible) {
    const leftCount = arraySize - boundaries - 1;
    return [
      ...range(1, leftCount),
      PaginationItem.DOTS,
      ...range(totalPages - boundaries + 1, totalPages),
    ];
  }

  return [
    ...range(1, boundaries),
    PaginationItem.DOTS,
    ...range(leftSiblingIdx, rightSiblingIdx),
    PaginationItem.DOTS,
    ...range(totalPages - boundaries + 1, totalPages),
  ];
}

// this function needs to return the paginationArray
export default function Pagination(props: PaginationProps) {
  // so let the total number of pages to be displayed be 8
  const {
    totalPages,
    currentPage,
    siblings = 1,
    boundaries = 1,
    showControls = true,
  } = props;
  let arr = getRange(totalPages, currentPage, siblings, boundaries);
  if (showControls) {
    arr = [PaginationItem.PREV, ...arr, PaginationItem.NEXT];
  }
  // rendering logic
  return (
    <div>
      {arr.map((val) => (
        <span key={val}>{val} </span>
      ))}
    </div>
  );
}
