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
                    primaryText = {(record) => record.albumId}
                    secondaryText = {(record) => record.title}
                />
                ) : (
                    <DataTable>
                        <DataTable.Col source="albumId" label="album">
                            <ReferenceField source="albumId" reference="albums" link="show"/>
                        </DataTable.Col>
                        <DataTable.Col source="id" label="ID"/>
                        <DataTable.Col source="title" label="Título"/>
                        <DataTable.Col source="url" label="URL"/>
                        <DataTable.Col source="thumbnailUrl" label="Imagen">
                            <ImageField source="thumbnailUrl" />
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
    
        <TextInput required source="title" label="Título"/>

        <TextInput
            required
            source="url"
            type="url"
            label="URL"
        />
        
        <TextInput
            required
            source="thumbnailUrl"
            label="Imagen"
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

            <TextInput required source="title" label="Título"/>

            <TextInput
                required
                source="url"
                type="url"
                label="URL"
            />

            <TextInput
                required
                source="thumbnailUrl"
                label="Imagen"
                multiline
                rows={5}
            />
        </SimpleForm>
    </Create>
);