import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import Logo from "./logo.png";

const LeftNavBar = ({catalog, setCatalog, filteredCatalog, setFilteredCatalog, categories}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filterCategory = (tag)=>{
        const results = catalog.filter((eachProduct) => {return eachProduct.category === tag})
        setFilteredCatalog(results)
    }

    const clearSearch = () => {
        setSearchTerm(""); // Clear the input
        setFilteredCatalog(catalog); // Reset to full catalog
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        const results = catalog.filter(eachProduct => {
        if (e.target.value === "") return catalog;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setFilteredCatalog(results);
    }
    
    return (
        <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: "350px" }}>
            {/* Logo Section */}
            <div className="text-center mb-4">
                <img src={Logo} alt="Logo" className="img-fluid" />
            </div>

            {/* Title Section */}
            <div className="text-center mb-4">
                <h4>Product Catalog App</h4>
            </div>

            {/* Tag Buttons Section */}
            <div className="mb-4">
                <p>Categories :</p>
                {categories.map((tag)=>{
                    return <Button variant="warning" className="mb-2 me-2 btn-sm" onClick={()=>{filterCategory(tag)}}>{tag}</Button>
                })}
            </div>

            {/* Search Input Section */}
            <div className="mb-4">
                <InputGroup>
                    <FormControl
                        placeholder="Search products..."
                        aria-label="Search products"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <Button variant="outline-secondary" onClick={clearSearch}>
                        <i className="bi bi-x"></i> {/* Bootstrap icon for clear */}
                    </Button>
                </InputGroup>
            </div>
        </div>
    );
};
export default LeftNavBar;