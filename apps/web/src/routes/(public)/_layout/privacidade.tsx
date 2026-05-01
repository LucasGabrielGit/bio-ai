import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout/privacidade')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/_layout/privacidade"!</div>
}
