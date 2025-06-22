# Deploying House Shop to GitHub Pages

This guide will help you deploy your Next.js House Shop application to GitHub Pages.

## Prerequisites

- A GitHub account
- Your project pushed to a GitHub repository
- Node.js 18+ installed locally

## Step-by-Step Deployment

### 1. Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. This will allow the workflow to deploy automatically

### 3. Configure Repository Settings

1. In your repository **Settings** → **Pages**:
   - **Source**: GitHub Actions
   - **Branch**: Leave as default (GitHub Actions will handle this)

### 4. Automatic Deployment

Once you push to the `main` branch, GitHub Actions will automatically:
1. Build your Next.js application
2. Generate static files
3. Deploy to GitHub Pages

### 5. Access Your Site

Your site will be available at:
```
https://[your-username].github.io/house-shop/
```

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Create a new branch for deployment**:
   ```bash
   git checkout -b gh-pages
   ```

3. **Add the built files**:
   ```bash
   git add out/
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

4. **Configure GitHub Pages** to use the `gh-pages` branch

## Configuration Details

### Next.js Config Changes

The following changes were made to `next.config.js`:

- `output: 'export'` - Enables static export
- `trailingSlash: true` - Adds trailing slashes for GitHub Pages compatibility
- `images.unoptimized: true` - Disables image optimization for static export
- `basePath` - Sets the correct base path for GitHub Pages

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file:
- Triggers on pushes to `main` branch
- Builds the Next.js application
- Deploys to GitHub Pages automatically

## Troubleshooting

### Common Issues

1. **404 Errors**: Make sure `trailingSlash: true` is set in `next.config.js`
2. **Base Path Issues**: Verify the `basePath` matches your repository name
3. **Build Failures**: Check the GitHub Actions logs for specific errors

### Local Testing

Test the build locally before deploying:
```bash
npm run build
npx serve out/
```

## Environment Variables

If you need environment variables for production:
1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Add any required environment variables
3. Update the workflow file to use them

## Support

For more information:
- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions) 