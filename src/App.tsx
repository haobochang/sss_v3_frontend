import { useMemo } from "react";
import { Card, ConfigProvider, Layout, Statistic, Tag, Typography } from "antd";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";

type FundProduct = {
  id: string;
  fundName: string;
  ticker: string;
  manager: string;
  strategy: "多资产" | "量化对冲" | "固收+" | "指数增强";
  inceptionDate: string;
  navStart: number;
  navEnd: number;
  stockExposureStart: number;
  stockExposureEnd: number;
  futuresExposureStart: number;
  futuresExposureEnd: number;
  aum: number;
  sharpe: number;
  ytdReturn: number;
};

const formatterCurrency = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const formatterPercent = new Intl.NumberFormat("zh-CN", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#1677ff",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const mockData: FundProduct[] = [
  {
    id: "F001",
    fundName: "聚势多资产进取一号",
    ticker: "JSMA-01",
    manager: "刘强",
    strategy: "多资产",
    inceptionDate: "2019-06-30",
    navStart: 1.28,
    navEnd: 1.46,
    stockExposureStart: 52,
    stockExposureEnd: 58,
    futuresExposureStart: 12,
    futuresExposureEnd: 15,
    aum: 2.6e9,
    sharpe: 1.62,
    ytdReturn: 0.118,
  },
  {
    id: "F002",
    fundName: "稳健量化中性基金",
    ticker: "QHZX-11",
    manager: "张伟",
    strategy: "量化对冲",
    inceptionDate: "2021-01-15",
    navStart: 1.12,
    navEnd: 1.19,
    stockExposureStart: 8,
    stockExposureEnd: 6,
    futuresExposureStart: 35,
    futuresExposureEnd: 38,
    aum: 3.1e9,
    sharpe: 1.87,
    ytdReturn: 0.072,
  },
  {
    id: "F003",
    fundName: "卓越固收增强",
    ticker: "GUGS-07",
    manager: "王芳",
    strategy: "固收+",
    inceptionDate: "2018-09-01",
    navStart: 1.09,
    navEnd: 1.21,
    stockExposureStart: 18,
    stockExposureEnd: 20,
    futuresExposureStart: 5,
    futuresExposureEnd: 4,
    aum: 4.5e9,
    sharpe: 1.45,
    ytdReturn: 0.089,
  },
  {
    id: "F004",
    fundName: "精选行业增强",
    ticker: "ZXZQ-28",
    manager: "陈晨",
    strategy: "指数增强",
    inceptionDate: "2020-04-12",
    navStart: 0.98,
    navEnd: 1.18,
    stockExposureStart: 82,
    stockExposureEnd: 88,
    futuresExposureStart: 10,
    futuresExposureEnd: 9,
    aum: 1.9e9,
    sharpe: 1.32,
    ytdReturn: 0.153,
  },
  {
    id: "F005",
    fundName: "灵动套利一号",
    ticker: "LDTL-18",
    manager: "周航",
    strategy: "量化对冲",
    inceptionDate: "2022-02-18",
    navStart: 1.03,
    navEnd: 1.11,
    stockExposureStart: 14,
    stockExposureEnd: 17,
    futuresExposureStart: 42,
    futuresExposureEnd: 39,
    aum: 1.4e9,
    sharpe: 1.74,
    ytdReturn: 0.064,
  },
  {
    id: "F006",
    fundName: "优享稳健回报",
    ticker: "YXWJ-05",
    manager: "李娜",
    strategy: "固收+",
    inceptionDate: "2017-11-20",
    navStart: 1.26,
    navEnd: 1.35,
    stockExposureStart: 12,
    stockExposureEnd: 13,
    futuresExposureStart: 0,
    futuresExposureEnd: 1,
    aum: 5.2e9,
    sharpe: 1.28,
    ytdReturn: 0.058,
  },
  {
    id: "F007",
    fundName: "高端制造主题增强",
    ticker: "GZZT-03",
    manager: "赵峰",
    strategy: "指数增强",
    inceptionDate: "2021-07-09",
    navStart: 1.14,
    navEnd: 1.33,
    stockExposureStart: 76,
    stockExposureEnd: 83,
    futuresExposureStart: 16,
    futuresExposureEnd: 14,
    aum: 2.2e9,
    sharpe: 1.51,
    ytdReturn: 0.132,
  },
  {
    id: "F008",
    fundName: "全球配置旗舰",
    ticker: "QQPZ-02",
    manager: "孙宇",
    strategy: "多资产",
    inceptionDate: "2016-03-30",
    navStart: 1.42,
    navEnd: 1.58,
    stockExposureStart: 48,
    stockExposureEnd: 51,
    futuresExposureStart: 22,
    futuresExposureEnd: 25,
    aum: 6.8e9,
    sharpe: 1.67,
    ytdReturn: 0.096,
  },
];

