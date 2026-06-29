# NorthLite Solar - Premium Enterprise Platform (CMS-Enabled)

High-performance digital infrastructure for **NorthLite Solar Limited**, a leading renewable energy provider delivering scalable, custom solar PV, battery storage, and smart financing models across West Africa and entering the US market.

This platform represents a comprehensive, modern visual and architectural revamp of the brand's digital presence. It is built using **Eleventy (11ty)** and **Tailwind CSS** for maximum speed, clean code, and device responsiveness, and is integrated with **Decap CMS** for seamless client content management.

---

## 🌟 Architecture & Features

### 1. Headless Content Management System (CMS)
The site is integrated with **Decap CMS** (formerly Netlify CMS). The client can log in to `/admin` to edit all website content without writing any code:
*   **Home Page**: Edit Hero slideshow pictures/copy, "Our Story", Value Pillars, Solutions listing, Footprints (Ghana vs US lists), Testimonials, and CTAs.
*   **About Page**: Edit hero images, CEO quote, specialized divisions, and team members' bios, roles, and LinkedIn links.
*   **Solutions Page**: Edit tab details (On-grid, Off-grid, PPAs, Commercial Scale), bento grid services cards, and methodology steps.
*   **Contact Page**: Edit support contacts, office addresses, and form settings.
*   **Impact, Foundation, Events, & News Pages**: Clean markdown-backed pages that can be styled and written straight from the CMS dashboard.

### 2. Premium Design & Performance
*   **Device Responsiveness**: Handled entirely through Tailwind breakpoints. Mobile and tablet navigation has been optimized to handle viewports under `1024px` with a premium staggered drawer menu, while desktop browsers display the full header navigation.
*   **Typographic Hierarchy**: Designed with Montserrat (for headers and display text) paired with Outfit (for body copy and buttons) for premium, modern brand coherence.
*   **Vanilla JS Logic**: Smooth slide transitions, telemetry statistical counters, custom scroll progress indicators, and spotlight-glow cards.

---

## 🛠️ Technical Stack

*   **SSG Framework**: Eleventy (11ty) v3
*   **Content Formatting**: Markdown (Frontmatter + Liquid/Nunjucks templates)
*   **Styling**: Tailwind CSS CDN integration with custom plugins (Forms, Container Queries, Typography) and `src/assets/css/style.css` custom classes.
*   **Logic**: Vanilla JavaScript (`src/assets/js/common.js`).

---

## 🚀 Local Development

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arya9779/northlitesolar.git
   cd northlitesolar
   ```
2. Install the dev dependencies (including Eleventy, Decap local proxy server, and npm-run-all):
   ```bash
   npm install
   ```

### 3. Running Locally
To launch both the Eleventy site server and the local Decap CMS proxy server concurrently, run:
```bash
npm run dev
```

*   **Website Preview**: [http://localhost:8080](http://localhost:8080)
*   **CMS Administration Panel**: [http://localhost:8080/admin/](http://localhost:8080/admin/)

---

## ☁️ Production Deployment & CMS Setup

To deploy the site and enable the CMS for client access, follow these steps:

### Step 1: Deploy to Netlify
1. Log in to [Netlify](https://www.netlify.com/) and click **Add new site** ➔ **Import an existing project**.
2. Connect to your GitHub repository and select `northlitesolar`.
3. Set the following build settings:
   *   **Build command**: `npm run build`
   *   **Publish directory**: `_site`
4. Click **Deploy site**.

### Step 2: Enable Netlify Identity (for CMS authentication)
Decap CMS is pre-configured to use Netlify Identity. To enable it:
1. In the Netlify dashboard for your site, go to **Site configuration** ➔ **Identity** and click **Enable Identity**.
2. Scroll down to **Registration preferences** and set it to **Invite only** (so only authorized people can access the CMS).
3. Scroll down to **Services** ➔ **Git Gateway** and click **Enable Git Gateway**. (This allows Identity to commit changes back to GitHub).

### Step 3: Log In to the Live CMS
1. Go to `https://your-site-name.netlify.app/admin/`.
2. Under "Sign up / Login", invite your client by their email address via the Netlify Identity dashboard.
3. Once they accept the invitation and set a password, they will be able to log in to the CMS and publish updates.
