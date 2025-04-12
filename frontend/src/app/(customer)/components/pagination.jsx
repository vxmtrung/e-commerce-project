'use client';
import { useState } from 'react';

export default function Pagination() {
  const itemPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 10;
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((next) => next + 1);
  }

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        ← Prev
      </button>
    <span>Trang {currentPage} / {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next →
      </button>
    </div>
  );
}