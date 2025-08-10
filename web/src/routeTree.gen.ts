/* This file stitches the route tree from colocated route definitions. */
import { Route as RootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
// Single-page landing: steps & why merged into home

const root = RootRoute
const index = IndexRoute
// no extra routes

export const routeTree = root.addChildren([index])


