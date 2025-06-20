# Formspree Setup Guide

This guide will help you set up Formspree to send product inquiries directly from your website to your email address.

## What is Formspree?

Formspree is a free service that allows you to send emails from HTML forms without any backend code. It's perfect for static websites and simple contact forms.

## Setup Steps:

### 1. Create a Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Create a New Form
1. In your Formspree dashboard, click "New Form"
2. Give your form a name (e.g., "House Shop Inquiries")
3. Click "Create Form"

### 3. Get Your Form Endpoint
1. After creating the form, you'll see a form endpoint URL
2. It will look like: `https://formspree.io/f/xaybzwkd`
3. Copy this URL

### 4. Update Your Code
1. Open `components/ProductInquiryForm.tsx`
2. Find this line:
   ```javascript
   const formEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'
   ```
3. Replace `YOUR_FORM_ID` with your actual form endpoint
4. For example:
   ```javascript
   const formEndpoint = 'https://formspree.io/f/xaybzwkd'
   ```

### 5. Configure Email Settings
1. In your Formspree dashboard, go to your form settings
2. Set the recipient email to: `svilinuks@gmail.com`
3. You can also customize the email subject and other settings

### 6. Test the Form
1. Restart your development server
2. Go to any product page
3. Click "Request Information"
4. Fill out the form and submit
5. Check your email (svilinuks@gmail.com) for the inquiry

## Features:

- ✅ **Completely Free** - No cost for basic usage
- ✅ **No Email Client Required** - Works directly from the website
- ✅ **Spam Protection** - Built-in spam filtering
- ✅ **Email Notifications** - Instant email delivery
- ✅ **Dashboard** - View all submissions in one place
- ✅ **No Backend Required** - Works with static websites

## Free Plan Limits:

- 50 submissions per month (more than enough for most websites)
- Basic spam protection
- Email notifications
- Form dashboard

## Troubleshooting:

### Form not sending emails:
1. Check that you've replaced `YOUR_FORM_ID` with the correct endpoint
2. Verify your Formspree account is active
3. Check the browser console for any errors
4. Make sure the recipient email is set correctly in Formspree

### Emails going to spam:
1. Check your spam folder
2. Add Formspree to your email whitelist
3. Verify your email address in Formspree

### Form validation errors:
1. Make sure all required fields are filled
2. Check that email format is valid (if provided)
3. Ensure phone number format is correct (if provided)

## Security:

- Formspree handles spam protection automatically
- Your email address is protected
- No sensitive data is stored permanently
- HTTPS encryption for all submissions

## Support:

- Formspree Documentation: [https://formspree.io/docs/](https://formspree.io/docs/)
- Formspree Support: [https://formspree.io/support/](https://formspree.io/support/)

## Alternative Free Services:

If Formspree doesn't work for you, here are other free alternatives:

1. **Netlify Forms** - If you're hosting on Netlify
2. **Getform.io** - Similar to Formspree
3. **Web3Forms** - Another free form service

## Next Steps:

1. Set up your Formspree account
2. Update the form endpoint in the code
3. Test the form
4. Monitor your email for inquiries

That's it! Your form will now send emails directly to your inbox without requiring users to have an email client configured. 