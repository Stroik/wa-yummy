'use client';

import Link from 'next/link';

interface PaginationProps {
  page: number | string;
  pageSize: number | string;
  totalPages: number | string;
  setPage: React.Dispatch<React.SetStateAction<number | string>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number | string>>;
}

export const Pagination = ({
  page,
  pageSize,
  totalPages,
  setPage,
  setPageSize,
}: PaginationProps) => {
  const maxPageLinks = 10;
  const startPage = Math.max(
    Math.min(
      (page as number) - Math.floor(maxPageLinks / 2),
      (totalPages as number) - maxPageLinks
    ),
    0
  );
  const pages = Array.from(
    { length: Math.min(maxPageLinks, totalPages as number) },
    (_, i) => startPage + i + 1
  );

  return (
    <div className="join w-full flex items-center justify-center my-4" id="pagination">
      <button
        className="btn join-item"
        onClick={() => setPage((prev: number | string) => (prev as number) - 1)}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`btn join-item ${p + 1 === page ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setPage((p as number) + 1)}
        >
          {p + 1}
        </button>
      ))}
      {(totalPages as number) > startPage + maxPageLinks && (
        <>
          <button className="btn btn-primary join-item">...</button>
          <button
            className="btn btn-primary join-item"
            onClick={() => setPage((totalPages as number) - 1)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="btn join-item"
        onClick={() => setPage((prev: number | string) => (prev as number) + 1)}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
      {setPageSize && (
        <select
          className="select select-bordered join-item"
          value={pageSize}
          onChange={(event) => setPageSize(event.target.value)}
        >
          <option disabled>Cantidad</option>
          {[10, 20, 50, 100].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
