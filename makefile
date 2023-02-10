# HOST=[create an env. variable]
# USER=[create an env. variable if one doesn't exist]

pub:
	@for file in *.html *.js; do \
		echo "publishing $$file to ${HOST}..."; \
		scp $$file ${USER}@${HOST}:~; \
	done

	@echo "deploying files to WWW directory..."
	@ssh ${USER}@${HOST} ./deploy.sh
