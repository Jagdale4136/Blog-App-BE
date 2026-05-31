import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadPosts = async (currentPage = 0, currentSort = "date") => {
    try {
      setLoading(true);

      const response = await api.post("/blog/blog-feed", {
        sortBy: currentSort,
        page: currentPage,
        row: 1,
      });

      const data = response.data.data;

      setPosts(data.content);
      setPage(data.pageNumber);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error loading posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(0, sortBy);
  }, []);

  const handleSortChange = (value) => {
    setSortBy(value);

    loadPosts(0, value);
  };

  const nextPage = () => {
    if (page < totalPages - 1) {
      loadPosts(page + 1, sortBy);
    }
  };

  const previousPage = () => {
    if (page > 0) {
      loadPosts(page - 1, sortBy);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5]">
      {/* Header */}

      <div className="bg-[#2d2d2d] text-white px-6 py-4">
        <h1 className="text-center text-3xl font-bold">Blog Dashboard</h1>

        <div className="mt-5">
          <button
            className="
                        w-full
                        bg-[#6c6c6c]
                        py-2
                        border
                        border-gray-500
                        hover:bg-[#7a7a7a]
                    "
          >
            Home
          </button>

          <button
            className="
                        w-full
                        bg-[#5f5f5f]
                        py-2
                        border
                        border-gray-500
                        hover:bg-[#7a7a7a]
                    "
            onClick={() => navigate("/create-post")}
          >
            Create New Post
          </button>

          <button
            className="
                         w-full
                        bg-[#5f5f5f]
                        py-2
                        border
                        border-gray-500
                        hover:bg-[#7a7a7a]
                    "
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </div>
      </div>

      {/* Content */}

      <div className="bg-white p-4">
        <div className="border p-4 bg-[#f5f5f5]">
          <h2 className="text-3xl font-bold mb-4">Blog Posts</h2>

          {/* Search UI only for now */}

          <input
            type="text"
            placeholder="Search posts..."
            className="
                            w-full
                            border
                            p-2
                            mb-3
                            bg-white
                        "
          />

          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="
                            w-full
                            border
                            p-2
                            mb-5
                            bg-white
                        "
          >
            <option value="date">Sort by Date</option>

            <option value="author">Sort by Author</option>
          </select>

          {loading && <div className="text-center p-5">Loading...</div>}

          {!loading &&
            posts.map((post) => (
              <div
                key={post.blogId}
                className="
                                    bg-[#e8e8e8]
                                    p-5
                                    mb-4
                                    relative
                                "
              >
                {post.isFeatured && (
                  <div
                    className="
                                        absolute
                                        top-3
                                        right-3
                                        bg-yellow-500
                                        text-white
                                        px-3
                                        py-1
                                        rounded
                                        text-xs
                                        font-bold
                                    "
                  >
                    FEATURED
                  </div>
                )}

                <h3
                  className="
                                    text-2xl
                                    font-bold
                                "
                >
                  {post.title}
                </h3>

                <p className="mt-3">
                  Author: {post.authorName}
                  {" | "}
                  Date: {new Date(post.createdAt).toLocaleDateString()}
                </p>

                <p className="mt-3">{post.content}</p>

                <button
                  className="
                                        mt-4
                                        font-semibold
                                        hover:underline
                                    "
                  onClick={() => {
                    if (post.readMoreLink) {
                      window.open(post.readMoreLink, "_blank");
                    }
                  }}
                >
                  Read More
                </button>
              </div>
            ))}

          {/* Pagination */}

          <button
            onClick={previousPage}
            disabled={page === 0}
            className="
                            w-full
                            bg-[#2d2d2d]
                            text-white
                            py-2
                            mt-4
                            disabled:opacity-50
                        "
          >
            &lt; Prev
          </button>

          <button
            onClick={nextPage}
            disabled={page >= totalPages - 1}
            className="
                            w-full
                            bg-[#2d2d2d]
                            text-white
                            py-2
                            mt-2
                            disabled:opacity-50
                        "
          >
            Next &gt;
          </button>
        </div>
      </div>

      {/* Footer */}

      <div
        className="
                bg-[#2d2d2d]
                text-white
                text-center
                py-6
            "
      >
        © 2024 Blog Platform
      </div>
    </div>
  );
};

export default Dashboard;
