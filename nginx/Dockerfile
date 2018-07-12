FROM nginx:1.11


# Install only what is needed
RUN apt-get update && apt-get install -y --no-install-recommends curl \
      && rm -rf /var/lib/apt/lists/*

# Remove default nginx
RUN rm /usr/share/nginx/html/*
RUN rm -v /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Convenicne just in case we want to add more configuration later
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80 443
CMD ["/usr/sbin/nginx"]
