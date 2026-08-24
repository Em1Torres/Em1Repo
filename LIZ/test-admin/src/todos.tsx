import { List, 
    DataTable, SimpleList } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const TodoList = () =>{
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText = {(record) => record.title}
                />
                ) : (
                    <DataTable>
                        <DataTable.Col source="userId" />
                        <DataTable.Col source="id" />
                        <DataTable.Col source="title" />
                    </DataTable>
                )
            }
        </List>
    );
}