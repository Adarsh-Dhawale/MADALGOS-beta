# MAD Algos – Deployment & Production Process (Azure DevOps)

This document describes the full deployment pipeline setup in **Azure DevOps**, deployment steps, and production care so your manager (or any deployer) can ship the app reliably.

**Repo note:** If the Next.js app lives in a subfolder (e.g. `madalgos-final`) inside the Azure repo `mad-algos-service`, use the pipeline from that folder (path: `madalgos-final/azure-pipelines.yml`) and ensure the pipeline runs all steps from that directory. If the repo root **is** the app, use `azure-pipelines.yml` at the root.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Environment Variables & Secrets](#2-environment-variables--secrets)
3. [Pipeline Setup – Step-by-Step (Azure DevOps)](#3-pipeline-setup--step-by-step-azure-devops)
4. [Deployment Steps (Automatic & Manual)](#4-deployment-steps-automatic--manual)
5. [Post-Deployment Verification](#5-post-deployment-verification)
6. [Production Care](#6-production-care)
7. [Rollback Procedure](#7-rollback-procedure)
8. [Checklist for Manager / Deployer](#8-checklist-for-manager--deployer)

---

## 1. Prerequisites

Before setting up the pipeline:

- **Repository:** Code in Azure DevOps, project **MADAlgosSolution**, repo **mad-algos-service**.
- **Node.js:** Version **20** (matches pipeline).
- **Next.js:** App uses `output: "standalone"` in `next.config.ts` for Azure App Service.
- **Azure App Service:**
  - Create an App Service (e.g. **MADAlgosServiceBeta**) with runtime **Node 20** (Linux).
  - Note the exact app name; you will use it in the pipeline.
- **Secrets:** Never commit `.env.local` or real secrets. Store them in Azure DevOps Variable Group and in Azure App Service Configuration.

---

## 2. Environment Variables & Secrets

### Required for build (pipeline Variable Group)

These are needed at **build time** for `next build`:

| Variable | Purpose | Set in Variable Group as secret |
|----------|---------|---------------------------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ReCAPTCHA site key | Yes (lock icon) |
| `MONGODB_URI` | Cosmos DB / MongoDB (optional) | Yes (lock icon) |

### Required at runtime (Azure App Service)

Set these in **Azure Portal** → **App Service** → **Configuration** → **Application settings**:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ReCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | ReCAPTCHA secret |
| `SendGridDevKey` | SendGrid API key (contact form) |
| `MONGODB_URI` | Cosmos DB / MongoDB (optional) |
| `NEXT_PUBLIC_BROCHURE_URL` | Brochure download URL (hero button) |
| `PORT` | App Service sets this; do not override unless needed |

See `.env.example` in the repo for the full list. Production values go only in the Variable Group and App Service Configuration.

---

## 3. Pipeline Setup – Step-by-Step (Azure DevOps)

Follow these steps in order. They match the Azure DevOps wizard: **Connect** → **Select** → **Configure** → **Review**.

---

### Step 1: Create the pipeline and connect the repo

1. In Azure DevOps, open your project (**MADAlgosSolution**).
2. In the left sidebar, click **Pipelines** → **Pipelines**.
3. Click **Create pipeline** (or **New pipeline**).
4. Under **Where is your code?**, select **Azure Repos Git**.
5. Click **Continue**.

---

### Step 2: Select the repository

1. Select the repository that contains your app: **mad-algos-service** (or the repo name you use).
2. Click **Continue**.

---

### Step 3: Configure your pipeline (choose YAML)

On the **Configure your pipeline** screen you will see options such as:

- Node.js  
- Node.js React Web App to Linux on Azure  
- Starter pipeline  
- **Existing Azure Pipelines YAML file**  
- etc.

**Do this:**

1. Click **Existing Azure Pipelines YAML file**.
2. Choose **Branch:** `main` (or your production branch).
3. **Path:**  
   - If the app is at the **root** of the repo, select: **/** and then **azure-pipelines.yml**.  
   - If the app is in a **subfolder** (e.g. `madalgos-final`), select: **madalgos-final/azure-pipelines.yml** (or the path where you added the YAML file).
4. Click **Continue**.

You will then see the **Review** screen with the YAML contents. Do **not** run the pipeline yet until you have completed **Step 4** (Variable Group) and **Step 5** (Service connection), or the build/deploy will fail.

---

### Step 4: Create a Variable Group for secrets

The pipeline needs build-time secrets in a **Variable group**.

1. In the left sidebar, go to **Pipelines** → **Library**.
2. Open the **Variable groups** tab.
3. Click **+ Variable group**.
4. **Name:** `madalgos-production-secrets` (must match the name in `azure-pipelines.yml`: `group: madalgos-production-secrets`).
5. Add variables and mark each as **secret** (lock icon):

   | Name | Value | Secret |
   |------|--------|--------|
| `MONGODB_URI` | Your Cosmos DB / MongoDB connection string | Yes |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Your ReCAPTCHA site key | Yes |
| `NEXT_PUBLIC_BROCHURE_URL` | Full brochure PDF URL (e.g. Google Drive or CDN link) so "Download Brochure" works in production | No (but required for brochure button) |

6. Click **Save**.

---

### Step 5: Create an Azure service connection

The pipeline deploys to Azure App Service using a **service connection**.

1. Click the **gear icon** (Project settings) in the bottom-left of Azure DevOps.
2. Under **Pipelines**, click **Service connections**.
3. Click **New service connection**.
4. Select **Azure Resource Manager** → **Next**.
5. Choose **Service principal (automatic)** → **Next**.
6. Select the **Subscription** and **Resource group** where your App Service (e.g. MADAlgosServiceBeta) lives.
7. **Service connection name:** e.g. `Azure-Production` (or any name; you will use this in the YAML).
8. Check **Grant access permission to all pipelines** (recommended).
9. Click **Save**.

**Update the pipeline YAML:**

1. Go back to **Pipelines** → **Pipelines** → open your pipeline → **Edit**.
2. In the **Deploy** stage, find the `AzureWebApp@1` task.
3. Replace `azureSubscription: '<your-service-connection-name>'` with the exact service connection name you created (e.g. `Azure-Production`).
4. Save the pipeline (commit and push the YAML if it’s in the repo, or save in the pipeline editor).

---

### Step 6: Create the “production” environment (optional but recommended)

The pipeline uses `environment: 'production'`. Azure DevOps will prompt you to create it the first time the Deploy stage runs.

1. In the left sidebar: **Pipelines** → **Environments**.
2. If **production** does not exist, click **New environment**.
3. **Name:** `production`.
4. Create it. You can add approvals/checks later if needed.

---

### Step 7: Run the pipeline

1. Go to **Pipelines** → **Pipelines** → select your pipeline.
2. Click **Run pipeline** → choose branch **main** → **Run**.
3. Watch the **Build** stage, then the **Deploy** stage. Both should succeed.
4. If the app is in a subfolder but the pipeline is at the repo root, the build will fail because `npm ci` and `next build` must run inside the app folder. In that case, move or add `azure-pipelines.yml` inside the app folder (e.g. `madalgos-final/azure-pipelines.yml`) and set the pipeline to use that path (Step 3). If your pipeline already uses that path, ensure all script steps use that folder (e.g. `workingDirectory` or `cd madalgos-final` in each step).

---

### If the app is in a subfolder (e.g. `madalgos-final`)

- **Option A:** Put `azure-pipelines.yml` inside the subfolder (e.g. `madalgos-final/azure-pipelines.yml`) and in **Configure your pipeline** select **Existing Azure Pipelines YAML file** with path **madalgos-final/azure-pipelines.yml**. The pipeline’s default working directory will be the repo root; add at the top of the job (under `jobs:`) a `workspace` or use a first step that changes directory. Easiest is to add to the **BuildJob**:

  ```yaml
  jobs:
    - job: BuildJob
      variables:
        - group: madalgos-production-secrets
      steps:
        - checkout: self
        - script: cd madalgos-final && npm ci
          displayName: 'npm ci'
        # ... rest of steps also run from repo root, so use "cd madalgos-final && ..." for each script, OR set workingDirectory
  ```

  Or use **workingDirectory** on each step, e.g. `workingDirectory: madalgos-final`.

- **Option B:** Keep one `azure-pipelines.yml` at the repo root and in every script step prefix with `cd madalgos-final && ...`, and in **ArchiveFiles** use `rootFolderOrFile: '$(System.DefaultWorkingDirectory)/madalgos-final/deploy'`.

The repo already contains `azure-pipelines.yml` in the app folder (`madalgos-final`). If your Azure repo is the same as this folder (no parent repo), use path **/azure-pipelines.yml**. If your Azure repo has this app in `madalgos-final`, use path **madalgos-final/azure-pipelines.yml** and add the subfolder handling above.

---

## 4. Deployment Steps (Automatic & Manual)

### Automatic (recommended)

- Push (or merge) to **main** → the pipeline runs automatically: **Build** then **Deploy** to Azure App Service **MADAlgosServiceBeta**.

### Manual run

1. **Pipelines** → **Pipelines** → select your pipeline.
2. Click **Run pipeline** → branch **main** → **Run**.

### Manual deploy without pipeline

1. Clone the repo from Azure DevOps and checkout `main`.
2. If the app is in a subfolder, `cd` into it (e.g. `madalgos-final`).
3. Run:
   ```bash
   npm ci
   npm run build
   ```
   Set `MONGODB_URI` and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in the environment (or use `.env.local` only locally; never commit it).
4. Prepare the deployment package (same as in the pipeline):
   ```bash
   mkdir -p deploy
   cp -r .next/standalone/. deploy/
   rm -rf deploy/.next && cp -r .next deploy/.next && rm -rf deploy/.next/standalone
   cp -r .next/static/. deploy/.next/static/
   cp -r public deploy/public
   cd deploy && zip -r ../deploy.zip . && cd ..
   ```
5. In Azure Portal: **App Service** → **Advanced Tools (Kudu)** → **Debug console** → upload and extract `deploy.zip` into `site/wwwroot`, or use **Deployment Center** with a local ZIP deploy.

---

## 5. Post-Deployment Verification

After every deploy:

1. **Homepage:** Open the production URL (e.g. `https://MADAlgosServiceBeta.azurewebsites.net` or your custom domain). Confirm the homepage loads.
2. **Key routes:** Visit `/blogs`, `/contact`, `/mentors`. No 404s.
3. **Contact form:** Submit a test message. Check that email is received (SendGrid) and, if used, that the inquiry appears in Cosmos DB.
4. **Brochure / CTA:** Click “Download Brochure” and other CTAs that use `NEXT_PUBLIC_BROCHURE_URL`.
5. **Logs:** In Azure App Service → **Log stream**, confirm no repeated errors after deploy.

Document the production URL and custom domain in your runbook.

---

## 6. Production Care

### Monitoring

- **Azure App Service** → **Monitoring** → **Metrics**: CPU, memory, response time, HTTP 5xx. Set **Alerts** for high error rate or downtime.
- **Application Insights (optional):** Enable in the App Service for traces and exceptions.
- **Log stream:** Use for quick debugging after a deploy.
- **Uptime:** Use an external checker (e.g. UptimeRobot) on the production URL.

### Updating environment variables

- **App Service:** **Configuration** → **Application settings** → add/edit → **Save**. Azure usually restarts the app automatically.
- **Pipeline (build-time):** **Pipelines** → **Library** → **Variable groups** → edit `madalgos-production-secrets` → **Save**. Run a new pipeline run so the next build uses the new values.

Never commit production secrets to the repo.

### Database (Cosmos DB / MongoDB)

- Ensure backups are enabled. Periodically confirm the app can read/write (e.g. submit a test contact and check the DB).

### Dependencies and security

- Run `npm audit` periodically and fix critical/high issues. Update dependencies on a branch, then merge to `main` and let the pipeline deploy.

### Custom domain and SSL

- **App Service** → **Settings** → **Custom domains** → add domain and bind SSL (e.g. App Service Managed Certificate). Renew before expiry.

---

## 7. Rollback Procedure

If a deployment causes issues:

1. **Redeploy previous build (Azure DevOps):**
   - **Pipelines** → your pipeline → **Runs**.
   - Open the last **successful** run (before the bad deploy).
   - Click **Run new** or **Rerun** to redeploy that same build’s artifact to Azure.

2. **Manual rollback:**
   - Use **Deployment slots** if configured: swap the production slot back to the previous deployment.
   - Otherwise, redeploy the previous `deploy.zip` (from a backup or from the last good pipeline run) via **Deployment Center** or Kudu.

3. **Code rollback:** Revert the commit on `main` and push; the pipeline will build and deploy the reverted version.

Keep these steps in your team runbook with the pipeline and App Service names.

---

## 8. Checklist for Manager / Deployer

**First-time setup**

- [ ] Azure App Service exists (e.g. **MADAlgosServiceBeta**), Node 20 runtime.
- [ ] All production env vars set in App Service **Configuration** and in the pipeline **Variable group** (section 2).
- [ ] Pipeline created in Azure DevOps using **Existing Azure Pipelines YAML file** (section 3, Step 3).
- [ ] Variable group **madalgos-production-secrets** created and secrets added (section 3, Step 4).
- [ ] Azure service connection created and name updated in the pipeline YAML (section 3, Step 5).
- [ ] One successful pipeline run (Build + Deploy).
- [ ] Post-deployment verification (section 5) done.
- [ ] Monitoring/alerts configured (section 6).
- [ ] Rollback steps documented (section 7).

**Every deployment**

- [ ] Changes merged to `main` (or pipeline run manually).
- [ ] Pipeline run succeeded (Build + Deploy).
- [ ] Post-deployment verification (section 5) completed.
- [ ] No critical errors in App Service **Log stream** after deploy.
- [ ] If something is wrong: follow rollback (section 7), then fix and redeploy.

---

**Document version:** 2.0 (Azure DevOps only)  
**Related files:** `azure-pipelines.yml`, `.env.example`, `RENDER_DEPLOY.md` (optional alternative host).
