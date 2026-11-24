import { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("default");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      setError(null);
      try {
        let base = "https://dummyjson.com/products?";

        if (search !== "") {
          base = `https://dummyjson.com/products/search?q=${search}&`;
        } else if (category !== "all") {
          base = `https://dummyjson.com/products/category/${category}?`;
        }

        let url = `${base}limit=${limit}&skip=${skip}`;
        if (sort !== "default") {
          const [sortBy, order] = sort.split("-");
          url += `&sortBy=${sortBy}&order=${order}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Server error");
        }
        const data = await res.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError("Could not load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [limit, skip, sort, category, search]);

  //to load categoey name
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch("https://dummyjson.com/products/category-list");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("Could not load categories");
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  //when user picks new limiit to show
  function handleLimitChange(e) {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  }

  function handleSortChange(e) {
    setSort(e.target.value);
    setCurrentPage(1);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
    setSearchInput("");
    setSearch("");
    setCurrentPage(1);
  }

  function handleSearchChange(e) {
    setSearchInput(e.target.value);
    setCategory("all");
  }
  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      setSearch(searchInput);
      setCurrentPage(1);
    }
  }

  return (
    <div className="container">
      <h1>Products (Page {currentPage})</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />

        <label>
          Sort by:{" "}
          <select value={sort} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
          </select>
        </label>

        <label>
          Category:{" "}
          <select value={category} onChange={handleCategoryChange}>
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* loading */}
      {loading && <p>Loading...</p>}

      {/* error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/*empty */}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}
      {/*products*/}
      {!loading && !error && products.length > 0 && (
        <ProductTable products={products} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <label>
        Show:{" "}
        <select value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>
    </div>
  );
}
export default App;
