import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnBook } from "../store/slices/borrowSlice";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import closeIcon from "../assets/close-square.png";

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.borrow);

  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBook(email, bookId));
    dispatch(toggleReturnBookPopup());
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 p-5 flex items-center justify-center z-50"
      onClick={() => dispatch(toggleReturnBookPopup())}
    >
      <div
        className="w-full bg-white rounded-xl shadow-2xl md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Return Borrowed Book</h3>
            <img
              src={closeIcon}
              alt="close"
              className="w-6 h-6 cursor-pointer hover:opacity-75 transition"
              onClick={() => dispatch(toggleReturnBookPopup())}
            />
          </div>

          <form onSubmit={handleReturnBook} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Borrower's Email
              </label>
              <input
                type="email"
                defaultValue={email}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium outline-none"
                disabled
              />
            </div>
            <p className="text-xs text-gray-500">
              Returning this book will automatically calculate any applicable late fines based on the due date.
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                type="button"
                onClick={() => dispatch(toggleReturnBookPopup())}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium disabled:opacity-60"
              >
                {loading ? "Processing..." : "Confirm Return"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPopup;