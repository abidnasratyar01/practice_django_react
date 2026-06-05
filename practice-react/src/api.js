const BASE_URL = "http://localhost:8000/api";

export async function listProducts() {
    const res = await fetch(`${BASE_URL}/products/`);
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return await res.json();
}

export async function createProduct(data) {
    const res = await fetch(`${BASE_URL}/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return await res.json();
}

export async function updateProduct(id, data) {
    const res = await fetch(`${BASE_URL}/products/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return await res.json();
}

export async function deleteProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
}