import type React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search movies..." }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) onSearch(query.trim());
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-dark text-light border-secondary"
                />
                <Button variant="warning" type="submit">
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SearchBar;
