FROM alpine:3.9 AS base

FROM base AS development

RUN apk add --update g++ git make nodejs python yarn
