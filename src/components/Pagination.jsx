import "../styles/pagination.css";

export function Pagination({
    paginate,
    currentPage,
    itemsPerPage,
    totalItems
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="paginationContainer">
            <ul className="paginationList">
                {pageNumbers.map((number, index) => (
                    <li className="paginationItem" key={index}>
                        <a
                            className="paginationBtn"
                            onClick={(e) => {
                                e.preventDefault();
                                paginate(number)
                            }}
                            href="!#"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
