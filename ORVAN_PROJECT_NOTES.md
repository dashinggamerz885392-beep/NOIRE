# ORVAN — PROJECT NOTES

## Brand
- Previous name: NOIRÉ
- Current name: ORVAN
- Business: Clothing brand
- Style: Sporty + Athletic
- Audience: Men, Women, Kids
- Brand colours: Black + White
- Slogan: BUILT TO MOVE

## Technology
- HTML
- CSS
- JavaScript
- Node.js
- Express
- Supabase

## Main Files
- index.html
- style.css
- app.js
- collections.html
- about.html
- product.html
- search.html
- checkout.html
- noire-backend/

## Existing Features
- Central Product Database (NOIRE_PRODUCTS)
- Dynamic product cards
- Product details page
- Product image gallery
- Size selection
- Size-based pricing
- Quantity selection
- Shopping cart
- Wishlist
- Search functionality
- Collections
- Login / Signup
- Supabase connection
- Checkout page
- COD payment option

## Backend
- Express server
- Port: 3000
- Supabase database
- Product reviews table
- Orders integration in progress

## Important Coding Instructions
- Preserve existing website structure.
- Do not unnecessarily remove old functionality.
- Avoid duplicate CSS and JavaScript.
- Give exact file names and paste locations.
- Prefer small targeted code changes.
- Ask for existing code only when required.
- Provide copy-paste-ready code.

## Pending Work
1. Complete ORVAN to ORVAN rebranding.
2. Finish checkout and backend integration.
3. Build admin dashboard.
4. Test cart, wishlist, search and checkout.
5. Test responsive design.
6. Final website testing and deployment.

## Continuation Instruction
Continue working on the existing ORVAN website.
Do not start a new project from scratch.
Use the existing project structure and previous decisions.

# ORVAN — PROJECT NOTES

## 1. Project Overview
- Brand name: ORVAN
- Previous name: NOIRÉ
- Website type: Clothing / Fashion E-commerce
- Technology: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database & Authentication: Supabase
- Local frontend: `http://127.0.0.1:5500`
- Backend: `http://localhost:3000`

## 2. Brand Identity
- Brand name: ORVAN
- Slogan: BUILT TO MOVE
- Style: Sporty + Athletic
- Colors: Black + White
- Audience: Men / Women / Kids

## 3. Completed Features
- Home page and navigation
- Product cards and central product database
- Product details page
- Product image gallery and thumbnails
- Size selection and quantity controls
- Product search and fuzzy matching
- Collections and product filters
- Cart using localStorage
- Wishlist
- Supabase login/signup
- Password reset
- Express backend setup
- Supabase connection tested
- Checkout page with customer details
- COD checkout integration setup
- Backend customer authentication
- Order and order-items database integration

## 4. Important Existing Files
- `index.html`
- `style.css`
- `app.js`
- `collections.html`
- `about.html`
- `product.html`
- `search.html`
- `checkout.html`
- `noire-backend/server.js`

## 5. Central Product Database
The central array is currently named:

`NOIRE_PRODUCTS`

Current products in the shared array:

| ID | Product | Price |
|---|---|---:|
| 17 | Essential Black Tee | ₹499 |
| 21 | Classic White Tee | ₹599 |

Product card generator:
`noireCreateProductCard(product)`

Product renderer:
`noireRenderProducts(container, productList)`

Important:
- Aura Essential Tee has ID 20 and was separately added to Supabase.
- Add it to the central array too if it should appear throughout the website.
- Keep product IDs consistent between website and Supabase.
- Classic White Tee currently has XXL in its array; change it to XL.
- Final supported sizes: S, M, L, XL.

## 6. Size-Based Pricing
Desired pricing:
- S = Base price
- M = Base price + ₹50
- L = Base price + ₹100
- XL = Base price + ₹150

The backend must calculate/verify the selected size price too. Never trust the frontend price alone.

## 7. Supabase & Backend
- Backend folder: `noire-backend`
- Server file: `server.js`
- Backend port: 3000
- Supabase products table exists.
- Orders and order_items tables exist.
- Supabase connection test was successful.
- Customer authentication uses the access token.
- Checkout sends the token to the backend.

To start backend:
1. Open terminal.
2. Run `cd noire-backend`
3. Run `node server.js`

Never put the Supabase service-role key in frontend code or share it in chat. Keep secrets in environment variables.

## 8. Pending Tasks — Priority Order

### Priority 1: Product Sync
- Collect all products from the central product database.
- Sync products into Supabase.
- Avoid duplicate product IDs.
- Verify names, prices, sizes and active status.

### Priority 2: Size Pricing
- Implement size-wise pricing in product details.
- Implement the same pricing validation in backend.
- Test all four sizes.

### Priority 3: Admin Dashboard
- Admin login / authorization
- Add new products
- Edit existing products
- Delete or deactivate products
- Update prices and sizes
- Manage stock
- Upload/manage product images

### Priority 4: Order Management
- Display customer orders.
- Show order items and totals.
- Update order status.
- Manage COD orders.

### Priority 5: ORVAN Rebranding
- Replace visible NOIRÉ branding with ORVAN.
- Update page titles and meta descriptions.
- Update logo and footer.
- Preserve internal JavaScript identifiers unless a change is necessary.

### Priority 6: Final Testing
- Signup and login
- Product search
- Product details
- Size and price calculation
- Cart and wishlist
- COD checkout
- Supabase order insertion
- Admin dashboard
- Mobile responsiveness

## 9. Coding Rules
- Do not rebuild the website from scratch.
- Preserve existing HTML/CSS/JS structure.
- Do not create duplicate functions or CSS blocks.
- Always mention the exact file and insertion/replacement location.
- Provide complete, copy-paste-ready code when changing a section.
- Check existing code before suggesting replacement.
- Do not expose database secrets.

## 10. Current Next Step
FIRST: Complete the product database sync with Supabase.

SECOND: Verify product IDs and size-based pricing.

THIRD: Start building the ORVAN Admin Dashboard.

Continue from the existing project. Do not start a new website.
