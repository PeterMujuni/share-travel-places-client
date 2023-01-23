import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = "GET", headers = {}, body = null) => {
			setIsLoading(true);

			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);
			
			try {
				const response = await fetch(url, {
					method,
					headers,
					body,
					signal: httpAbortCtrl.signal,
				});

				const responseData = await response.json();

				// remove/clear requestControllers after request completion
				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);

				if (!response.ok) {
					throw new Error(responseData.message);
				}
				setIsLoading(false);
				return responseData;
			} catch (error) {
				if (!error.message === "The user aborted a request.") {
					setIsLoading(false);
					setError(error.message);
					throw error;
				}
			}
		},[]);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) =>
				abortCtrl.abort()
			);
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
