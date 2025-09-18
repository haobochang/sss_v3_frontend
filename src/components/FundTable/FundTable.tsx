import { useMemo } from "react";
import dayjs from "dayjs";
import { Tag } from "antd";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import type { FundProduct } from "../../types/fund";
import { formatterCurrency, formatterPercent } from "../../utils/formatters";
import styles from "./FundTable.module.css";

interface FundTableProps {
  data: FundProduct[];
}

export function FundTable({ data }: FundTableProps) {
  const columns = useMemo<MRT_ColumnDef<FundProduct>[]>(
    () => [
      {
        header: "基金",
        id: "fundInfo",
        columns: [
          {
            accessorKey: "fundName",
            header: "基金名称",
            sortingFn: "alphanumeric",
            size: 230,
          },
          {
            accessorKey: "ticker",
            header: "产品代码",
            enableColumnFilter: true,
            size: 120,
          },
          {
            accessorKey: "manager",
            header: "基金经理",
            size: 140,
          },
          {
            accessorKey: "strategy",
            header: "策略类型",
            filterVariant: "multi-select",
            enableGrouping: true,
            size: 120,
          },
          {
            accessorKey: "inceptionDate",
            header: "成立日期",
            enableColumnFilter: false,
            Cell: ({ cell }) => dayjs(cell.getValue<string>()).format("YYYY-MM-DD"),
            sortingFn: "datetime",
            size: 140,
          },
        ],
      },
      {
        header: "净值表现",
        id: "performance",
        columns: [
          {
            accessorKey: "navStart",
            header: "期初净值",
            Cell: ({ cell }) => cell.getValue<number>().toFixed(3),
            size: 110,
          },
          {
            accessorKey: "navEnd",
            header: "期末净值",
            Cell: ({ cell }) => cell.getValue<number>().toFixed(3),
            size: 110,
          },
          {
            accessorFn: (row) => row.navEnd / row.navStart - 1,
            id: "navReturn",
            header: "本期收益率",
            Cell: ({ cell }) => formatterPercent.format(cell.getValue<number>()),
            sortingFn: "basic",
            size: 130,
          },
          {
            accessorKey: "ytdReturn",
            header: "今年以来",
            Cell: ({ cell }) => formatterPercent.format(cell.getValue<number>()),
            sortingFn: "basic",
            size: 120,
          },
          {
            accessorKey: "sharpe",
            header: "夏普比率",
            Cell: ({ cell }) => cell.getValue<number>().toFixed(2),
            size: 120,
          },
        ],
      },
      {
        header: "资产配置 (%)",
        id: "allocation",
        columns: [
          {
            accessorKey: "stockExposureStart",
            header: "期初股票",
            Cell: ({ cell }) => `${cell.getValue<number>().toFixed(0)}%`,
            size: 120,
          },
          {
            accessorKey: "stockExposureEnd",
            header: "期末股票",
            Cell: ({ cell }) => `${cell.getValue<number>().toFixed(0)}%`,
            size: 120,
          },
          {
            accessorKey: "futuresExposureStart",
            header: "期初期货",
            Cell: ({ cell }) => `${cell.getValue<number>().toFixed(0)}%`,
            size: 120,
          },
          {
            accessorKey: "futuresExposureEnd",
            header: "期末期货",
            Cell: ({ cell }) => `${cell.getValue<number>().toFixed(0)}%`,
            size: 120,
          },
        ],
      },
      {
        header: "规模与风险",
        id: "riskSize",
        columns: [
          {
            accessorKey: "aum",
            header: "基金规模",
            Cell: ({ cell }) => formatterCurrency.format(cell.getValue<number>()),
            sortingFn: "basic",
            size: 140,
          },
        ],
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilters: true,
    enableColumnResizing: true,
    enableGrouping: true,
    enablePinning: true,
    enableRowSelection: false,
    enableGlobalFilter: true,
    enableDensityToggle: true,
    initialState: {
      density: "comfortable",
      expanded: true,
      showGlobalFilter: true,
      pagination: { pageIndex: 0, pageSize: 8 },
    },
    positionToolbarAlertBanner: "bottom",
    muiToolbarAlertBannerProps: { color: "info" },
    renderToolbarAlertBannerContent: ({ table: tbl }) =>
      tbl.getState().showAlertBanner
        ? "存在筛选条件，当前显示的是过滤后的指标"
        : null,
    muiSearchTextFieldProps: {
      placeholder: "搜索基金名称 / 代码 / 经理",
      variant: "outlined",
      size: "small",
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "12px",
        border: "1px solid #f0f0f0",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: 600,
        backgroundColor: "#fafafa",
        whiteSpace: "normal",
        lineHeight: 1.4,
        wordBreak: "break-word",
      },
    },
    renderTopToolbarCustomActions: () => (
      <div className={styles.toolbarActions}>
        <Tag bordered={false} color="blue">
          数据截至 {dayjs().format("YYYY-MM-DD")}
        </Tag>
        <span className={styles.statusBadge}>实时监控</span>
      </div>
    ),
  });

  return (
    <div className={styles.tableCard}>
      <MaterialReactTable table={table} />
    </div>
  );
}
