import { List, 
    DataTable, SimpleList } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const CommentList = () =>{
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText = {(record) => record.name}
                />
                ) : (
                    <DataTable>
                        <DataTable.Col source="postId" />
                        <DataTable.Col source="id" />
                        <DataTable.Col source="name" />
                    </DataTable>
                )
            }
        </List>
    );
}