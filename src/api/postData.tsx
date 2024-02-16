export const postData = async (url: string, body: any) => {
	try {
		const response = await fetch("http://59.9.174.186:8080/api/" + url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " +
					"eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDY3MDU5NTksImV4cCI6MTcwOTI5Nzk1OSwic3ViIjoidWRhZGR5QG5hdmVyLmNvbSJ9.qwfYmC0RyrESTSDVYxvQVCP_n3UBSGl3nFER5gcE4xU",
			},
			body: JSON.stringify(body),
		});
		if (response.ok) {
			const responseData = await response.json();
			const data = responseData.data;
			return data;
		} else {
			throw new Error("Error fetching data");
		}
	} catch (error) {
		throw new Error("Error fetching data");
	}
};
