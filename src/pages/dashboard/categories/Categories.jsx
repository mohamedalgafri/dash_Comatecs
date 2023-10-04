import React, { useState, useMemo, useEffect } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../../../components/globalFilter/GlobalFilter";

import AddCategoryModal from "./AddCategoryModal";
import baseUrl from "../../../api/baseURL";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import EditCategoryModal from "./EditCategoryModal";
import { ToastContainer, toast } from "react-toastify";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const Categories = ({ title = "التصنيفات" }) => {
  const [isLoading, setIsLoading] = useState(true);

  let [dataT, setDataT] = useState([]);
  let [changeData, setChangeData] = useState();
  let [idEdit, setIdEdit] = useState();
  let [nameEdit, setNameEdit] = useState();
  let [show, setShow] = useState(false);

  const deleteData = async (id) => {
    await baseUrl
      .delete(`api/Category/${id}`)
      .then((res) => {
        console.log(res);
        toast.error("تم الحذف", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          rtl: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((e) => {})
      .finally(() => {});
    getAllData();

    console.log(id);
  };

  const editData = async (id, name) => {
    console.log(id, name);
    setIdEdit(id);
    setNameEdit(name);
    setShow(true);
  };

  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "اسم التصنيف",
      accessor: "name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "الحالة",
      accessor: "status",
      Cell: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value === "paid"
                  ? "text-success-500 bg-success-500"
                  : ""
              } 
              ${
                row?.cell?.value === "due"
                  ? "text-warning-500 bg-warning-500"
                  : ""
              }
              ${
                row?.cell?.value === "cancled"
                  ? "text-danger-500 bg-danger-500"
                  : ""
              }
              
               `}
            >
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        const id = row.cell.row.original.id;
        const name = row.cell.row.original.name;
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            {/* <Tooltip
              content="View"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip> */}
            <Tooltip
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                onClick={() => editData(id, name)}
                type="button"
              >
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>
            <Tooltip
              content="Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                onClick={() => deleteData(id)}
                type="button"
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const getAllData = async () => {
    // setIsLoading(true);
    try {
      let dataA = await baseUrl.get("api/Category", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setIsLoading(false);
      setDataT(dataA.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = dataT;

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,

    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Breadcrumbs title="التصنيفات" />
      <EditCategoryModal
        idEdit={idEdit}
        nameEdit={nameEdit}
        show={show}
        setShow={setShow}
        getAllData={getAllData}
      />
      <Card className="p-2">
        <div className="md:flex justify-between items-center mb-6">
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <div>
            <AddCategoryModal getAllData={getAllData} />
            {/* <h4 className="card-title">{title}</h4> */}
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={COLUMNS.length + 1}
                        className="text-center py-5"
                      >
                        <LoadingSpinner />
                      </td>
                    </tr>
                  ) : (
                    page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps()} className="table-td">
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  عرض {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              صفحات{" "}
              <span>
                {pageIndex + 1} - {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
    </>
  );
};

export default Categories;
