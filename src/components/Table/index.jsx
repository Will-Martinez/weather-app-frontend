import React, { useState, useEffect } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import getUsers from "../../API/services/users/get.users";
import toast from "react-hot-toast";
import "./index.css"

// Função para buscar dados dos usuários
async function getUsersData() {
    try {
        const response = await getUsers();
        return response.data;
    } catch (error) {
        toast.error(`Error: ${error.message}`);
        return [];
    }
}

// Componente de Tabela de Usuários
export default function UsersTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUsersData();
            setData(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "User Name",
                accessor: "userName",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Enabled",
                accessor: (row) => (row.enabled ? "Yes" : "No"),
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className="buttons">
                        <button className="button is-primary is-rounded is-small is-outlined">
                            Action
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        useSortBy
    );

    // Função de filtro
    const handleFilter = (e) => {
        const value = e.target.value || undefined;
        setFilter("userName", value);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div id="table-container">
            <button
                type="button"
                className="button is-primary is-rounded is-outlined"
                id="create_product"
                onClick={OpenCreateModal}
            >
                Register User
            </button>
            <input
                id="search_input"
                className="input is-rounded"
                type="text"
                placeholder="Search by User Name..."
                onChange={handleFilter}
                style={{ display: rows.length > 0 ? "block" : "none" }}
            />
            <table className="table is-striped is-bordered is-hoverable is-fullwidth" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// Função exemplo para abrir o modal
function OpenCreateModal() {
    console.log("Modal opened!");
}
