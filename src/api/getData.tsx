export const getData = async (url: string) => {
	try {
		const response = await fetch("http://59.9.174.186:8080/api/" + url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " +
					"eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDY3MDc0OTksImV4cCI6MTcwOTI5OTQ5OSwic3ViIjoidWRhZGR5QG5hdmVyLmNvbSJ9.xc-8cbYTswU1JC2E6tdT3d_5EYEUVmC3gD2JaL9EfNM",
			},
		});
		if (response.ok) {
			const responseData = await response.json();
			const data = responseData.data;
			return responseData;
		} else {
			throw new Error("Error fetching data");
		}
	} catch (error) {
		throw new Error("Error fetching data");
	}
};
