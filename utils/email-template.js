export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2e2e2e; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 0;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <tr>
      <td style="background-color: #2e7d32; text-align: center; padding: 32px 20px;">
        <p style="font-size: 42px; line-height: 1; font-weight: 700; color: #ffffff; margin: 0;">SubDub</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 40px 30px;">
        <p style="font-size: 16px; margin-bottom: 24px;">
          Hello <strong style="color: #2e7d32;">${userName}</strong>,
        </p>

        <p style="font-size: 16px; margin-bottom: 24px;">
          Your <strong>${subscriptionName}</strong> subscription is set to renew on 
          <strong style="color: #2e7d32;">${renewalDate}</strong> 
          (${daysLeft} days from today).
        </p>

        <table cellpadding="14" cellspacing="0" border="0" width="100%" style="background-color: #e8f5e9; border-radius: 8px; margin-bottom: 28px;">
          <tr>
            <td style="font-size: 15px; border-bottom: 1px solid #c8e6c9;">
              <strong>Plan:</strong> ${planName}
            </td>
          </tr>
          <tr>
            <td style="font-size: 15px; border-bottom: 1px solid #c8e6c9;">
              <strong>Price:</strong> ${price}
            </td>
          </tr>
          <tr>
            <td style="font-size: 15px;">
              <strong>Payment Method:</strong> ${paymentMethod}
            </td>
          </tr>
        </table>

        <p style="font-size: 15px; margin-bottom: 20px;">
          To make changes or cancel your subscription, visit your 
          <a href="${accountSettingsLink}" style="color: #2e7d32; text-decoration: underline;">account settings</a> before the renewal date.
        </p>

        <p style="font-size: 15px; margin-top: 28px;">
          Need help? <a href="${supportLink}" style="color: #2e7d32; text-decoration: underline;">Contact our support team</a> anytime.
        </p>

        <p style="font-size: 15px; margin-top: 32px;">
          Best regards,<br>
          <strong>The SubDub Team</strong>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #e8f5e9; padding: 20px; text-align: center; font-size: 13px; color: #555;">
        <p style="margin: 0 0 10px;">
          SubDub Inc. | 123 Main St, Anytown, AN 12345
        </p>
        <p style="margin: 0;">
          <a href="#" style="color: #2e7d32; text-decoration: none; margin: 0 8px;">Unsubscribe</a> |
          <a href="#" style="color: #2e7d32; text-decoration: none; margin: 0 8px;">Privacy Policy</a> |
          <a href="#" style="color: #2e7d32; text-decoration: none; margin: 0 8px;">Terms</a>
        </p>
      </td>
    </tr>
  </table>
</div>

`;

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "3 days before reminder",
    generateSubject: (data) =>
      `🚀 3 Days Left!  ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];
