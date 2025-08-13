"use client"

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";

import { useLink } from "@/store/link-store";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Links = () => {
    const { links } = useLink()

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>URL encurtado</TableHead>
                            <TableHead>URL original</TableHead>
                            <TableHead className={cn("flex justify-self-end items-center")}>Data de criação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <a href={`http://localhost:3000/${item.id}`}>
                                        {`http://localhost:3000/${item.id}`}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={item.url}>
                                        {item.url}
                                    </a>
                                </TableCell>
                                <TableCell className="flex justify-self-end">
                                    {dayjs(item.createdAt).fromNow()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
 
export default Links;