import React from 'react';
import {
  Column,
  Cell,
  PluginHook,
  TableOptions,
  TableInstance as ReactTableInstance,
  Row,
} from 'react-table';

export type TableDataType = {};

export interface TableProps {
  columns: Column<TableDataType>[];
  data: TableDataType[];
  resizable?: boolean;
  flexible?: boolean;
  sorted?: boolean;
  selectable?: boolean;
  disablePagination?: boolean;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  renderFirstRow?: React.ReactNode;
  tableOptions?: TableOptions<TableDataType>;
  tablePlugins?: PluginHook<TableDataType>[];
}

export interface TableInstance extends ReactTableInstance {
  page: Row[];
}

export interface CellProps<V = any> extends Cell<TableDataType> {
  value: V;
  cell: {
    row: {
      values: Record<string, any>;
    };
  };
}
