import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { listProducts, createProduct, updateProduct, deleteProduct } from './api';

const EMPTY = { name: "", description: "", price: 0, in_stock: true };

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { refresh(); }, []);

  async function refresh() {
    try {
      setLoading(true);
      setProducts(await listProducts());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit() {
    try{
      const payload = { ...form, price: parseFloat(form.price) };
      if (editingId)  await updateProduct(editingId, payload);
      else await createProduct(payload);
      setForm(EMPTY);
      setEditingId(null);
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      in_stock: product.in_stock
    });
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style= {{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Product Manager</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <label>
          <input name="in_stock" type="checkbox" checked={form.in_stock} onChange={handleChange} />
          In Stock
        </label>
        <button onClick={handleSubmit}>{editingId ? "Update" : "Create"}</button>
        {editingId && <button onClick={() => { setForm(EMPTY); setEditingId(null); }}>Cancel</button>}
      </div>
      {loading ? (<div>Loading...</div>) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map( (p) => (
            <li key={p.id} >
              <strong>{p.name}</strong> - ${p.price} {p.in_stock ? "✓" : "✗"}
              <button onClick={() => startEdit(p)} style={{ marginLeft: 8 }}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 4 }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
