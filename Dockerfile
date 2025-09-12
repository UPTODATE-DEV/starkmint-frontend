FROM node:18-alpine

# Installer les dépendances système
RUN apk add --no-cache python3 make g++

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances (y compris dev dependencies pour le build)
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port
EXPOSE 3001

# Commande de démarrage
ENV PORT=3001
ENV HOSTNAME=0.0.0.0
CMD ["npm", "start"]
