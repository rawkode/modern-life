FROM node:11-alpine AS base

FROM base AS development

RUN apk add --update git make python g++
