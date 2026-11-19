import { useState } from "react";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";
import { addNewAdmin } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import avatar_image from "../assets/avatar_image.jpeg";
import { toast } from "react-toastify";

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleNewAdmin = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      toast.error("Password must be between 8 and 16 characters long.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    dispatch(addNewAdmin(formData));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5 overflow-y-auto"
      onClick={() => dispatch(toggleAddNewAdminPopup())}
    >
      <div
        className="w-full bg-white rounded-xl shadow-2xl md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2.5 rounded-lg">
                <img src={keyIcon} alt="keyIcon" className="w-6 h-6 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Add New Admin
              </h3>
            </div>
            <img
              src={closeIcon}
              alt="close-icon"
              className="w-6 h-6 cursor-pointer hover:opacity-75 transition"
              onClick={() => dispatch(toggleAddNewAdminPopup())}
            />
          </header>

          <form onSubmit={handleNewAdmin} className="space-y-4">
            {/* avatar selection */}
            <div className="flex flex-col items-center mb-2">
              <label htmlFor="avatarInput" className="cursor-pointer group text-center">
                <div className="relative">
                  <img
                    src={avatarPreview || avatar_image}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 group-hover:border-slate-600 transition"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-xs font-medium">
                    Upload
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2 block">Click to upload avatar</span>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Admin's Full Name"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password (8-16 chars) *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin's Password"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                required
                minLength={8}
                maxLength={16}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                className="px-5 py-2.5 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-slate-800 rounded-lg text-white font-medium hover:bg-slate-900 transition disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAdmin;
