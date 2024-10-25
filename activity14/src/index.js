import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Col, Button } from 'react-bootstrap';
import ShowProducts from "./App.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
    <ShowProducts />
  </div>
);