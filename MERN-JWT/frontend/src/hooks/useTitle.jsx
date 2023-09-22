import { useEffect } from "react";
// this hook is for dynamic page titles in a react app
const useTitle = (title) => {
	useEffect(() => {
		const prevTitle = document.title;
		document.title = title;

		return () => (document.title = prevTitle);
	}, [title]);
};

export default useTitle;
