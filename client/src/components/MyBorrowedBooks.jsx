import React, { useState } from "react";
import { BookA } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import Header from "../layout/Header";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { books = [] } = useSelector(state => state.book);
  const { userBorrowedBooks = [] } = useSelector(state => state.borrow);
  const { readBookPopup } = useSelector(state => state.popup);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((b) => b._id === id || b.id === id);
    setReadBook(book || { title: "Borrowed Book", description: "Details not available in local catalog." });
    dispatch(toggleReadBookPopup());
  };

  const formatDate = (timeStamp) => {
    if (!timeStamp) return "-";
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const [filter, setFilter] = useState("nonReturned");
  const returnedBooks = (userBorrowedBooks || []).filter(book => book.returned === true);
  const nonReturnedBooks = (userBorrowedBooks || []).filter(book => book.returned === false);

  const booksToDisplay = filter === "returned" ? returnedBooks : nonReturnedBooks;

  return (
    <>
      <main className="relative flex flex-col flex-1 p-6 pt-28 min-h-screen">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold md:text-2xl text-gray-800">
              My Borrowed Books
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track your borrowed books, due dates, and return history.
            </p>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            className={`rounded-lg text-center border-2 font-semibold py-2.5 px-6 sm:w-64 transition-all duration-200 ${
              filter === "nonReturned"
                ? "bg-slate-700 text-white border-slate-700 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("nonReturned")}
          >
            Active Books ({nonReturnedBooks.length})
          </button>
          <button
            className={`rounded-lg text-center border-2 font-semibold py-2.5 px-6 sm:w-64 transition-all duration-200 ${
              filter === "returned"
                ? "bg-slate-700 text-white border-slate-700 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("returned")}
          >
            Returned History ({returnedBooks.length})
          </button>
        </div>

        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b border-gray-200">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Book Title</th>
                  <th className="px-4 py-3 text-left">Borrowed On</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">View</th>
                </tr>
              </thead>

              <tbody className="text-gray-800 text-sm">
                {booksToDisplay.map((book, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{book.bookTitle}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(book.borrowedDate)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(book.dueDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        book.returned
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {book.returned ? "Returned" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => openReadPopup(book.bookid || book.bookId)}
                        className="text-slate-600 hover:text-black p-1 hover:bg-gray-100 rounded transition"
                        title="View Book Details"
                      >
                        <BookA className="w-5 h-5 cursor-pointer mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 text-center p-8 bg-white rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-600">
              {filter === "returned" ? "No returned books in history." : "No currently borrowed books."}
            </h3>
          </div>
        )}
      </main>
      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  );
};

export default MyBorrowedBooks;
