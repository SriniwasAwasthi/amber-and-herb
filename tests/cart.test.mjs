import test from 'node:test';
import assert from 'node:assert/strict';

// Cart computation unit tests for Amber & Herb
function calculateOrderTotal(items, deliveryFee = 2.99, taxRate = 0.08) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;
  return { subtotal, deliveryFee, tax, total };
}

test('Cart Pricing: calculates subtotal accurately', () => {
  const items = [
    { name: 'Truffle Burger', price: 14.99, quantity: 2 },
    { name: 'Herb Fries', price: 4.50, quantity: 1 }
  ];
  const { subtotal } = calculateOrderTotal(items);
  assert.equal(subtotal, 34.48);
});

test('Cart Pricing: calculates total with tax and delivery', () => {
  const items = [
    { name: 'Artisan Pizza', price: 20.00, quantity: 1 }
  ];
  const result = calculateOrderTotal(items, 3.00, 0.10);
  assert.equal(result.subtotal, 20.00);
  assert.equal(result.deliveryFee, 3.00);
  assert.equal(result.tax, 2.00);
  assert.equal(result.total, 25.00);
});

test('Cart Validation: empty cart handles zero items safely', () => {
  const result = calculateOrderTotal([]);
  assert.equal(result.subtotal, 0);
  assert.equal(result.tax, 0);
  assert.equal(result.total, 2.99);
});
