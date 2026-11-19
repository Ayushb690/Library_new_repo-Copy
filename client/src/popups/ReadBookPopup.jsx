import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleReadBookPopup } from '../store/slices/popUpSlice';

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed inset-0 bg-black/60 p-5 flex items-center justify-center z-50 overflow-y-auto"
      onClick={() => dispatch(toggleReadBookPopup())}
    >
      <div
        className="w-11/12 bg-white rounded-xl shadow-2xl sm:w-1/2 lg:w-1/3 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center bg-slate-800 text-white px-6 py-4">
          <h2 className="text-lg font-semibold">Book Details</h2>
          <button
            className="text-white text-2xl font-bold hover:text-gray-300 transition leading-none cursor-pointer"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            &times;
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Book Title
            </label>
            <p className="border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 text-gray-800 font-medium">
              {book?.title || "N/A"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Author
              </label>
              <p className="border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 text-gray-800">
                {book?.author || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                ISBN
              </label>
              <p className="border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 text-gray-800 font-mono text-xs">
                {book?.isbn || "N/A"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Borrow Price
              </label>
              <p className="border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 text-gray-800">
                {book?.price !== undefined ? `₹${book.price}` : "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Availability
              </label>
              <p className="border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 text-gray-800">
                {book?.availability && (book.quantity === undefined || book.quantity > 0)
                  ? "Available"
                  : "Unavailable"}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Description
            </label>
            <p className="border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 text-gray-700 text-sm whitespace-pre-wrap leading-relaxed min-h-[80px]">
              {book?.description || "No description provided."}
            </p>
          </div>
        </div>
        <div className="flex justify-end px-6 py-3.5 bg-gray-50 border-t border-gray-200">
          <button
            className="px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium"
            type="button"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
