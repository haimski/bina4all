# Guide: Adding a New Project/App to Your Website

This guide explains the best ways to add a new project that will be accessible at:
`[your-domain]/my_new_app_folder/my_new_app.html`

## Recommended Approach: Public Folder (Simplest)

**Best for:** Standalone HTML/CSS/JS files that don't need Vite processing

### Steps:

1. **Create the folder structure in `public/`:**
   ```
   public/
   └── my_new_app_folder/
       ├── my_new_app.html
       ├── styles.css (optional)
       └── script.js (optional)
   ```

2. **Files in `public/` are automatically copied to `dist/` during build**
   - No configuration needed
   - Accessible at: `yourdomain.com/my_new_app_folder/my_new_app.html`
   - Works in both dev and production

3. **Example `my_new_app.html`:**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>My New App</title>
       <link rel="stylesheet" href="styles.css">
   </head>
   <body>
       <h1>My New App</h1>
       <script src="script.js"></script>
   </body>
   </html>
   ```

### Advantages:
- ✅ Simple - no configuration needed
- ✅ Works immediately
- ✅ Files are served as-is
- ✅ Perfect for standalone apps

### Limitations:
- ❌ No Vite processing (no imports, bundling, etc.)
- ❌ Can't use ES modules or npm packages directly
- ❌ No hot module replacement in dev

---

## Alternative: Multi-Page Vite Config (Advanced)

**Best for:** Apps that need Vite processing, imports, or bundling

### Steps:

1. **Create the folder and HTML file in root:**
   ```
   my_new_app_folder/
   └── my_new_app.html
   ```

2. **Update `vite.config.js`:**
   ```javascript
   import { defineConfig } from 'vite'
   import { resolve } from 'path'

   export default defineConfig({
     server: {
       port: 3000,
       open: true
     },
     build: {
       rollupOptions: {
         input: {
           main: resolve(__dirname, 'index.html'),
           myNewApp: resolve(__dirname, 'my_new_app_folder/my_new_app.html'),
         }
       }
     }
   })
   ```

3. **In `my_new_app.html`, you can use:**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>My New App</title>
   </head>
   <body>
       <h1>My New App</h1>
       <script type="module" src="./my_new_app.js"></script>
   </body>
   </html>
   ```

4. **Create `my_new_app_folder/my_new_app.js`:**
   ```javascript
   // You can use ES modules, imports, etc.
   import { someFunction } from './utils.js'
   
   // Your app code here
   ```

### Advantages:
- ✅ Full Vite processing (bundling, imports, etc.)
- ✅ Can use npm packages
- ✅ Hot module replacement in dev
- ✅ Optimized builds

### Limitations:
- ❌ Requires configuration
- ❌ More complex setup

---

## Quick Start: Public Folder Method

1. Create the folder:
   ```bash
   mkdir -p public/my_new_app_folder
   ```

2. Create your HTML file:
   ```bash
   touch public/my_new_app_folder/my_new_app.html
   ```

3. Build and deploy:
   ```bash
   npm run build
   ```

4. Your app will be available at:
   - Dev: `http://localhost:3000/my_new_app_folder/my_new_app.html`
   - Production: `https://yourdomain.com/my_new_app_folder/my_new_app.html`

---

## Which Method Should You Use?

**Use Public Folder if:**
- Your app is standalone HTML/CSS/JS
- You don't need npm packages or ES modules
- You want the simplest setup

**Use Multi-Page Vite if:**
- You need to import npm packages
- You want to use ES modules
- You need Vite's build optimizations
- Your app is more complex

---

## Testing

After setup, test in development:
```bash
npm run dev
# Navigate to: http://localhost:3000/my_new_app_folder/my_new_app.html
```

Then build for production:
```bash
npm run build
# Check dist/my_new_app_folder/my_new_app.html exists
```
