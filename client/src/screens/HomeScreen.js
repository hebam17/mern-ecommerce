import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import axios from "axios";
import logger from "use-reducer-logger";

const initialState = { loading: false, error: "", products: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return { ...state, loading: true };
    case "FETCHING_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCHING_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(reducer),
    initialState
  );
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCHING_START" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCHING_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCHIN_FAILED", payload: err });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
