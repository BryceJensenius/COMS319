import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Col, Button } from 'react-bootstrap';


const root = ReactDOM.createRoot(document.getElementById('root'));

function ShowProducts(){
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/products.json");
      const data = await response.json();
      setCatalog(data);
      setFilteredCatalog(data);
      console.log(data);
      };
      fetchData();
}, []);

  return (
    <div className="row">
      {filteredCatalog.map((product) => {
        return (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4">
              <img
                src={product.image}
                className="card-img-top"
                style={{ width: "150px", margin: "auto", paddingTop: "20px" }}
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  <strong>Price:</strong> ${product.price} <br />
                  <strong>Description:</strong> {product.description} <br />
                  <strong>Category:</strong> {product.category} <br />
                  <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
root.render(
  <div>
    <ShowProducts/>
  </div>
);