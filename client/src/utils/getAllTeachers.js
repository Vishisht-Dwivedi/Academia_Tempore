export const fetchAllTeachers = async () => {
    let result;
    try {
        const response = await fetch("/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
          query {
            teachers {
              code
              name
            }
          }
        `,
            }),
        });

        result = await response.json();
        if (result.errors) {
            console.error("GraphQL Errors:", result.errors);
            throw new Error("Failed to fetch teachers");
        }


    } catch (err) {
        console.error("Fetch error:", err);
        throw err;
    } finally {
        console.log(result);
        return result.data.teachers;
    }
};
