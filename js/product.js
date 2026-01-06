let params = new URLSearchParams(window.location.search)
let id = params.get("id")
let productDiv = document.getElementById("product")

async function loadProduct(productId) {
  if (!productId) {
    productDiv.innerHTML = "<h3 class='text-danger text-center'>No product selected</h3>"
    return
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`)
    if (!res.ok) throw new Error("Failed to fetch product")
    const p = await res.json()

    productDiv.innerHTML = `
      <div class="product-card">
        <h1 class="card-title">Product Details</h1>
        <div class="product-details">
          <div class="product-image">
            <img src="${p.thumbnail}" alt="${p.title}">
          </div>
          <div class="product-info">
            <h2>${p.title}</h2>
            <p class="price">$${p.price}</p>
            <p class="stock">Stock: ${p.stock}</p>
            <p class="rating">⭐ ${p.rating}</p>
            <p class="description">${p.description}</p>
            <a href="index.html" class="btn btn-primary back-btn">Back to Home</a>
          </div>
        </div>
      </div>
    `
  } catch (err) {
    productDiv.innerHTML = `<h3 class='text-danger text-center'>Error loading product</h3>`
    console.error(err)
  }
}

loadProduct(id)
