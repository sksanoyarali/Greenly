export const orderConfirmationTemplate = ({
  userName,
  orderId,
  items,
  amount,
  address,
}) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; padding: 20px;">
    
    <h2 style="color: #333;">Order Confirmed ✅</h2>

    <p>Hi <strong>${userName}</strong>,</p>

    <p>Thank you for your order! Your <strong>Cash on Delivery</strong> order has been placed successfully.</p>

    <hr />

    <p><strong>Order ID:</strong> ${orderId}</p>

    <h3>Order Summary</h3>
    <ul>
      ${items
        .map(
          (item) => `
          <li>
            ${item.product.name} × ${item.quantity}
          </li>
        `
        )
        .join('')}
    </ul>

    <p><strong>Total Amount:</strong>$ ${amount}</p>

    <h3>Delivery Address</h3>
    <p>${address.street} ${address.city}</p>

    <hr />

    <p style="font-size: 14px; color: #666;">
      You will receive your order within 3–5 business days.
    </p>

    <p>Thank you for shopping with us!</p>

    <p style="font-size: 12px; color: #999;">
      If you have any questions, reply to this email.
    </p>

  </div>
  `
}

export const orderConfirmationTemplateForOnlinePayment = ({
  userName,
  orderId,
  items,
  amount,
  address,
}) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; padding: 20px;">
    
    <h2 style="color: #333;">Order Confirmed ✅</h2>

    <p>Hi <strong>${userName}</strong>,</p>

    <p>Thank you for your order! Your <strong></strong> order has been placed successfully with payment completion.</p>

    <hr />

    <p><strong>Order ID:</strong> ${orderId}</p>

    <h3>Order Summary</h3>
    <ul>
      ${items
        .map(
          (item) => `
          <li>
            ${item.product.name} × ${item.quantity}
          </li>
        `
        )
        .join('')}
    </ul>

    <p><strong>Total Amount:</strong>$ ${amount}</p>

    <h3>Delivery Address</h3>
    <p>${address.street} ${address.city}</p>

    <hr />

    <p style="font-size: 14px; color: #666;">
      You will receive your order within 3–5 business days.
    </p>

    <p>Thank you for shopping with us!</p>

    <p style="font-size: 12px; color: #999;">
      If you have any questions, reply to this email.
    </p>

  </div>
  `
}
