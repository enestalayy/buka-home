document.addEventListener("DOMContentLoaded", function () {
  // URL'den ürün parametresini al
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product");
  const itemWrapper = document.getElementById("item-wrapper");

  fetch("/jsons/products.json")
    .then((response) => response.json())
    .then((products) => {
      if (productId) {
        const product = products[productId];
        if (product) {
          // Ürün bilgilerini güncelle
          document.getElementById("product-name").textContent = product.name;
          // İtem oluştur
          console.log("products :>> ", products);
          products[productId].items.map((e) => {
            //  div
            const colDiv = document.createElement("div");
            colDiv.className = "col-md-6 col-lg-4";
            // anchor
            const anchor = document.createElement("a");
            anchor.href = `media/product-details/${productId}/${e.href}`;
            anchor.className = "media-1";
            anchor.setAttribute("data-fancybox", "gallery");
            // img
            const img = document.createElement("img");
            img.src = `media/product-details/${productId}/${e.href}`;
            img.alt = "Image";
            img.className = "img-fluid";
            // media div
            const mediaContent = document.createElement("div");
            mediaContent.className = "media-1-content";
            // media h2
            const h2 = document.createElement("h2");
            h2.textContent = e.title;
            // media span
            const span = document.createElement("span");
            span.className = "category";
            span.textContent = e.subtitle;

            // Elemanları birbirine bağlayın
            mediaContent.appendChild(h2);
            mediaContent.appendChild(span);
            anchor.appendChild(img);
            anchor.appendChild(mediaContent);
            colDiv.appendChild(anchor);
            itemWrapper.appendChild(colDiv);
          });

          // Tamamlanan yapıyı 'item-wrapper' div'ine ekleyin

          // document.getElementById("product-image").src = product.image;
          document.getElementById("product-description").textContent =
            product.description;
          // document.getElementById("product-price").textContent = product.price;
        } else {
          // Ürün bulunamadı
          document.getElementById("product-name").textContent =
            "Product not found";
          document.getElementById("product-description").textContent =
            "No information is available for this product.";
        }
      } else {
        // Ürün ID'si bulunamadı
        document.getElementById("product-name").textContent =
          "Product not found";
        document.getElementById("product-description").textContent =
          "No information is available for this product.";
      }
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
