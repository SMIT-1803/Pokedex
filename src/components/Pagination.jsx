import React, { useEffect, useRef } from "react";
import { useState } from "react";

function Pagination() {
  const [page, setPage] = useState(1);
  const [isDisabledPrev, setIsDisabledPrev] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(false);
 

  function disablePrevButton() {
    if (page - 1 < 1) {
      setIsDisabledPrev(true);
    }
  }

  function disableNextButton() {
    if (page + 1 > 5) {
      setIsDisabledNext(true);
    }
  }

  function nextPage() {
    setPage(page++);
    disableNextButton();
  }
  function previousPage() {
    setPage(page--);
    disablePrevButton();
  }

  return (
    <>
      <div className="grid grid-cols-4"></div>
      <div>
        <button onClick={previousPage} disabled={isDisabledPrev}>
          Previous
        </button>
        <button onClick={nextPage} disabled={isDisabledNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
