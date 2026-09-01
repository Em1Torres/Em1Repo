import { List, 
    DataTable, SimpleList, ReferenceField, EditButton, Edit, Create, ReferenceInput, TextInput, 
    SimpleForm,
    SelectInput, ImageField} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const PhotoList = () =>{
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText = {(record) => record.userId}
                    secondaryText = {(record) => record.title}
                />
                ) : (
                    <DataTable>
                        <DataTable.Col source="albumId" />
                        <DataTable.Col source="id" />
                        <DataTable.Col source="title" />
                        <DataTable.Col source="url" />
                        <DataTable.Col source="thumbnailUrl">
                            <ImageField source="url" />
                        </DataTable.Col>
                        <DataTable.Col>
                            <EditButton />
                        </DataTable.Col>

                    </DataTable>

                )
            }
        </List>
    );
}
export const PhotoEdit = () =>(
    <Edit>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput disabled source="id" />
            <ReferenceInput source="albumId" reference="albums">
                <SelectInput optionText="title" />
            </ReferenceInput>
        
        <TextInput
            required
            source="url"
            type="url"
        />
        
        <TextInput
            required
            source="thumbnailUrl"
            multiline
            rows={5}
        />
        </SimpleForm>
    </Edit>
);

export const PhotoCreate = () =>(
    <Create>
        <SimpleForm warnWhenUnsavedChanges>
            <ReferenceInput required source="albumId" reference="albums">
                <SelectInput optionText="title" />
            </ReferenceInput>
    
        </SimpleForm>
    </Create>
);