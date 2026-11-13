# Nginx: meneruskan permintaan Laravel ke php-fpm. Berkas statis S1 dan S2 ditambahkan di M0-11.
FROM nginx:1.29-alpine
COPY infra/docker/web/default.conf /etc/nginx/conf.d/default.conf
COPY backend/public /var/www/backend/public
