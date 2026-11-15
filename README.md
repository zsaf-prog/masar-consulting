# Déploiement sur Vercel

Site vitrine Next.js 15, en arabe (RTL), sans base de données.

## Option A : via GitHub (recommandée)
1. Crée un dépôt GitHub vide et pousse ce dossier :
   ```bash
   git init && git add . && git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/<toi>/<repo>.git
   git push -u origin main
   ```
2. Sur https://vercel.com/new, importe le dépôt. Vercel détecte Next.js tout seul. Clique sur **Deploy**.

## Option B : en ligne de commande
```bash
npm install
npx vercel --prod
```

## Formulaire → e-mail (optionnel)
Sans configuration, le formulaire fonctionne en **mode démo** : il affiche le message de succès mais n'envoie rien.
Pour recevoir les demandes par e-mail, va dans Vercel → Settings → Environment Variables et ajoute :
- `RESEND_API_KEY` : ta clé Resend
- `CONTACT_TO_EMAIL` : l'adresse qui reçoit les demandes
- `CONTACT_FROM_EMAIL` : expéditeur vérifié dans Resend (sinon `onboarding@resend.dev`)

Ensuite, redéploie.

## Modifier le contenu
Tous les textes, services, coordonnées et le numéro WhatsApp sont dans `lib/site.ts`.
Les couleurs et les polices se règlent au début de `app/globals.css` (bloc `:root`).
Pour signer le site en bas de page, remplis le champ `credit` dans `lib/site.ts`, par exemple : "تصميم وتطوير: …".

## En local
```bash
npm install
npm run dev   # http://localhost:3000
```
