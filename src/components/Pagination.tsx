import type React from "react";
import { Pagination as BSPagination } from "react-bootstrap";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisible = 5;
    const clamped = Math.min(totalPages, 500); // TMDB caps at 500

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(clamped, startPage + maxVisible - 1);
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <BSPagination className="justify-content-center" data-bs-theme="dark">
            <BSPagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
            <BSPagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {startPage > 1 && <BSPagination.Ellipsis disabled />}
            {pages.map((p) => (
                <BSPagination.Item key={p} active={p === currentPage} onClick={() => onPageChange(p)}>
                    {p}
                </BSPagination.Item>
            ))}
            {endPage < clamped && <BSPagination.Ellipsis disabled />}
            <BSPagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === clamped} />
            <BSPagination.Last onClick={() => onPageChange(clamped)} disabled={currentPage === clamped} />
        </BSPagination>
    );
};

export default Pagination;
