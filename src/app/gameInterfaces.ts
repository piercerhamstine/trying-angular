export interface Resource{
    id: string,
    name: string
}

export interface UseableResource{
    id: string,
    total: number
}

export interface Action{
    id: string,
    name: string,
    callback: {(): void;},
    reward: Resource
}
