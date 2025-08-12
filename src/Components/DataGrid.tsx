import { useEffect, useState } from "react";

import SearchBar from "./Searchbar";
import Pagination from "./Pagination";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Dashboard = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(() =>
    parseInt(localStorage.getItem("currentPage") || "1")
  );

  const [pageSize, setPageSize] = useState<number>(() =>
    parseInt(localStorage.getItem("pageSize") || "10")
  );

  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem("searchQuery") || ""
  );

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>(() => {
    const stored = localStorage.getItem("sortConfig");
    return stored ? JSON.parse(stored) : { key: "", direction: null };
  });

  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("pageSize", pageSize.toString());
  }, [pageSize]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [sortConfig]);

  // Fetch comments
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // Filter comments by search query (name or email)
  const filteredComments = comments.filter((comment) => {
    const query = searchQuery.toLowerCase();
    return (
      comment.name.toLowerCase().includes(query) ||
      comment.email.toLowerCase().includes(query)
    );
  });

  // Sort filtered comments
  const sortedComments = [...filteredComments];
  if (sortConfig.direction && sortConfig.key) {
    sortedComments.sort((a, b) => {
      const valA = a[sortConfig.key as keyof Comment];
      const valB = b[sortConfig.key as keyof Comment];

      if (typeof valA === "string" && typeof valB === "string") {
        return sortConfig.direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }
      return 0;
    });
  }

  const totalPages = Math.ceil(sortedComments.length / pageSize);

  // Paginate
  const paginatedComments = sortedComments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Sort button handler
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      let nextDirection: "asc" | "desc" | null;

      if (prev.key === key) {
        if (prev.direction === "asc") nextDirection = "desc";
        else if (prev.direction === "desc") nextDirection = null;
        else nextDirection = "asc";
      } else {
        nextDirection = "asc";
      }

      return {
        key: nextDirection ? key : "",
        direction: nextDirection,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-[#1f2a44] text-white p-4 flex justify-between items-center">
        <div className="text-xl font-semibold">
          <span className="bg-green-600 px-2 py-1 rounded">S</span> WIFT
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
            EH
          </div>
          <span>Ervin Howell</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 bg-white shadow-md mt-6 rounded-lg">
        {/* Top Filters Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          {/* Sort Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("postId")}
              className="bg-gray-200 px-4 py-2 rounded text-sm"
            >
              Sort Post ID
              {sortConfig.key === "postId" &&
                (sortConfig.direction === "asc"
                  ? " ↑"
                  : sortConfig.direction === "desc"
                  ? " ↓"
                  : "")}
            </button>
            <button
              onClick={() => handleSort("name")}
              className="bg-gray-200 px-4 py-2 rounded text-sm"
            >
              Sort Name
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc"
                  ? " ↑"
                  : sortConfig.direction === "desc"
                  ? " ↓"
                  : "")}
            </button>
            <button
              onClick={() => handleSort("email")}
              className="bg-gray-200 px-4 py-2 rounded text-sm"
            >
              Sort Email
              {sortConfig.key === "email" &&
                (sortConfig.direction === "asc"
                  ? " ↑"
                  : sortConfig.direction === "desc"
                  ? " ↓"
                  : "")}
            </button>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-1/3">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search name, email, comment"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">Post ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Comment</th>
              </tr>
            </thead>
            <tbody>
              {paginatedComments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{comment.postId}</td>
                  <td className="border px-4 py-2">{comment.name}</td>
                  <td className="border px-4 py-2">{comment.email}</td>
                  <td className="border px-4 py-2">{comment.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm">
              Show
            </label>
            <select
              id="pageSize"
              className="border rounded px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm">entries</span>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            setPageSize={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
