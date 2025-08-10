/* This file stitches the route tree from colocated route definitions. */
import { Route as RootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as AppRoute } from './routes/app'
// Single-page landing: steps & why merged into home

const root = RootRoute
const index = IndexRoute
// add app route for post-login

export const routeTree = root.addChildren([index, AppRoute])


