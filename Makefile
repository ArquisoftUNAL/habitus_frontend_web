build-docker:
	docker build -t habitus_wa .

run-docker:
	docker run -d -it --rm -p 80:80 --name habitus_wa --env-file .env habitus_wa