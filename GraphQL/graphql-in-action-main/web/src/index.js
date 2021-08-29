import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import { useStoreObject, Provider } from "./store";
import Root from "./components/Root";

export default function App() {
	const store = useStoreObject();
	return (
		<ApolloProvider client={store.client}>
			<Provider value={store}>
				<Root />
			</Provider>
		</ApolloProvider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
