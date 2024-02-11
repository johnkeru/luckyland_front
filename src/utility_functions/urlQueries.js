export function getQueryParameters(currentUrl, setUrl, query) {
    const url = new URL(currentUrl);
    const queryParams = url.searchParams;

    const queries = query.split('&');

    queries.forEach(q => {
        if (q) { // 'query=value&' split by & then [query=value, ''];
            const [queryKey, queryValue] = q.split('=');

            // Remove any existing query parameter with the same key
            queryParams.delete(queryKey);

            // Add the new query parameter
            queryParams.append(queryKey, queryValue);
        }
    });

    // Update the URL with the modified query parameters
    url.search = queryParams.toString();
    const newUrlString = url.toString();

    if (setUrl) {
        setUrl(newUrlString);
    }

    return newUrlString.replaceAll('%26', '');
}
