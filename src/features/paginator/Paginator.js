import React from "react";
import Pagination from 'react-bootstrap/Pagination'

const Paginator = ({pagination, setCurrentPage}) => {
    const {first, last, next, prev} = pagination.links
    const {totalPages, currentPage} = pagination.meta
    const prevPage = currentPage - 1
    const nextPage = +currentPage + 1

    return (
        <Pagination>

            <Pagination.First disabled={!(first && prev)} onClick={() => setCurrentPage(first)}/>
            <Pagination.Prev disabled={!prev} onClick={() => setCurrentPage(prev)}/>
            {first && prev && <Pagination.Item onClick={() => setCurrentPage(first)}>1</Pagination.Item>}
            {(prevPage > 2) && <Pagination.Ellipsis/>}

            {(prevPage > 1) && <Pagination.Item onClick={() => setCurrentPage(prev)}>{prevPage}</Pagination.Item>}
            {<Pagination.Item active>{currentPage}</Pagination.Item>}
            {(totalPages - currentPage > 1) && <Pagination.Item onClick={() => setCurrentPage(next)}>{nextPage}</Pagination.Item>}

            {(totalPages - nextPage > 1) && <Pagination.Ellipsis/>}
            {last && next && <Pagination.Item onClick={() => setCurrentPage(last)}>{totalPages}</Pagination.Item>}
            <Pagination.Next disabled={!next} onClick={() => setCurrentPage(next)}/>
            <Pagination.Last disabled={!(last && next)} onClick={() => setCurrentPage(last)}/>
        </Pagination>
    )
}

export default Paginator