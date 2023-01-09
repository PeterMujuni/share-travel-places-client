import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error);

    return (
		<div id="error-page">
			<h1>{error.status}</h1>
			<h2>Oops!</h2>
			<p>Sorry, an unexpected error has occured.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
 
export default ErrorPage;