FROM node:lts

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expondo porta
EXPOSE 8080

# Comando padrão apenas para produção (overridden no docker-compose para dev)
CMD ["npm", "run", "start"]
