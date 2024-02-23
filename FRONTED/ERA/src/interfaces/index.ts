export interface context {
    getter: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
}