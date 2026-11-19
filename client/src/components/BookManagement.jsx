import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { resetBorrowSlice } from "../store/slices/borrowSlice";
import { toggleReadBookPopup, toggleRecordBookPopup, toggleAddBookPopup } from "../store/slices/popUpSlice";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";
import AddBookPopup from "../popups/AddBookPopup";
import Header from "../layout/Header";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books = [] } = useSelector(state => state.book);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
  const {
    loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book || {});
    dispatch(toggleReadBookPopup());
  };

  const [borrowBookId, setBorrowBookId] = useState("");

  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [
    dispatch,
    message,
    error,
    borrowSliceError,
    borrowSliceMessage
  ]);

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = (books || []).filter((book) =>
    (book.title && book.title.toLowerCase().includes(searchedKeyword)) ||
    (book.author && book.author.toLowerCase().includes(searchedKeyword)) ||
    (book.isbn && book.isbn.toLowerCase().includes(searchedKeyword))
  );

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        {/* subheader */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user && user.role === "Admin" ? "Book Management" : "Books"}
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {isAuthenticated && user?.role === "Admin" && (
              <button
                onClick={() => dispatch(toggleAddBookPopup())}
                className="relative pl-12 pr-6 py-2.5 w-full sm:w-48 flex items-center justify-center text-white font-medium rounded-lg bg-slate-700 hover:bg-slate-800 transition-all shadow-sm"
              >
                <span className="bg-white flex justify-center items-center rounded-full text-slate-700 w-5 h-5 text-base font-bold absolute left-4">
                  +
                </span>
                Add Book
              </button>
            )}
            <input
              type="text"
              placeholder="Search books..."
              className="w-full sm:w-60 border px-3 py-2 border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
              value={searchedKeyword}
              onChange={handleSearch}
            />
          </div>
        </header>

        {/* Table */}
        {searchedBooks && searchedBooks.length > 0 ? (
          <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b border-gray-200">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Author</th>
                  <th className="px-4 py-3 text-left">ISBN</th>
                  {isAuthenticated && user?.role === "Admin" && (
                    <th className="px-4 py-3 text-left">Qty</th>
                  )}
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm">
                {searchedBooks.map((book, index) => (
                  <tr
                    key={book._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{book.title}</td>
                    <td className="px-4 py-3 text-gray-600">{book.author}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{book.isbn || "-"}</td>
                    {isAuthenticated && user?.role === "Admin" && (
                      <td className="px-4 py-3">{book.quantity}</td>
                    )}
                    <td className="px-4 py-3 font-medium">{`₹${book.price}`}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        book.availability && book.quantity > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {book.availability && book.quantity > 0 ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => openReadPopup(book._id)}
                          className="text-slate-600 hover:text-black p-1 hover:bg-gray-100 rounded transition"
                          title="View Book Details"
                        >
                          <BookA className="w-5 h-5 cursor-pointer" />
                        </button>
                        {isAuthenticated && user?.role === "Admin" && (
                          <button
                            type="button"
                            onClick={() => openRecordBookPopup(book._id)}
                            className="text-slate-600 hover:text-black p-1 hover:bg-gray-100 rounded transition"
                            title="Record Book Borrow"
                            disabled={!book.availability || book.quantity <= 0}
                          >
                            <NotebookPen className={`w-5 h-5 ${!book.availability || book.quantity <= 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-12 text-center p-8 bg-white rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-600">
              No books found in the library.
            </h3>
          </div>
        )}
      </main>
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook} />}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
    </>
  );
};

export default BookManagement;
