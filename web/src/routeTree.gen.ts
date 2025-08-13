/* This file stitches the route tree from colocated route definitions. */
import { Route as RootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as DashboardRoute } from './routes/dashboard'
import { Route as DashboardInboxRoute } from './routes/dashboard.inbox'
import { Route as DashboardExtractRoute } from './routes/dashboard.extract'
import { Route as DashboardVaultRoute } from './routes/dashboard.vault'
import { Route as DashboardSummaryRoute } from './routes/dashboard.summary'
// Single-page landing: steps & why merged into home

const root = RootRoute
const index = IndexRoute
const dashboard = DashboardRoute
const dashboardInbox = DashboardInboxRoute
const dashboardExtract = DashboardExtractRoute
const dashboardVault = DashboardVaultRoute
const dashboardSummary = DashboardSummaryRoute

export const routeTree = root.addChildren([
  index,
  dashboard,
  dashboardInbox,
  dashboardExtract,
  dashboardVault,
  dashboardSummary,
])


