build-docker:
	docker build -t habitus_wa .

run-docker:
	docker run -it --rm -p 5000:5000 habitus_wa