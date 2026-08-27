// Cross-sell "Hinzufügen" buttons on the cart page reuse Dawn's <product-form>,
// which already refreshes the item list via PUB_SUB_EVENTS.cartUpdate
// (see CartItems.connectedCallback in cart.js). main-cart-footer isn't
// subscribed to that event, so the subtotal wouldn't otherwise update after
// a cross-sell add — this refreshes it the same way cart.js refreshes
// sections on quantity change.
if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
  subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
    if (event.source === 'cart-items' || event.source === 'cart-cross-sell') return;

    const footer = document.getElementById('main-cart-footer');
    if (!footer) return;

    fetch(`${window.routes.cart_url}?section_id=main-cart-footer`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const source = html.querySelector('#main-cart-footer .js-contents');
        const target = footer.querySelector('.js-contents');
        if (source && target) target.innerHTML = source.innerHTML;
      })
      .catch((e) => console.error(e));
  });
}
