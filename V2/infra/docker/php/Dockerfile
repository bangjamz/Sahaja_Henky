# Citra PHP-FPM untuk Laravel. Versi dikunci di Rencana Apps/12 Catatan Keputusan.md.
FROM composer:2.8 AS composer

FROM php:8.4-fpm-alpine

RUN apk add --no-cache icu-libs libzip libpq \
    && apk add --no-cache --virtual .build icu-dev libzip-dev postgresql-dev $PHPIZE_DEPS \
    && docker-php-ext-install -j"$(nproc)" intl opcache pcntl pdo_pgsql pgsql zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build

COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY infra/docker/php/php.ini /usr/local/etc/php/conf.d/sahaja.ini

WORKDIR /var/www/backend
COPY backend/ ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress \
    && chown -R www-data:www-data storage bootstrap/cache

USER www-data
