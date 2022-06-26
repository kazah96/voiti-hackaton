import { useCallback, useMemo } from 'react';
import clsx from 'clsx';

// documentation: https://react-table.tanstack.com/docs/overview
// note: if u need to provide a sticky column, use this - https://github.com/GuillaumeJasmin/react-table-sticky
import {
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useTable,
} from 'react-table';

import { TableDataType, TableInstance, TableProps } from './types';
import useStyles from './styles';

const headerProps = (props, { column }) => getStyles(props, column.align);

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
];

// note: react-table has a problem with typing, so u can find "any" in some places
export const Table: React.FC<TableProps> = ({
  columns,
  data,
  resizable,
  selectable,
  disablePagination,
  tableOptions = {},
  tablePlugins = [],
  className,
  containerClassName,
  headerClassName,
  bodyClassName,
  renderFirstRow,
}) => {
  const classes = useStyles();
  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 80, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      // maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const computedPlugins = useMemo(() => {
    const result = [
      useFlexLayout,
      !disablePagination ? usePagination : null,
      resizable ? useResizeColumns : null,
      selectable ? useRowSelect : null,
    ];

    return result.filter((v) => v);
  }, [disablePagination, resizable, selectable]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable<TableDataType>(
      { columns, data, defaultColumn, initialState: { pageIndex: 0 } as any, ...tableOptions },
      ...computedPlugins,
      ...tablePlugins
    ) as TableInstance;

  const renderHeaderGroup = useCallback(
    (headerGroup, index) => {
      return (
        <tr
          {...(headerGroup.getHeaderGroupProps() as React.HTMLAttributes<HTMLTableRowElement>)}
          key={index}
        >
          {headerGroup.headers.map((column: any, index, arr) => {
            const last = index === arr.length - 1;

            return (
              <th
                {...(column.getHeaderProps(
                  headerProps
                ) as React.ThHTMLAttributes<HTMLTableCellElement>)}
                key={column.id}
              >
                {column.render('Header')}
                {column.canResize && resizable && !last && (
                  <div
                    {...column.getResizerProps()}
                    className={clsx(classes.resizer, { isResizing: column.isResizing })}
                  />
                )}
              </th>
            );
          })}
        </tr>
      );
    },
    [classes.resizer, resizable]
  );

  const renderRow = useCallback(
    (row) => {
      prepareRow(row);

      return (
        <tr {...(row.getRowProps() as React.HTMLAttributes<HTMLTableRowElement>)} key={row.id}>
          {row.cells.map((cell) => {
            const cellProps = cell.getCellProps({
              // className: cell.column.collapse ? 'collapse' : '',
            });

            return (
              <td
                {...(cellProps as React.TdHTMLAttributes<HTMLTableCellElement>)}
                key={cellProps.key}
              >
                {cell.render('Cell')}
              </td>
            );
          })}
        </tr>
      );
    },
    [prepareRow]
  );

  return (
    <div className={clsx(classes.container, containerClassName)}>
      <table
        {...(getTableProps() as React.TableHTMLAttributes<HTMLTableElement>)}
        className={clsx(classes.table, className)}
      >
        <thead className={clsx(classes.tableHeader, headerClassName)}>
          {headerGroups.map(renderHeaderGroup)}
        </thead>
        <tbody
          {...(getTableBodyProps() as React.HTMLAttributes<HTMLTableSectionElement>)}
          className={clsx(classes.tableBody, bodyClassName)}
        >
          {renderFirstRow}
          {page.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};
