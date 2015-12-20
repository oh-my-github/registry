## export repository, language collection and append it to existing jsons
mongoexport --host 127.0.0.1 --port 27017 --db ohmygithub-dev --collection repository > repository.json
mongoexport --host 127.0.0.1 --port 27017 --db ohmygithub-dev --collection language > language.json
