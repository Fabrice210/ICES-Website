# Mise en service de l'envoi des formulaires du site ICES

À l'attention de la personne qui gère le projet Vercel du site et le domaine `ices-consulting.com` chez OVH.

## Ce qui change
Les formulaires du site (contact, candidature partenaire) et les 6 formulaires des pages de campagne (`/campagne/…`) envoient leurs demandes à une fonction du site, `POST /api/demande`. Elle vérifie les champs puis envoie la demande par e-mail à **contact@ices-consulting.com** avec le service **Resend**. Rien n'est stocké par le site.

Aucune clé n'est dans le code : la fonction lit trois variables d'environnement, à renseigner dans Vercel.

## 1. Resend (environ 15 minutes)
1. Créer un compte sur resend.com (offre gratuite, quota mensuel à vérifier à l'inscription).
2. **Domains → Add domain** : `ices-consulting.com`.
3. Resend affiche des enregistrements DNS (DKIM et SPF, sur des sous-domaines dédiés à Resend). Les ajouter **tels quels** dans l'espace client OVH : Noms de domaine → `ices-consulting.com` → Zone DNS → Ajouter une entrée. Ne pas modifier les entrées existantes de la messagerie (MX, SPF de la boîte OVH).
4. Attendre que Resend affiche le domaine comme vérifié (de quelques minutes à quelques heures).
5. **API Keys → Create API key**, droit « Sending access », limité au domaine `ices-consulting.com`. Copier la clé : elle ne s'affiche qu'une fois. Ne pas l'envoyer par e-mail ni par message.

## 2. Vercel
Projet du site → Settings → Environment Variables, pour l'environnement **Production** (et Preview si besoin) :

| Nom | Valeur |
|---|---|
| `RESEND_API_KEY` | la clé créée à l'étape 1.5 |
| `FORMS_FROM` | `ICES <formulaires@ices-consulting.com>` (adresse d'envoi sur le domaine vérifié ; elle n'a pas besoin d'exister comme boîte) |
| `FORMS_TO` | `contact@ices-consulting.com` |
| `VITE_FORMS_ENDPOINT` | `/api/demande` |

Puis redéployer le site (Deployments → Redeploy), pour que les variables soient prises en compte.

## 3. Déploiement du code
Le code est sur la branche `auto/api-demande` du dépôt `Fabrice210/ICES-Website`. Sa fusion dans la branche déployée par Vercel est décidée par Fabrice. Vercel crée aussi une adresse de prévisualisation pour la branche, utile pour tester avant la production.

## 4. Vérification
Envoyer une demande de test depuis :
- le formulaire de contact du site ;
- la modale « Devenir partenaire » ;
- chacune des pages `https://www.ices-consulting.com/campagne/<sujet>-besoin` (institutionnel, concessions, mandats, technologies, esg-climat, horizon-2045).

Chaque envoi doit arriver dans contact@ices-consulting.com, avec le sujet et tous les champs remplis. En cas d'échec : Vercel → projet → Logs, filtrer sur `/api/demande` (le détail de l'erreur y figure, jamais dans le navigateur).

## Autre possibilité
Si ICES préfère envoyer avec la boîte OVH elle-même (SMTP) plutôt qu'avec Resend, seule la fonction change ; il faudra alors les paramètres SMTP de la boîte et son mot de passe dans les variables Vercel. Le dire avant la mise en service.
