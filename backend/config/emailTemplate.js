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
            ${item.name} × ${item.quantity}
          </li>
        `
        )
        .join('')}
    </ul>

    <p><strong>Total Amount:</strong> ₹${amount}</p>

    <h3>Delivery Address</h3>
    <p>${address}</p>

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

export const orderConfirmationTemplate2 = ({
  userName,
  orderId,
  items,
  amount,
  address,
}) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    max-width: 620px;
    margin: auto;
    background-color: #f4f8f4;
    padding: 24px;
  ">
    
    <div style="
      background-color: #ffffff;
      border-radius: 8px;
      padding: 24px;
      border-top: 6px solid #2f855a;
    ">

      <h2 style="color: #2f855a; margin-bottom: 8px;">
        Order Confirmed 🌱
      </h2>

      <p style="color: #333;">
        Hi <strong>${userName}</strong>,
      </p>

      <p style="color: #555;">
        Thank you for choosing a greener way to shop. Your
        <strong>Cash on Delivery</strong> order has been placed successfully.
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8e2; margin: 20px 0;" />

      <p style="margin: 6px 0;">
        <strong>Order ID:</strong> ${orderId}
      </p>

      <h3 style="color: #2f855a; margin-top: 20px;">
        🌿 Order Summary
      </h3>

      <ul style="padding-left: 18px; color: #444;">
        ${items
          .map(
            (item) => `
            <li style="margin-bottom: 6px;">
              ${item.product} × ${item.quantity}
            </li>
          `
          )
          .join('')}
      </ul>

      <p style="font-size: 16px; margin-top: 12px;">
        <strong>Total Amount:</strong>
        <span style="color: #2f855a;">$ ${amount}</span>
      </p>

      <h3 style="color: #2f855a; margin-top: 20px;">
        🌱 Delivery Address
      </h3>

      <p style="color: #444;">
        ${address.street}
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8e2; margin: 20px 0;" />

      <p style="font-size: 14px; color: #555;">
        Your order will be delivered within <strong>3–5 business days</strong>.
      </p>

      <p style="font-size: 14px; color: #2f855a;">
        Thank you for supporting a greener future 💚
      </p>

      <p style="font-size: 12px; color: #888;">
        If you have any questions, simply reply to this email.
      </p>

    </div>
  </div>
  `
}
