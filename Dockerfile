FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Явно указываем папку сборки и показываем ошибки
RUN npm run build || (echo "Build failed!"; exit 1)
RUN ls -la /app/dist  # Проверяем, что файлы есть

FROM nginx:alpine
# Копируем ТОЛЬКО нужные файлы
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Фиксим права (nginx должен читать файлы)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80