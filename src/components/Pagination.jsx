import "../styles/pagination.css";

export function Pagination({
    paginate,
    currentPage,
    itemsPerPage,
    totalItems
}) {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagesPerWindow = 8;

    if (totalPages <= pagesPerWindow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        let startPage, endPage;
        const halfWindow = pagesPerWindow / 2;

        if (currentPage <= halfWindow) { // Checking if we're in the beginning of page numbers
            startPage = 1;
            endPage = pagesPerWindow;
        } else if (currentPage + halfWindow >= totalPages) { // Checking if we're towards the end of page numbers
            startPage = totalPages - (pagesPerWindow + 1)
            endPage = totalPages;
        } else { // We're in the middle
            startPage = currentPage - halfWindow;
            endPage = currentPage + halfWindow;
        }

        for (let i = startPage; i < endPage; i++) {
            pageNumbers.push(i);
        }
    }

    const handleNext = () => currentPage !== totalPages ? paginate(currentPage + 1) : null;
    const handlePrev = () => currentPage !== 1 ? paginate(currentPage - 1) : null;
    const handleFirst = () => paginate(1);
    const handleLast = () => paginate(totalPages);

    return (
        <div className="paginationContainer">
            <ul className="paginationList">

                <li>
                    <button className="prevNextBtn" onClick={handlePrev}>{'←'}</button>
                </li>

                <li>
                    <button className="positionBtn" onClick={handleFirst}>
                        First
                    </button>
                </li>

                {pageNumbers.map((number, index) => (
                    <li key={index}>
                        <a className={`paginationBtn ${currentPage === number ? 'currentPage' : null}`} href="!#" onClick={(e) => {
                            e.preventDefault();
                            paginate(number)
                        }}>
                            {number}
                        </a>
                    </li>
                ))}

                <li>
                    <button className="positionBtn" onClick={handleLast}>
                        Last
                    </button>
                </li>

                <li>
                    <button className="prevNextBtn" onClick={handleNext}>{'→'}</button>
                </li>

            </ul>
        </div>
    )
}
