# Load .env file if existing
-include .env
export

VERBOSE=1
LINT_IMAGE_NAME=boilerplate-lint
TEST_IMAGE_NAME=boilerplate-test
PROJECT_NAME=boilerplate



local:
	cp .env.application .env
	@docker-compose up
.PHONY: local

local-reload:
	cp .env.application .env
	@docker-compose up --build
.PHONY: local-reload

lint:
	@docker build -t ${LINT_IMAGE_NAME} --label=Project=${PROJECT_NAME} .
	docker run --rm \
		--volume ${PWD}/.eslintrc.js:/home/node/app/.eslintrc.js \
		--volume ${PWD}/.eslintignore:/home/node/app/.eslintignore \
		--volume ${PWD}/.prettierrc.js:/home/node/app/.prettierrc.js \
		--volume ${PWD}/.prettierignore:/home/node/app/.prettierignore \
		--volume ${PWD}/tests/:/home/node/app/tests \
		--user root \
		${LINT_IMAGE_NAME} lint
.PHONY: lint

lint-fix:
	@docker build -t ${LINT_IMAGE_NAME} --label=Project=${PROJECT_NAME} .
	docker run --rm \
		--volume ${PWD}/.eslintrc.js:/home/node/app/.eslintrc.js \
		--volume ${PWD}/.eslintignore:/home/node/app/.eslintignore \
		--volume ${PWD}/.prettierrc.js:/home/node/app/.prettierrc.js \
		--volume ${PWD}/.prettierignore:/home/node/app/.prettierignore \
		--volume ${PWD}/tests/:/home/node/app/tests \
		--user root \
		${LINT_IMAGE_NAME} lint-fix
.PHONY: lint-fix

test:
	@docker build -t ${TEST_IMAGE_NAME} --label=Project=${PROJECT_NAME} .
	docker run --rm \
	-w /home/node/app \
		--volume ${PWD}/src:/home/node/app/src \
		--volume ${PWD}/tests/:/home/node/app/tests \
		--volume ${PWD}/jest.config.js:/home/node/app/jest.config.js \
		${TEST_IMAGE_NAME} test
.PHONY: test

build: 
	@docker build -f prod.Dockerfile -t ${PROJECT_NAME} .
.PHONY: build