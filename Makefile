.PHONY: clean-branches install run build lint

clean-branches:
	@git remote prune origin
	@git branch -vv | grep "origin/.*: gone]" | awk '{print $$1}' | xargs git branch -D

install:
	@npm ci

run:
	@npm run serve

build:
	@npm run build

lint:
	@npm run lint
