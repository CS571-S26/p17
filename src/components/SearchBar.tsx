import type React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    activeQuery: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search movies...", activeQuery }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (query.trim()) onSearch(query.trim());
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    }

    return (
        <Form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "row", justifyContent: "space-between", flex: 1}}>
            <InputGroup style={{ maxWidth: 500 }}>
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
            {
                activeQuery &&
                    <Button
                        variant="outline-danger"
                        style={{ textWrap: "nowrap" }}
                        onClick={handleClear}
                    >
                        Clear Search
                    </Button>
            }
        </Form>
    );
};

export default SearchBar;
