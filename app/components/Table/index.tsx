import React from "react";
import { Table as NextUITable, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface Column {
    name: string;
    uid: string;
    render?: (item: Record<string, any>) => React.ReactNode;
}

export interface TableProps {
    columns: Column[];
    dataSource: Record<string, any>[]
}

export default function Table(props: TableProps) {
    const { columns = [], dataSource = [] } = props;

    const renderCell = (key: string, item: Record<string, any>) => {
        const { render } = columns.find(i => i.uid === key) || {};
        if (render) return render(item);

        return item[key]
    }
    return (
        <NextUITable aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={dataSource}>
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => <TableCell>{renderCell(columnKey as string, item)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </NextUITable>
    );
}
