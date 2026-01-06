let categoriesDiv = document.getElementById("categories")
let productsDiv = document.getElementById("products")
let sortSelect = document.getElementById("sort")
let page = 0
let limit = 10
let currentProducts = []

async function loadCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/categories")
    const data = await res.json()

    data.forEach(cat => {
      let div = document.createElement("div")
      div.className = "category-card"
      div.innerText = cat.name
      div.onclick = () => {
        document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"))
        div.classList.add("active")
        loadProducts(cat.slug)
      }
      categoriesDiv.appendChild(div)
    })
  } catch (err) {
    console.error("Failed to load categories:", err)
  }
}

async function loadProducts(category) {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`)
    const data = await res.json()
    currentProducts = data.products
    page = 0
    renderProducts()
    document.getElementById("pagination").style.display = "flex"
  } catch (err) {
    console.error("Failed to load products:", err)
  }
}

function renderProducts() {
  productsDiv.innerHTML = ""
  let start = page * limit
  let end = start + limit
  currentProducts.slice(start, end).forEach(p => {
    productsDiv.innerHTML += `
      <div class="col-md-3">
        <div class="card h-100">
          <img src="${p.thumbnail}" class="card-img-top">
          <div class="card-body">
            <h6>${p.title}</h6>
            <p>$${p.price}</p>
            <p>⭐ ${p.rating}</p>
            <a href="product.html?id=${p.id}" class="btn btn-primary btn-sm">View</a>
          </div>
        </div>
      </div>
    `
  })
}

document.getElementById("next").onclick = () => {
  if ((page + 1) * limit < currentProducts.length) {
    page++
    renderProducts()
  }
}

document.getElementById("prev").onclick = () => {
  if (page > 0) {
    page--
    renderProducts()
  }
}

sortSelect.onchange = () => {
  let val = sortSelect.value
  if (val === "title-asc") currentProducts.sort((a,b)=>a.title.localeCompare(b.title))
  if (val === "title-desc") currentProducts.sort((a,b)=>b.title.localeCompare(a.title))
  if (val === "price-asc") currentProducts.sort((a,b)=>a.price-b.price)
  if (val === "price-desc") currentProducts.sort((a,b)=>b.price-a.price)
  renderProducts()
}

loadCategories()
