import React from 'react';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
        <>
         {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"}`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pg = idx + 1;
              return (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`px-3 py-2 rounded-md ${currentPage === pg ? "bg-white text-black font-bold" : "bg-[#0f0f0f] text-gray-300 hover:bg-[#1b1b1b]"}`}
                >
                  {pg}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"}`}
            >
              Next
            </button>
          </div>
        )}
            
        </>
    );
};

export default Pagination;