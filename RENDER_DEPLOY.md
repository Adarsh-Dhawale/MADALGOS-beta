# Deploy MADAlgos (Next.js) to Render

## 1. Push your code to GitHub

- Make sure your repo is on GitHub (e.g. `Adarsh-griffin/MADAlgos`).
- Do **not** commit `.env.local`; add env vars in Render’s dashboard (see step 5).

---

## 2. Create a Render account and connect GitHub

1. Go to [render.com](https://render.com) and sign up (or log in).
2. Click **Dashboard** → **Connect account** (or **Account Settings** → **GitHub**).
3. Connect your GitHub account and authorize Render to access your repos.

---

## 3. Create a new Web Service

1. In the Render dashboard, click **New +** → **Web Service**.
2. Connect the repo:
   - If you see a list of repos, select **MADAlgos** (or your repo name).
   - If not, click **Configure account** and grant access to the repo, then select it.
3. Click **Connect** (or **Connect repository**).

---

## 4. Configure the Web Service

Use these settings:

| Field | Value |
|--------|--------|
| **Name** | `madalgos` (or any name you like) |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |
| **Instance Type** | Free (or paid if you need more resources) |

- **Root Directory:** Leave blank if the Next.js app is at the repo root.  
  If the app is in a subfolder (e.g. `madalgos-final`), set **Root Directory** to `madalgos-final`.

Click **Advanced** and add:

- **Environment:** `Node`  
- **Node Version:** `20` (or the version in your `package.json` engines, if set).

---

## 5. Add environment variables

In the same screen, open **Environment** / **Environment Variables**.

Add each variable from your `.env.local` (use the same names so the app keeps working):

| Key | Notes |
|-----|--------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ReCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | ReCAPTCHA secret key |
| `SendGridDevKey` | SendGrid API key |
| `MONGODB_URI` | Cosmos DB / MongoDB connection string (optional) |

- **Important:** Do **not** put secrets in the repo. Add them only in Render.
- For Next.js, any variable used in the browser must start with `NEXT_PUBLIC_`.

Click **Add** after each variable.

---

## 6. Deploy

1. Click **Create Web Service** (or **Save** then **Manual Deploy** → **Deploy latest commit**).
2. Render will:
   - Clone the repo
   - Run `npm install && npm run build`
   - Run `npm run start`
3. Wait for the build and deploy to finish. The log will show success or errors.
4. Your app will be at: `https://<your-service-name>.onrender.com`

---

## 6b. Changing pages / routes – do you need a rule?

**For your setup (Next.js Web Service): you do *not* need to add any rule for different pages.**

- Render sends **every request** (e.g. `/`, `/about`, `/blogs`, `/contact`) to your Node app.
- Next.js handles routing, so `/blogs`, `/contact`, etc. work and refreshes on those URLs do **not** 404.
- No “rewrite all to index” or “redirect rule” is required for client-side pages.

**When you *do* add rules (Redirects/Rewrites):**

Use rules only if you want **redirects** (e.g. old URL → new URL, or www → non-www):

1. Open your **Web Service** on Render → **Settings**.
2. Find **Redirects / Rewrites** (or **Redirects** in the left menu).
3. Add a rule, for example:
   - **Type:** Redirect  
   - **From:** `https://www.yourdomain.com/*`  
   - **To:** `https://yourdomain.com/$1`  
   - **Action:** 301 (permanent)

You can add multiple rules. Leave this section empty if you only need normal Next.js pages to work.

---

## 7. After deploy

- **Free tier:** The service may sleep after ~15 minutes of no traffic; the first request can be slow.
- **Custom domain:** In the service → **Settings** → **Custom Domains**, add your domain and follow the DNS instructions.
- **Logs:** Use **Logs** in the Render dashboard to debug build or runtime errors.
- **Env changes:** After changing env vars, use **Manual Deploy** → **Deploy latest commit** (or push a new commit if auto-deploy is on).

---

## If the app is in a subfolder (e.g. `madalgos-final`)

When creating the Web Service:

- Set **Root Directory** to: `madalgos-final`
- Build and start commands stay: `npm install && npm run build` and `npm run start`

Render will run all commands from that folder.
