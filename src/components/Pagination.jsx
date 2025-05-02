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
      <div className=" flex justify-center items-center gap-4">
        <button className="bg-amber-400 pt-2 pb-2 pr-3 pl-3 rounded-md m-2 w-20" onClick={previousPage} disabled={isDisabledPrev}>
          Previous
        </button>
        <button className="bg-amber-400 pt-2 pb-2 pr-3 pl-3 rounded-md m-2 w-20" onClick={nextPage} disabled={isDisabledNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
