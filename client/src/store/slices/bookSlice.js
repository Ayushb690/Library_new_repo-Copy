import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../utils/api";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
        fetchBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload || [];
        },
        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        addBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        addBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetBookSlice(state) {
            state.error = null;
            state.message = null;
            state.loading = false;
        },
    },
});

export const fetchAllBooks = () => async (dispatch) => {
    dispatch(bookSlice.actions.fetchBooksRequest());

    await axios
        .get(`${API_BASE_URL}/api/v1/book/all`, {
            withCredentials: true,
        })
        .then((res) => {
            dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
        })
        .catch((err) => {
            dispatch(
                bookSlice.actions.fetchBooksFailed(err.response?.data?.message || err.message || "Failed to fetch books.")
            );
        });
};

export const addBook = (data) => async (dispatch) => {
    dispatch(bookSlice.actions.addBookRequest());
    await axios
        .post(`${API_BASE_URL}/api/v1/book/admin/add`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            dispatch(bookSlice.actions.addBookSuccess(res.data.message));
            toast.success(res.data.message);
            dispatch(toggleAddBookPopup());
            dispatch(fetchAllBooks());
        })
        .catch((err) => {
            const errorMsg = err.response?.data?.message || err.message || "Failed to add book.";
            dispatch(bookSlice.actions.addBookFailed(errorMsg));
            toast.error(errorMsg);
        });
};

export const resetBookSlice = () => (dispatch) => {
    dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;