function App() {
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
            Cell: ({ cell }) =>
              dayjs(cell.getValue<string>()).format("YYYY-MM-DD"),
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
            Cell: ({ cell }) =>
              formatterPercent.format(cell.getValue<number>()),
            sortingFn: "basic",
            size: 130,
          },
          {
            accessorKey: "ytdReturn",
            header: "今年以来",
            Cell: ({ cell }) =>
              formatterPercent.format(cell.getValue<number>()),
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
            Cell: ({ cell }) =>
              formatterCurrency.format(cell.getValue<number>()),
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
    data: mockData,
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
      pagination: { pageSize: 8 },
    },
    positionToolbarAlertBanner: "bottom",
    muiToolbarAlertBannerProps: ({ table: tbl }) =>
      tbl.getState().showAlertBanner
        ? {
            color: "primary",
            children: "存在筛选条件，当前显示的是过滤后的指标",
          }
        : undefined,
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
      },
    },
    renderTopToolbarCustomActions: () => (
      <div className="toolbar-actions">
        <Tag bordered={false} color="blue">
          数据截至 {dayjs().format("YYYY-MM-DD")}
        </Tag>
        <span className="status-badge">实时监控</span>
      </div>
    ),
  });

  const totalAUM = mockData.reduce((acc, item) => acc + item.aum, 0);
  const avgSharpe =
    mockData.reduce((acc, item) => acc + item.sharpe, 0) / mockData.length;
  const bestFund = mockData.reduce((prev, current) =>
    prev.ytdReturn > current.ytdReturn ? prev : current,
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
          fontFamily: 'Inter, \\"Segoe UI\\", Helvetica, Arial, sans-serif',
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout className="app-layout">
          <Layout.Header className="app-header">
            <Typography.Title level={3} style={{ margin: 0 }}>
              基金产品收益资产看板
            </Typography.Title>
            <Typography.Text type="secondary">
              汇总期初、期末及股票期货敞口，支持快速筛选、排序与分组
            </Typography.Text>
          </Layout.Header>
          <Layout.Content className="app-content">
            <div className="metrics-grid">
              <Card bordered={false}>
                <Statistic
                  title="管理规模（AUM）"
                  value={formatterCurrency.format(totalAUM)}
                  valueStyle={{ fontSize: 24 }}
                />
                <Typography.Text type="secondary">
                  覆盖 {mockData.length} 只存续产品
                </Typography.Text>
              </Card>
              <Card bordered={false}>
                <Statistic
                  title="平均夏普比率"
                  value={avgSharpe.toFixed(2)}
                  valueStyle={{ fontSize: 24 }}
                />
                <Typography.Text type="secondary">
                  维持稳健风险收益水平
                </Typography.Text>
              </Card>
              <Card bordered={false}>
                <Statistic
                  title="年度表现最佳"
                  value={bestFund.fundName}
                  valueStyle={{ fontSize: 18 }}
                />
                <Typography.Text type="success">
                  今年以来 {formatterPercent.format(bestFund.ytdReturn)}
                </Typography.Text>
              </Card>
            </div>
            <div className="table-card">
              <MaterialReactTable table={table} />
            </div>
          </Layout.Content>
        </Layout>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
