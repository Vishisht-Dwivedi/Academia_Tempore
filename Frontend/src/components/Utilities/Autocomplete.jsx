import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

export const useAutocompleteForm = (fetchUrl, extractMatch, extractKey) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedKey, setSelectedKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchOptions = useMemo(() =>
        debounce(async (query) => {
            setIsLoading(true);
            try {
                const res = await fetch(`${fetchUrl}${query}`);
                const data = await res.json();
                setOptions(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setOptions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300), [fetchUrl]
    );

    useEffect(() => {
        if (inputValue.trim()) {
            fetchOptions(inputValue);
        } else {
            setOptions([]);
            setSelectedKey('');
        }
    }, [inputValue, fetchOptions]);

    useEffect(() => {
        const match = options.find(opt => extractMatch(opt) === inputValue);
        if (match) {
            setSelectedKey(extractKey(match));
        } else {
            setSelectedKey('');
        }
    }, [inputValue, options, extractMatch, extractKey]);

    return {
        inputValue,
        setInputValue,
        options,
        selectedKey,
        isLoading
    };
};
