import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./context/AuthProvider";
import { StrictMode } from "react";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPendingComponent: () => <Loader />,
	context: {
		auth: useAuth,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById("app")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)