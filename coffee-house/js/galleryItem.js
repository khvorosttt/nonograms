const galleryItem = (item) => `
    <div class="gallery-item">
        <div class="gallery-item-img">
            <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="gallery-item-context">
            <h3 class="item__name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <h3 class="item__cost">$${item.price}</h3>
        </div>
    </div>
`
export default galleryItem;