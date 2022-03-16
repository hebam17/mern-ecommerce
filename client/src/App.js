import data from "./data";
function App() {
  return (
    <div>
      <header>
        <a href="/">amazona</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
