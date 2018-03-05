FROM nginx:1.11


# Install only what is needed
RUN apt-get update && apt-get install -y --no-install-recommends curl \  
      && rm -rf /var/lib/apt/lists/*

# Remove default nginx
RUN rm /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /var/www/

# Convenicne just in case we want to add more configuration later
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80