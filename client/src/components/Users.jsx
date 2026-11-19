import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

const Users = () => {
  const { users = [] } = useSelector(state => state.user);
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;

    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        {/* Sub Header */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Registered Users
          </h2>
        </header>

        {/* Table */}
        {users && users.filter((u) => u.role === "User").length > 0 ? (
          <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b border-gray-200">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-center">Books Borrowed</th>
                  <th className="px-4 py-3 text-center">Registered On</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm">
                {users
                  .filter((u) => u.role === "User")
                  .map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-medium">
                        {user?.borrowedBooks?.length || 0}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 text-center p-8 bg-white rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-600">
              No registered users found in the library.
            </h3>
          </div>
        )}
      </main>
    </>
  );
};
export default Users;
