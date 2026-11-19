import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../store/slices/bookSlice";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import closeIcon from "../assets/close-square.png";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.book);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    dispatch(
      addBook({
        title,
        author,
        isbn,
        price: Number(price),
        quantity: Number(quantity),
        description,
      })
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 p-5 flex items-center justify-center z-50 overflow-y-auto"
      onClick={() => dispatch(toggleAddBookPopup())}
    >
      <div
        className="w-full bg-white rounded-xl shadow-2xl md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Add New Book</h3>
            <img
              src={closeIcon}
              alt="close"
              className="w-6 h-6 cursor-pointer hover:opacity-75 transition"
              onClick={() => dispatch(toggleAddBookPopup())}
            />
          </div>

          <form onSubmit={handleAddBook} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Book Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Clean Code"
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Book Author *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Robert C. Martin"
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                ISBN *
              </label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="e.g. 978-0132350884"
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 font-mono text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">
                  Borrow Price (₹) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief overview of the book..."
                rows={3}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                onClick={() => dispatch(toggleAddBookPopup())}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPopup;
