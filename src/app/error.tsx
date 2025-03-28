import { useEffect } from "react";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<>
			<h2>Une erreur est survenue !</h2>
			<button onClick={() => reset()}>Réessayer</button>
		</>
	);
}
